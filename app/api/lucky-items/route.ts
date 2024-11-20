import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PrivilegeLinkResponse } from '@/types/dataoke';

// API URLs
const GOODS_LIST_API = 'https://openapi.dataoke.com/api/goods/list-super-goods';
const PRIVILEGE_LINK_API = 'https://openapi.dataoke.com/api/tb-service/get-privilege-link';

// 生成6位随机数
function generateNonce(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 生成验签
function generateSignRan(appKey: string, appSecret: string, nonce: string, timer: string): string {
  try {
    const signStr = `appKey=${appKey}&timer=${timer}&nonce=${nonce}&key=${appSecret}`;
    console.log('Sign string before MD5:', signStr);
    return crypto.createHash('md5').update(signStr).digest('hex').toUpperCase();
  } catch (error) {
    console.error('Error generating signRan:', error);
    throw error;
  }
}

// 转链函数
async function getPrivilegeLink(goodsId: string): Promise<string> {
  try {
    const appKey = process.env.DTK_APP_KEY;
    const appSecret = process.env.DTK_APP_SECRET;
    
    if (!appKey || !appSecret) {
      throw new Error('Missing API credentials');
    }

    const nonce = generateNonce();
    const timer = Date.now().toString();
    const signRan = generateSignRan(appKey, appSecret, nonce, timer);

    const params: Record<string, string> = {
      appKey,
      version: 'v1.3.1',
      goodsId,
      nonce,
      timer,
      signRan
    };

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${PRIVILEGE_LINK_API}?${queryString}`;

    console.log('Privilege link request:', requestUrl);

    const response = await fetch(requestUrl);
    const data = await response.json() as PrivilegeLinkResponse;

    if (data.code !== 0) {
      throw new Error(`转链失败: ${data.msg}`);
    }

    return data.data.shortUrl;
  } catch (error) {
    console.error('Error getting privilege link:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const appKey = process.env.DTK_APP_KEY;
    const appSecret = process.env.DTK_APP_SECRET;

    if (!appKey || !appSecret) {
      console.error('Missing API credentials');
      throw new Error('API configuration is incomplete');
    }

    const nonce = generateNonce();
    const timer = Date.now().toString();
    const signRan = generateSignRan(appKey, appSecret, nonce, timer);

    const params: Record<string, string> = {
      appKey,
      version: 'v1.3.0',
      type: '0',
      pageId: '1',
      pageSize: '10',
      keyWords: '开运',
      sort: 'monthSales',
      hasCoupon: '1',
      nonce,
      timer,
      signRan
    };

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${GOODS_LIST_API}?${queryString}`;

    console.log('Full request details:', {
      url: requestUrl,
      params,
      signRan
    });

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();

    if (data.code !== 0) {
      throw new Error(`API error: ${data.msg}`);
    }

    const items = data.data.list;
    const itemsWithLinks = await Promise.all(
      items.map(async (item: any) => {
        try {
          const shortUrl = await getPrivilegeLink(item.goodsId);
          return {
            ...item,
            shortUrl
          };
        } catch (error) {
          console.error(`Error getting privilege link for item ${item.goodsId}:`, error);
          return {
            ...item,
            shortUrl: ''
          };
        }
      })
    );

    return NextResponse.json({
      code: 0,
      msg: 'success',
      data: {
        list: itemsWithLinks,
        totalNum: data.data.totalNum,
        pageId: data.data.pageId
      }
    });
  } catch (error) {
    console.error('Detailed error in lucky-items API:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      timestamp: new Date().toISOString(),
      env: {
        hasAppKey: !!process.env.DTK_APP_KEY,
        hasAppSecret: !!process.env.DTK_APP_SECRET
      }
    });
    
    return NextResponse.json({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
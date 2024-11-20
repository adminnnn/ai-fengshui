import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PrivilegeLinkResponse } from '@/types/dataoke';

// 生成6位随机数
function generateNonce(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 生成验签
function generateSignRan(appKey: string, appSecret: string, nonce: string, timer: string): string {
  try {
    // 按照新的验签规则拼接字符串
    const signStr = `appKey=${appKey}&timer=${timer}&nonce=${nonce}&key=${appSecret}`;
    
    // 打印签名字符串用于调试
    console.log('Sign string before MD5:', signStr);

    // MD5加密并转大写
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

    // 生成nonce和timer
    const nonce = generateNonce();
    const timer = Date.now().toString();

    // 生成signRan
    const signRan = generateSignRan(appKey, appSecret, nonce, timer);

    // 准备转链请求参数
    const params: Record<string, string> = {
      appKey,
      version: 'v1.3.1',
      goodsId,
      nonce,
      timer,
      signRan
    };

    // 构建请求URL
    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `https://openapi.dataoke.com/api/tb-service/get-privilege-link?${queryString}`;

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

// 添加商品项的接口定义
interface GoodsItem {
  goodsId: string;
  title: string;
  monthSales: number;
  // 根据实际API返回添加其他必要的字段
}

export async function GET() {
  try {
    const appKey = process.env.DTK_APP_KEY;
    const appSecret = process.env.DTK_APP_SECRET;
    const apiUrl = process.env.DTK_API_URL;

    // 检查环境变量
    if (!appKey || !appSecret || !apiUrl) {
      console.error('Missing environment variables:', {
        appKey: !!appKey,
        appSecret: !!appSecret,
        apiUrl: !!apiUrl
      });
      throw new Error('API configuration is incomplete');
    }

    // 生成nonce和timer
    const nonce = generateNonce();
    const timer = Date.now().toString();

    // 生成signRan
    const signRan = generateSignRan(appKey, appSecret, nonce, timer);

    // 准备请求参数
    const params: Record<string, string> = {
      appKey,
      version: 'v1.3.0',
      type: '0',
      pageId: '1',
      pageSize: '6',
      keyWords: '开运',
      sort: 'monthSales',
      hasCoupon: '1',
      nonce,
      timer,
      signRan
    };

    // 构建请求URL
    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${apiUrl}?${queryString}`;

    console.log('Full request details:', {
      url: requestUrl,
      params,
      signRan
    });

    // 发送请求
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();

    // 检查API返回的错误码
    if (data.code !== 0) {
      throw new Error(`API error: ${data.msg}`);
    }

    // 获取商品列表
    const items = data.data.list;

    // 为每个商品获取转链URL
    const itemsWithLinks = await Promise.all(
      items.map(async (item: GoodsItem) => {
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
            shortUrl: '' // 如果转链失败，返回空字符串
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
    // 捕获并记录详细错误信息
    console.error('Detailed error in lucky-items API:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      timestamp: new Date().toISOString(),
      env: {
        hasAppKey: !!process.env.DTK_APP_KEY,
        hasAppSecret: !!process.env.DTK_APP_SECRET,
        apiUrl: process.env.DTK_API_URL
      }
    });
    
    return NextResponse.json({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
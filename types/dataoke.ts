// 商品数据类型
export interface LuckyItem {
  id: number;
  goodsId: string;
  title: string;
  dtitle: string;
  originalPrice: number;
  actualPrice: number;
  mainPic: string;
  monthSales: number;
  couponPrice: number;
  shortUrl: string;
  shopName: string;
}

// 转链API响应类型
export interface PrivilegeLinkResponse {
  code: number;
  msg: string;
  data: {
    couponClickUrl: string;
    couponEndTime: string;
    couponInfo: string;
    couponStartTime: string;
    itemId: string;
    couponTotalCount: string;
    couponRemainCount: string;
    itemUrl: string;
    tpwd: string;
    maxCommissionRate: string;
    shortUrl: string;
    minCommissionRate: string;
  };
}

// API响应类型
export interface DaokeResponse {
  code: number;
  msg: string;
  data: {
    list: LuckyItem[];
    totalNum: number;
    pageId: string;
  };
} 
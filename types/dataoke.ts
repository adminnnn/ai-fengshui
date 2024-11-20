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
  couponLink: string;
  shopName: string;
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
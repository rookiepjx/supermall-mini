import request from "./request"

// 1.获取商品详情
export function getGoodsDetail(iid) {
    return request({
      url: '/detail',
      data: {
        iid
      }
    })
  }
  
  // 2.获取推荐商品
  export function getGoodsRecommend() {
    return request({
      url: '/recommend'
    })
  }

  // 3.商品基本信息类 
  export class GoodsBaseInfo {
    constructor(itemInfo, columns, services) {
      this.title = itemInfo.title
      this.desc = itemInfo.desc
      this.newPrice = itemInfo.price
      this.oldPrice = itemInfo.oldPrice
      this.discount = itemInfo.discountDesc
      this.columns = columns
      this.services = services
      this.realPrice = itemInfo.lowNowPrice
    }
  }
  
// 4.商家信息类
  export class ShopInfo {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }
  
  // 5.参数信息类
  export class ParamInfo {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }
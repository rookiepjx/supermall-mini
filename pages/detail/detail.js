// pages/detail/detail.js
// 导入网络请求函数
import {
  getGoodsDetail,
  getGoodsRecommend,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from "../../service/detail"

import {
  formatTimeTwo
} from "../../utils/util"

const app = getApp()

Page({
  data: {
    iid: "",
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommendInfo: {}
  },

  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    // 1.获取商品详情
    this._getGoodsDetail()
    // 2.获取底部推荐商品
    this._getGoodsRecommend()
  },

  // ---------------------------网络请求函数------------------------
  // 1.根据iid获取商品详情数据
  _getGoodsDetail() {
    const iid = this.data.iid
    getGoodsDetail(iid).then(res => {
      const data = res.data.result
      // 1.1 取出 topImages 顶部轮播图
      const topImages = data.itemInfo.topImages
      // 1.2 创建 baseInfo 商品信息对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 1.3 创建 shopInfo 商家信息对象
      const shopInfo = new ShopInfo(data.shopInfo)
      // 1.4 获取 detailInfo 信息
      const detailInfo = data.detailInfo
      // 1.5 创建 paramInfo 参数对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      // 1.6 获取 commentInfo 评论信息
      let commentInfo = {}
      // 评论可能为空
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      // 初始化全部数据
      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo,
      })    
      const time = formatTimeTwo(this.data.commentInfo.created,"Y/M/D h:m:s ")
      this.setData({
        ['commentInfo.created']: time
      })
    })
  },

  // 2.根据iid获取底部推荐商品
  _getGoodsRecommend() {
    getGoodsRecommend().then(res => {
      this.setData({
        recommendInfo: res.data.data.list
      })
    })
  },
  // ---------------------------事件处理函数---------------------
  // 添加商品到购物车
  addToCart(){
    // 1.获取当前页面商品对象
    const goods = {}
    goods.iid = this.data.iid;
    goods.imageURL = this.data.topImages[0];
    goods.title = this.data.baseInfo.title;
    goods.desc = this.data.baseInfo.desc;
    goods.price = this.data.baseInfo.realPrice;

    // 2.将数据保存到app
    app.addToCart(goods)
    // 3.提示
    wx.showToast({
      title: '加入购物车成功',
      icon:"success",
      duration:1000
    })
  }
})
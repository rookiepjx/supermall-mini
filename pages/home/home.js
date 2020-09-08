// pages/home/home.js

import {
  getHomeMultidata,
  getHomeGoodsData
} from "../../service/home"
Page({
  data: {
    banners: [],
    recommends: [],
    titles: ["流行", "新款", "精选"],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: "pop",
    types: ['pop', 'new', 'sell'],
    showBackTop: false,
    distance: 1000,
    isLoad: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    // 1.获取首页轮播图和推荐数据
    this._getHomeMultidata()
    // 2.获取流行、新款、精选商品数据
    this._getGoodsData("pop")
    this._getGoodsData("new")
    this._getGoodsData("sell")
  },
  // ----------------------------------网络请求函数-----------------------------------
  // 1.获取首页轮播图和推荐数据
  _getHomeMultidata() {
    getHomeMultidata().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 2.获取流行、新款、精选商品数据
  _getGoodsData(type) {
    // 获取当前分类数据的页码（每个分类page可能不一样）
    const page = this.data.goods[type].page + 1
    // 根据type和page获取商品数据
    getHomeGoodsData(type, page).then(res => {
      const result = res.data.data.list
      // 不要操作原有数组
      const newList = this.data.goods[type].list
      newList.push(...result)
      // 通过模板字符串获取对象的属性
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: newList,
        [pageKey]: page
      })
    })
  },
  // ----------------------------------事件处理函数-----------------------------------
  // tabControl点击切换
  handleTabClick(e) {
    // 获取tabControl点击的index
    const index = e.detail.index
    let currentType = ''
    switch (index) {
      case 0:
        currentType = 'pop'
        break;
      case 1:
        currentType = 'new'
        break;
      case 2:
        currentType = 'sell'
        break;
    }
    this.setData({
      currentType: currentType
    })
    this.selectComponent("#tab-control").setCurrentIndex(index)
    // this.selectComponent(".tab2").setCurrentIndex(index)
    
    
  },
  // 下拉加载更多
  onReachBottom() {
    this._getGoodsData(this.data.currentType)
  },
  // 监听滚动
  onPageScroll(options) {
    // 获取滚动位置
    const scrollTop = options.scrollTop
    // 1.下拉一定距离才显示 backTop
    const flag1 = scrollTop >= this.data.distance
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
    // 2.下拉一定距离tabControl吸顶
    const flag2 = scrollTop >= this.data.tabScrollTop
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2,
      })
    }
  },
  // 监听图片加载完成，获取tabControl距离顶部高度
  imageLoad() {
    // 每张图片加载完都会执行，但是只要有一张加载完就有高度。
    if (!this.data.isLoad) {
      // 获取tabControl距离顶部高度
      wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect => {
        this.data.tabScrollTop = rect.top
      }).exec()
      this.data.isLoad = true
    }
  }
})
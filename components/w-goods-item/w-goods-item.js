// components/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },
  data: {

  },
  methods: {
    // 点击商品跳转到详情页面
    goodsClick(){
      // 1.获取商品iid
      const iid = this.data.item.iid
      // 2.根据iid跳转路由
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }

  }
})

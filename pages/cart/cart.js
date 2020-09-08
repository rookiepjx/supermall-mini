// pages/cart/cart.js

// 获取app对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectedAll: true,
    totalCount: 0,
    totalPrice: 0
  },
  onLoad() {
    this.setData({
      cartList: app.globalData.cartList
    })
    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 2.修改全部选中的状态
      const selectedAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectedAll: selectedAll
      })
      this.changeData()
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },

  // 1.全选/取消全选
  handleSelectedAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectedAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectedAll: false
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectedAll: true
      })
    }
    this.changeData()
  },
  // 2.重新计算价格和总数
  changeData() {
    let totalPrice = 0;
    let count = 0;
    for (let item of this.data.cartList) {
      if (item.checked) {
        count++
        totalPrice += item.price * item.count
      }
    }
    // 2.修改数据
    this.setData({
      totalCount: count,
      totalPrice: totalPrice
    })
  }
})
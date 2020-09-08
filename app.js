//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 添加到购物车
  addToCart(goods) {
    // 判断购物车是否已存在这个商品，存在数量+1,不存在加入购物车
    const oldGoods = this.globalData.cartList.find(item => item.iid == goods.iid)
    if (oldGoods) {
      oldGoods.count += 1
    } else {
      goods.count = 1
      goods.checked = true
      this.globalData.cartList.push(goods)
    }
    // 2.购物车回调(如果没有这一步，进入购物车界面看不到数据)
    // 在详情页面就将购物车页面的数据修改，下次进入购物车页面就是正常数据
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  globalData: {
    userInfo: null,
    // 购物车信息
    cartList: []
  }
})
import {baseUrl} from "./config"
export default function request(options){
  // 发送网络请求出现加载动画
  wx.showLoading({
    title: 'Loading',
  })
  return new Promise((resolve,reject) => {
    wx.request({
      url:baseUrl + options.url,
      data:options.data || {},
      method:options.method || "get",
      success:(res => {
        resolve(res)
      }),
      fail:(err => {
        reject(err)
      }),
      // 无论请求成功失败，都隐藏加载动画
      complete:(() => {
        wx.hideLoading()
      })
    })
  })
}
import request from "./request"

// 1.获取首页轮播图和推荐数据
export function getHomeMultidata(){
  return request({
    url:"/home/multidata"
  })
}

// 2.获取首页流行、新款、精选商品数据
export function getHomeGoodsData(type,page){
  return request({
    url:"/home/data",
    data:{
      type,
      page
    }
  })
} 
import request from './request.js'

// 1.获取侧边栏菜单数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

// 2.获取当前子菜单分类的内容
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}
// 3.获取当前子菜单下的商品详情信息
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}
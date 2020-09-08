// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "../../service/category"
Page({
  data: {
    categories: [],
    // 右侧分类内容，包含子分类和商品详情
    categoryData: {},
    currentIndex: 0
  },
  onLoad: function (options) {
    this._getData()
  },
  // --------------------------------------网络请求函数--------------------------------------

  // 1.获取默认显示的所有分类数据
  _getData() {
    // 1.1 初始化右侧分类数据，包括子分类和商品详情
    getCategory().then(res => {
      const categories = res.data.data.category.list;
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subCategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories: res.data.data.category.list,
        categoryData
      })
      // 1.2 请求第一个类别的数据
      this._getSubcategory(0)
      // 1.3 请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },

  // 2.获取子分类数据
  _getSubcategory(currentIndex) {
    // 2.1获取当前分类的key
    const maitkey = this.data.categories[currentIndex].maitKey
    // 2.2根据key请求子分类数据
    getSubcategory(maitkey).then(res => {
      const categoryData = this.data.categoryData
      categoryData[currentIndex].subCategories = res.data.data.list
      this.setData({
        categoryData
      })
    })
  },

  // 3.获取商品详情数据
  _getCategoryDetail(currentIndex) {
    // 3.1 获取当前子菜单的detailKey
    const detailKey = this.data.categories[currentIndex].miniWallkey
    // 3.2 请求数据类别的数据(由于不能选择type,写死type为pop)
    this._getRealCategoryDetail(currentIndex, detailKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },

  // 4.获取真的categoryData
  _getRealCategoryDetail(currentIndex,detailKey,type){
    getCategoryDetail(detailKey,type).then(res => {
      const categoryData = this.data.categoryData
      categoryData[currentIndex].categoryDetail = res.data
      this.setData({
        categoryData
      })
    })
  },
  // -----------------------------------事件处理函数--------------------------------------------

  // 5.side-menu点击，请求当前分类数据
  menuClick(e) {
    const currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)
    this._getCategoryDetail(currentIndex)
  }
})
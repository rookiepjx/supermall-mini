// pages/category/cpn/w-side-menu/w-side-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      const currentIndex = e.currentTarget.dataset.index;
      console.log(currentIndex);
      this.setData({
        currentIndex:currentIndex
      })
      // 子组件向父组件发射事件
      this.triggerEvent('menuclick', {currentIndex}, {})
    }
  }
})

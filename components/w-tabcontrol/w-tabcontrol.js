// components/w-tabcontrol/w-tabcontrol.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e){
      this.setData({
        currentIndex:e.currentTarget.dataset.index
      })
      // 子组件发射事件到外面
      const data = {index:this.data.currentIndex}
      this.triggerEvent("tabClick",data,{})
    },
    // 暴露出去让占位的tabControl组件调用
    setCurrentIndex(index){
      this.setData({
        currentIndex:index
      })
    }
  }
})

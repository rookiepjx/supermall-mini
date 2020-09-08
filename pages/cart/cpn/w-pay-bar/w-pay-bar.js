// pages/cart/cpn/w-pay-bar/w-pay-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        selected:{
            type:Boolean,
            value:true
        },
        price:{
            type:Number,
            value:0
        },
        count:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSelectedAll(){
            this.triggerEvent("handleSelectedAll",{},{})
        }
    }
})

// pages/cart/cpn/w-cart-item/w-cart-item.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goods: {
            type: Object,
            value: {}
        },
        index: {
            type: Number
        }
    },
    data: {

    },
    methods: {
        onCheckClick(e) {
            // 1.查找到对应的商品
            const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
            goods.checked = !goods.checked
            // 2.获取当前商品的index
            const index = e.currentTarget.dataset.index;
            // 3.回调
            app.changeGoodsState(index, goods)
        }
    }
})
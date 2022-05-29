class Cart {
    constructor() {
        this.getCartData();
        // this.distribute();
        //给ul绑定
        this.$('.cart-list').addEventListener('click', this.distribute.bind(this))
        this.$('.cart-th input').addEventListener('click',this.checkAll.bind(this))
            
        
    }
    //分发的方法
    distribute(eve){
        let target = eve.target;
        // console.log(target);
        if(target.nodeName == 'A' && target.classList.contains('btndel'))this.delGoodsData(target)
    }
    //全选的方法
    checkAll(eve){
        // console.log(this);
        let allStatus = eve.target.checked;
        console.log(allStatus);
        this.getCheck(allStatus)


    }
    //获取单选的方法 并且跟随全选
    getCheck(status){
        console.log(this);
    this.$('.good-checkbox').forEach(input => {
            input.checked= status;
        })
    }
    //单选的实现
    MultipleChoice(){
       this.$('.goods-list .good-checkbox').forEach(input =>{
           let pointTo = this;
        input.onclick = function() {
            //判断如果点击的为false的话那么 全选按钮叶变成false
            if(!this.checked){
                pointTo.$('.cart-th input').checked = false;
            }
        }
       })
    //    console.log(this.$('.goods-list .good-checkbox'));
    }

    //删除的方法
    delGoodsData(tar){
        // console.log('1');
        let ul = tar.parentNode.parentNode.parentNode
        console.log(ul);
        let gId = ul.dataset.id;
        // console.log(gId);
        let uId = localStorage.getItem('user_id')
        // console.log(uId);
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
       axios.get('http://localhost:8888/cart/remove',{
        params:{
            id:uId,
            goodsId:gId
        }
       }).then((res) => {
        //    console.log(res);
        ul.remove();
       })
      


    }
    //获取到添加进来的购物车信息 并且渲染到页面中
    async getCartData() {
        //携带token用于知道是否登录
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        let {data,status} =await axios.get('http://localhost:8888/cart/list',{
            params: {
                id:localStorage.getItem('user_id') 
            },
        })
        // console.log(data,status);
        if(status == 200 && data.code == 1){
            let html=''
            data.cart.forEach(goods => {
               
                html +=`<ul class="goods-list active yui3-g "data-id="${goods.goods_id}">
                <li class="yui3-u-3-8 pr">
                    
                    <input type="checkbox" class="good-checkbox">
                    
                    <div class="good-item">
                        <div class="item-img">
                            <img src="${goods.img_small_logo}">
                        </div>
                        <div class="item-msg">${goods.title}</div>
                    </div>
                </li>
               
                <li class="yui3-u-1-8">
                    <span class="price">${goods.price}</span>
                </li>
                <li class="yui3-u-1-8">
                    <div class="clearfix">
                        <button class="increment mins">-</button>
                        <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
                        <button class="increment plus">+</button>
                    </div>
                    <div class="youhuo">有货</div>
                </li>
                <li class="yui3-u-1-8">
                    <span class="sum">${goods.price}</span>
                </li>
                <li class="yui3-u-1-8">
                    <div>
                        <a href="#none" class="btndel">删除</a>
                    </div>
                    <div>移到我的关注</div>
                </li>
            </ul>`
            // console.log(goods.goods_id);
            });
            this.$('.cart-list').innerHTML= html;
           this.MultipleChoice()
        }

    }
    $(ele){
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0]: res
    }
}
new Cart;
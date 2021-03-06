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
        if(target.nodeName == 'BUTTON' && target.classList.contains('btnadd'))this.plusSum(target)
        if(target.nodeName == 'BUTTON' && target.classList.contains('mins'))this.minsSum(target)
    }
    /**********点击-的时候减少物品和价格**************/
    minsSum(tar){
        // this.plusSum(tar);
        // console.log(tar);
        //获取ul里的价格小计数量的节点
        let ul =tar.parentNode.parentNode.parentNode;
        // console.log(ul);
        let price = ul.querySelector('.price').innerHTML - 0;
        let sum = ul.querySelector('.sum');
        let num =  ul.querySelector('.itxt')
        // console.log(num,ul);
        let numVal = num.value;
        numVal--
        if(numVal == 0) return
    //   console.log(numVal); 
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let uId = localStorage.getItem('user_id');
    let gId = ul.dataset.id;
    let param = `id=${uId}&goodsId=${gId}&number=${numVal}`
    axios.post(' http://localhost:8888/cart/number',param).then(res=>{
        let {status,data} = res;
        if(status == 200 && data.code == 1 ){
            num.value = numVal;
            sum.innerHTML = parseInt(numVal * price * 100)/100
            this.countPrint();
        }
    })

         

    }
    /*********点击+的时候增加物品和价格***********/
    plusSum(tar){
        console.log(tar);
        //获取ul 和 价格 小计 数量的节点 
        let ul = tar.parentNode.parentNode.parentNode;
        // console.log(ul);
        let price = ul.querySelector('.price').innerHTML - 0;
        let sum = ul.querySelector('.sum')
        let num =  ul.querySelector('.itxt');
        console.log(price,sum,num);
         // 获取数量
      let numVal = num.value;
      numVal++;
      console.log(numVal); 
      // 对数量进行加1 操作
      const AUTH_TOKEN = localStorage.getItem('token')
      axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      let uId = localStorage.getItem('user_id')
      let gId = ul.dataset.id;
      let param = `id=${uId}&goodsId=${gId}&number=${numVal}`
      axios.post(' http://localhost:8888/cart/number',param).then(res=>{
        //   console.log(res);
        let{status,data} = res;
        if(status == 200 && data.code ==1 ){
        num.value = numVal
        sum.innerHTML = parseInt(numVal * price * 100)/100
        this.countPrint();
        }
      })
      
      

    }
    //选择到的商品获取价格和数量并且渲染到页面中
    countPrint(){
        console.log('11');
        //数字 sum金额
        let num = 0 
        let sum = 0
        //只获取选中的商品
        this.$('.good-checkbox').forEach(input => {
            if(input.checked){
                //通过input 找到ul
                let ul = input.parentNode.parentNode;
                console.log(ul);
                let tmpNum = ul.querySelector('.itxt').value - 0;
                let tmpSum = ul.querySelector('.sum').innerHTML - 0;
                console.log(tmpNum, tmpSum);
                
                sum += tmpSum;
                num += tmpNum;
                
            }
            
            sum = parseInt(sum * 100) / 100
            // console.log(sum, num);
        
            // 将数量和价格放到页面中
            this.$('.toNum').innerHTML = num;
            this.$('.summoney').innerHTML = sum;
        })
    }
    //全选的方法
    checkAll(eve){
        // console.log(this);
        let allStatus = eve.target.checked;
        console.log(allStatus);
        this.getCheck(allStatus)
        this.countPrint();

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
           console.log(this);
        input.onclick = function() {
            console.log('fdfd',pointTo);
            //判断如果点击的为false的话那么 全选按钮叶变成false
            if(!this.checked){
                pointTo.$('.cart-th input').checked = false;
            }
            if(this.checked){
               let status = pointTo.checkStatus();
                pointTo.$('.cart-th input').checked = status;
            }

               pointTo.countPrint();
        }
       })
    //    console.log(this.$('.goods-list .good-checkbox'));
    }
    //判断单选按钮的状态
    checkStatus(){
        let res = Array.from(this.$('.good-checkbox')).find(input => {
            // console.log(input.checked);
            //如果有没被选中的就返回false;
            return !input.checked
          })
      
          // console.log(res);
          // 如果res有值,则页面中有没被选中的
          // 页面中都被选中,则返回true
          return !res;
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
                        <button class="increment plus btnadd">+</button>
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
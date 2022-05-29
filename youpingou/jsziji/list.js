class List{
    constructor(){
        this.getGoodsData();
        //给ul绑定委托事件
    //    this.distribute();
    this.$('.sort_list ul').addEventListener('click', this.skipLogin.bind(this))
    }
  
    //跳转到login页面
        skipLogin(eve){
            //给ul绑定委托事件
            let target =eve.target
            // console.log(target);
            //判断是否点击到A标签
            if(target.nodeName !== 'DIV' && target.classList !== "buy") return
                // console.log('111');
                let token = localStorage.getItem('token')
                if (!token) location.assign('./login.html?ReturnUrl=./list.html')
                let goodsId=eve.target.parentNode.dataset.id;
        //    console.log(goodsId);
                let userId = localStorage.getItem('user_id')
                // console.log(userId);

            this.getShopPing(goodsId,userId);
        }
        //点击购物车获取购物车的详细信息
        getShopPing(gId,uId){
        console.log(gId,uId);
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let param = `id=${uId}&goodsId=${gId}`;
        axios.post('http://localhost:8888/cart/add',param).then(res=>{
          console.log(res);
          layer.open({
            title: '购物车'
            ,content: '商品已加入要进入购物车吗?'
            ,btn: ['不进入', '进入']
            ,btn2: function(index, layero){
             
              location.assign('./shopcart.html');
            } 
          });
          if(res.status == 200 && res.data.code == 401){
            layer.closeAll("page")
            location.assign('./login.html')
          }
        })
          

        }
    //获取数据渲染到页面中
   async getGoodsData(){
    //发送请求获取商品
     let {status,data}=await axios.get('http://localhost:8888/goods/list')
     console.log(status,data);
    //片段是否获取成功 如果获取成功就渲染道页面中
    if(status != 200 && data.code != 1) return;
        let html = '';
        data.list.forEach(goods => {
            html +=`
            <li data-id=${goods.goods_id}>
                <img src="${goods.img_big_logo}" alt="" />
                <div class="prise_char">
                  <p>${goods.title}</p>
                  <div class="prise">
                    ￥${goods.current_price}
                    <span>￥${goods.price}</span>
                  </div>
                  <div class="prise_count">
                    <div class="prise_count_1">
                      <div>已售${goods.sale_type}</div>
                      <div class="yu">
                        <span> </span>
                      </div>
                      <div>余<span class="yu_num">29</span>件</div>
                    </div>
                  </div>
                  <div style="clear: both"></div>
                </div>
                <div class="buy">立即抢购</div>
              
            </li>
          `
         
        });
        this.$('.sort_list ul').innerHTML+=html
    }
    //点击加入购物车
    
    $(ele){
        let res = document.querySelectorAll(ele);
        return res.length ==1 ?res[0]:res;

    }
}
new List
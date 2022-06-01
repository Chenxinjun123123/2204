class Phone{
         
            // console.log(small);
    constructor(){
       
        this.$('.addcart').addEventListener('click', this.turnCart)
        let search = location.search;
        if (search) {
          this.url = search.split('=')[2]
        }
        this.addEvent()
        this.getDetails();
        // this.magniFyingGlass();
        
       
        
    }


    //获取详情数据
    getDetails(){
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        let gId = this.url
        console.log(gId);
        axios.get('http://localhost:8888/goods/item?id='+gId).then((res) => {
          let {status,data} = res
        if(status == 200 && data.code == 1){
           let info = data.info
           console.log(info);
            let html = '';
            html += `
          
            <img src="${info.img_big_logo}" alt="" />
            <div class="shouji_mask"></div>
            <div class="shouji_big"><img src="${info.img_big_logo}" id="img" /></div>
           `
            this.$('.shouji_small').innerHTML = html
        }
        this.addEvent();
        })
    }
            addEvent (){
               
            this.small = document.querySelector('.sm')
            this.mask = document.querySelector('.shouji_mask')
            this.big = document.querySelector('.shouji_big')
            this.box  = document.querySelector('.shouji_img_self')
            this.img = document.querySelector('#img')
            console.log(this.small);
            console.log(this.mask);
                //声明一个共用的this 把所有的this 都指向共用的this 然后把addEvent指向Star(类名)
                var this1 = this;
               this.small.onmouseenter =  function() {this1.event()}
          
               this.small.onmouseleave = function() {this1.yc()}
                   
                this.small.onmousemove =function(e){
                    this1.yidong(e);
                } 
                   
               
            }
        event(){
           console.log(this.mask);
           console.log(this.big);
            this.mask.style.display = 'block';
            this.big.style.display = 'block';
        }
        yc(){
            this.mask.style.display = 'none';
            this.big.style.display = 'none';
        }
        yidong(e){
            let maxW = this.small.offsetWidth - this.mask.offsetWidth;
            let maxH = this.small.offsetHeight - this.mask.offsetHeight; 
            //鼠标在页面中的坐标
            let px = e.pageX;
            let py = e.pageY;
            //获取box的实时left 和top值
            let boxLeft = this.box.offsetLeft;
            let boxTop = this.box.offsetTop;
            //获取mask实时坐标并且赋值
            this.tmpX = px - boxLeft - this.mask.offsetWidth/2;
            this.tmpY = py - boxTop - this.mask.offsetHeight/2;
           
            //判断在盒子移动的最大值
            if(this.tmpX > maxW){
                this.tmpX = maxW;
            }
            if(this.tmpY > maxH){
                this.tmpY = maxH;
            }
            if(this.tmpX < 0){
                this. tmpX = 0;
            }
            if(this.tmpY < 0){
                this.tmpY = 0;
            }
            this.mask.style.left = this.tmpX + 'px';
            this.mask.style.top = this.tmpY + 'px';

            //求img在big里的移动的最大值
            let imgmanL = img.offsetWidth - this.big.offsetWidth;
            let imgmanY = img.offsetHeight - this.big.offsetHeight;
            //利用公式
            let ss = this.tmpY / maxH * imgmanY;
            let tt = this.tmpX / maxW * imgmanL;
            img.style.left =  - tt + 'px'
            img.style.top = - ss +'px'
        }
    /*****点击购物车的方法******/
    turnCart(){
        location.assign('./shopcart.html')
    }
    $(ele){
        let res = document.querySelectorAll(ele)
        return res.length == 1 ? res[0]: res
    }
}
new Phone ; 
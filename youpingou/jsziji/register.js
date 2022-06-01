class Register{
    constructor(){
        // this.getFormVal();
        this.$('.btn-sbm').addEventListener('click', this.getFormVal)
    }
    /***********获取form表单中的value值****************/
    getFormVal(){
        let form = document.forms[0].elements
        // console.log(form);
       let username = form.username.value.trim();
       let password = form.password.value.trim();
       let rpassword = form.rpassword.value.trim();
       let nickname = form.nickname.value.trim();
       //非空验证
       if(password !== rpassword)  throw new Error('两次密码不一致')
       if(!username||!password||!rpassword||!nickname)  throw new Error('内容不得为空'); 
       let param =`username=${username}&password=${password}&rpassword=${rpassword}&nickname=${nickname}`
       axios.post('http://localhost:8888/users/register',param,{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
       }).then((res) => {
        console.log(res.data,res.status);
        if(res.status == 200 , res.data.code == 1){
            location.assign('./login.html')
        }
        if(res.status == 200 , res.data.code == 0){
            alert('注册失败')
        }
       })

    }
    $(ele){
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0]: res
    }
}
new Register;
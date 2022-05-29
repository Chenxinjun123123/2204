class Login{
    constructor(){
        // this.getForm();
        this.$('.login_form_btn .over').addEventListener('click',this.getForm.bind(this))
        let search = location.search;
        if (search) {
          this.url = search.split('=')[1]
        }
    }
//获取form表单中的值
getForm(e){
    let form = document.forms[0].elements;
    // console.log(form.username);
    // console.log(form.input);
    // console.log(form.password);
    let username = form.username.value.trim()
    let password = form.password.value.trim()
    // console.log(username);
    //非空验证
    if(!username || !password) return
    let param = `username=${username}&password=${password}`
    axios.post('http://localhost:8888/users/login',param,{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        // console.log(res);
        if(res.status == 200 && res.data.code ==1){
      // 将token和user保存到local
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user.id);
      // 如果有回调的地址,则跳转
      if (this.url) {
        location.href = this.url;
            }
            
        }
        
        
        
    })
       


}
$(ele){
    let res = document.querySelectorAll(ele)
    return res.length == 1 ? res[0]:res

}
}
new Login;
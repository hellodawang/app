<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="logo">
        <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="2.5rem" height="0.88rem" viewBox="0 0 125 65" enable-background="new 0 0 125 65" xml:space="preserve">
          <g>
            <path fill="#4190FF" d="M50.262,30.687l-1.425,2.008c0.888-1.256,1.421-2.008,1.421-2.008h-2.789c0,0-4.158,0-5.933,1.725
              c-0.699,0.679-7.757,10.849-7.757,10.849h-2.231l8.924-12.574h-2.585c0,0-4.969,0.051-7.048,2.688
              c-2.079,2.637-6.896,9.886-6.896,9.886l-2.18,0.053l8.822-12.626h-2.941c0,0-4.63,0.003-6.591,2.789L1.481,61.262h4.056
              c0,0,3.905-0.709,5.223-2.384c1.318-1.673,1.318-1.673,1.318-1.673l5.983-8.671h2.181l-8.975,12.728h3.499
              c0,0,3.75-0.575,5.223-1.774c1.85-1.51,7.859-10.901,7.859-10.901l2.231-0.052l-9.025,12.728h3.346c0,0,4.284,0,5.679-2.028
              c0.532-0.774,9.648-13.663,15.443-21.853h8.29L37.029,61.262c6.655,0.405,9.127-2.23,9.127-2.23l15.414-21.65
              c0,0,4.057,0.017,6.844-0.103c5.933-0.254,8.012-6.591,8.012-6.591H50.262z"/>
            <g>
              <path fill="#4190FF" d="M53.519,23.334h4.228c-2.996-5.896-9.115-9.938-16.182-9.938c-7.852,0-14.538,4.988-17.065,11.968h3.945
                c2.319-4.918,7.321-8.323,13.12-8.323C46.527,17.041,50.904,19.534,53.519,23.334z"/>
              <path fill="#4190FF" d="M79.597,6.393c11.995,0,21.719,9.724,21.719,21.718c0,0.3-0.011,0.598-0.022,0.896h4.709
                c0.011-0.297,0.018-0.596,0.018-0.896c0-14.593-11.83-26.422-26.423-26.422c-12.962,0-23.742,9.333-25.991,21.646h4.807
                C60.589,13.639,69.245,6.393,79.597,6.393z"/>
              <path fill="#4190FF" d="M112.729,24.93h-5.124v4.108h5.124c3.784,0.505,6.705,3.744,6.705,7.666c0,2.534-1.218,4.783-3.102,6.195
                l2.585,3.163c2.797-2.162,4.602-5.548,4.602-9.358C123.52,30.523,118.774,25.453,112.729,24.93z"/>
            </g>
            <text transform="matrix(1 0 0 1 62.792 59.7783)" fill="#C7DEFF" font-family="'STXingkai'" font-size="18.0941">鸿合云</text>
          </g>
        </svg>
      </div>
      <div class="input-box">
        <label for=""><i class="icon iconfont icon-user"></i></label>
        <input type="text" placeholder="请输入用户名" v-model="username">
      </div>
      <div class="input-box">
        <label for=""><i class="icon iconfont icon-password"></i></label>
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="input-box verification">
        <label for=""><i class="icon iconfont icon-verification"></i></label>
        <input type="text" placeholder="验证码" v-model="verificationCode">
        <img :src="captchaUrl" />
      </div>
      <div class="submit" @click="submit"> 登录</div>
    </div>
  </div>
</template>

<script>
// import '../'
export default {
  name: '',

  data () {
    return {
      username:'',
      password:'',
      verificationCode:'',
      captchaUrl:''
    }
  },
  mounted(){
    this.CookieID = new Date().getTime()
    let that = this;
    this.$axios
			.get('/login/login/validateCode',{headers:{'CookieID':that.CookieID},responseType:'blob'})
			.then(function(response) {
        let reader = new FileReader();    
				reader.onload = function (e) {
          
					that.captchaUrl = e.target.result
				}
				reader.readAsDataURL(response.data)
			})
			.catch(function(error) {
				console.error(error);
			});
  },
  methods: {
    submit(){
      this.$axios({
        method:'post',
        url:'/login/login/loginCheck',
        headers:{'CookieID':this.CookieID},
        data:{
          loginName: this.username,
          passWord: this.password,
          code: this.verificationCode,	
        }
      }).then(response => {
        switch(response.data.code){
          // 登陆成功
          case '0000':
            sessionStorage.token =  response.data.data.tokenType +" "+ response.data.data.accessToken;
            sessionStorage.accessToken = response.data.data.accessToken
            // 请求用户信息
            return this.$axios.post('/auth/auth/findUserRolePermissions')
          // // 用户信息不完整  但是仍属于登录成功
          // case '1000':
          //   this.token =  response.data.data.tokenType +" "+ response.data.data.accessToken;
          //   this.accessToken = response.data.data.accessToken;
          //   sessionStorage.token =  response.data.data.tokenType +" "+ response.data.data.accessToken;
          //   sessionStorage.accessToken = response.data.data.accessToken
          //   return this.$axios.post('/userapi/userManager/findSelfInfo')
          //   break;
          case "1001":
            this.refreshVerification()
            // this.$confirm('登录名称为空或者不符合规范', this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
          case "1002":
            this.refreshVerification()
            // this.$confirm('登录密码为空或者不符合规范', this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
          case "1003":
            this.refreshVerification()
            // this.$confirm('登录验证码为空或者不符合规范', this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
          case "1004":
            this.refreshVerification()
            // this.$confirm(this.$i18n.t('login.incorrectVerificationCode'), this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
          case "1005":
            this.refreshVerification()
            // this.$confirm('客户端身份为空或者不符合规范', this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
          case "1006":
            this.refreshVerification()
            // this.$confirm(this.$i18n.t('login.incorrectUsernameOrPassword'), this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
          case "9999":
            this.refreshVerification()
            // this.$confirm('系统繁忙，请稍后再试', this.$i18n.t('common.tips'), {
            //   confirmButtonText: this.$i18n.t('button.determine'),
            //   type: 'warning'
            // })
            break
        }
      }).then(res => {
        if(res.config.url == '/userapi/userManager/findSelfInfo'){
          // this.ruleForm1 = res.data.data;
          // sessionStorage.token='';
          // sessionStorage.accessToken=''
        }else{
          res.data.data.menuList.sort((a, b) => a.sortCode < b.sortCode ? -1 : 1)
          let role = res.data.data.role.split(';').join(' ')
          res.data.data.role = role
          sessionStorage.setItem('userData',JSON.stringify(res.data.data))				
          role.match('Company Admin') ? this.checkUserType() : this.$router.push('/gui/index')
        }	
      })
    },
    refreshVerification(){
			let that = this
			this.$axios
			.get('/login/login/validateCode',{headers:{'CookieID':this.CookieID},responseType:'blob'})
			.then(function(response) {
				let reader = new FileReader();
				reader.onload = function (e) {
					that.captchaUrl = e.target.result
				}
				reader.readAsDataURL(response.data)
			})
			.catch(function(error) {
				console.log(error);
			});
    },
    checkUserType(){
      
    }
  }
}
</script>

<style >
    .login-wrapper{
      height: 100%;
      width: 100%;
      background: url('../../assets/1.jpg') no-repeat center center;
      background-size: cover;
      position: relative;
    }
    .logo{
      text-align: center;
      margin-bottom: 1rem;
    }
    .login-box{
      position: absolute;
      width: 6rem;
      height: 8rem;
      left: 50%;
      top: 50%;
      margin-left: -3rem;
      margin-top: -4rem;
    }
    .input-box{
      width: 6rem;
      height: 0.8rem;
      border-bottom:1px solid #ccc;
      margin-bottom: 0.3rem;
      /* border-radius: 4px; */
    }
    .input-box input{
      background:none;  
      outline:none;  
      border:0px;
      height: 0.8rem;
      color: #f6f6f6
    }
    .input-box label{
      display: inline-block;
      margin-left: 0.1rem;
      width: 0.6rem
    }
    .input-box .iconfont{
      color: #f6f6f6;
      font-size: 0.36rem;
    }
    .input-box.verification img{
      width: 2.8rem;
      display: inline-block;
      vertical-align: top
    }
    .input-box.verification input{
      width: 2.3rem;
    }
    .submit{
      text-align: center;
      width: 6rem;
      height: 0.6rem;
      background-color: #409EFF;
      border-radius: 0.25rem;
      margin: 0.5rem auto 0;
      font-size: 0.36rem;
      line-height: 0.6rem;
      color: #fff;
    }
</style>

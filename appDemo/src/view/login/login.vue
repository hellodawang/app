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
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
      <img :src="captchaUrl" ref="verification"/>
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
      email:'',
      password:'',
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
  methods: {}
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
      /* text-align: center; */
    }
</style>

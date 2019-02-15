// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/http'

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import ElementUI from 'element-ui';
// import echarts from 'echarts'
// import store from './store/index'


Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    // store,
    // i18n,
    render: h => h(App)
})
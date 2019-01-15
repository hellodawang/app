// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/http'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import ElementUI from 'element-ui';
// import echarts from 'echarts'
// import store from './store/index'
// import VueI18n from 'vue-i18n'
// import LangEn from './lang/en'
// import LangZh from './lang/zh'
// import locale from 'element-ui/lib/locale'

/* vue-i18n注册 */
// Vue.use(VueI18n)
// // 设置语言项
// const i18n = new VueI18n({
//   locale: 'zh',
//   messages: {
//     'en': LangEn,
//     'zh': LangZh,
//   }
// })

// locale.i18n((key, value) => i18n.t(key, value))

Vue.use(MintUI);
// Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    // store,
    // i18n,
    render: h => h(App)
})
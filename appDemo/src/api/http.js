
import axios from 'axios'
import router from '../router'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
axios.defaults.baseURL = process.env.API_ROOT
// console.log(process.env.API_ROOT)

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.token) { 
      config.headers.Authorization = sessionStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)
// http response 拦截器
axios.interceptors.response.use(
  response => {  
    let config = response.config
    if(response.data.code == '9999'){
      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;
      // Check if we've maxed out the total number of retries
      if(config.__retryCount >= config.retry) {
        return response
      }
      config.__retryCount += 1;
       // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
      });
    
      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
          return axios(config);
      });
    }else{
      return response 
    }  
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
          return Promise.reject(error.response.data) 
        break;
        case 500:
          var config = error.config;
          // If config does not exist or the retry option is not set, reject
          if(!config || !config.retry) return Promise.reject(error);
          
          // Set the variable for keeping track of the retry count
          config.__retryCount = config.__retryCount || 0;
          
          // Check if we've maxed out the total number of retries
          if(config.__retryCount >= config.retry) {
              // Reject with the error
              return Promise.reject(error);
          }         
          // Increase the retry count
          config.__retryCount += 1;
          
          // Create new promise to handle exponential backoff
          var backoff = new Promise(function(resolve) {
              setTimeout(function() {
                  resolve();
              }, config.retryDelay || 1);
          });          
          // Return the promise in which recalls axios to retry the request
          return backoff.then(function() {
              return axios(config);
          });
        break;
        case 504:
          var config = error.config;
          // If config does not exist or the retry option is not set, reject
          if(!config || !config.retry) return Promise.reject(error);
          
          // Set the variable for keeping track of the retry count
          config.__retryCount = config.__retryCount || 0;
          
          // Check if we've maxed out the total number of retries
          if(config.__retryCount >= config.retry) {
              // Reject with the error
              return Promise.reject(error);
          }         
          // Increase the retry count
          config.__retryCount += 1;
          
          // Create new promise to handle exponential backoff
          var backoff = new Promise(function(resolve) {
              setTimeout(function() {
                  resolve();
              }, config.retryDelay || 1);
          });          
          // Return the promise in which recalls axios to retry the request
          return backoff.then(function() {
              return axios(config);
          });
        break;
        default:
          return Promise.reject(error.response.data)    
      }
    }
    
  },
)

export default axios

import { createApp } from "vue";
import router from './router'
import store from './store'
import App from "./App.vue";
import { icode, baseURL } from './config'
import axios from 'axios'
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(config => {
  //get请求，添加到url中
  config.params = { ...config.params, icode: icode };
  //其他请求，添加到body中
  //如果是上传文件，添加到formData中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode);
  } else {
    config.data = { ...config.data, icode: icode };
  }
  store.commit('setLoading', true);
  store.commit('setError', {
    status: false, message: ''
  });
  return config;
});
axios.interceptors.response.use(config => {
  store.commit('setLoading', false);
  return config;
}, e => {
  const { error } = e.response.data;
  store.commit('setError', {
    status: true, message: error
  });
  store.commit('setLoading', false);
  return Promise.reject(error);
});
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

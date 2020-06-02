// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "amfe-flexible"
import $axios from 'axios'
// import iView from 'iview'
import Loading from './plugins/loading'
// import 'iview/dist/styles/iview.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import EXIF from 'exif-js'
import Vant from 'vant';
import 'vant/lib/index.css';
// import touch from 'vue-directive-touch'
Vue.use(Vant);
// Vue.use(touch)
Vue.prototype.Exif = EXIF
// Vue.use(ElementUI);
// Vue.use(iView)
Vue.use(Loading)
Vue.prototype.$axios=$axios
$axios.defaults.baseURL = "http://42.228.55.197:8090/HouseRegistration";    // 默认地址
// $axios.defaults.baseURL = "http://1.85.42.93:9902/HouseRegistration"; 
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import { createApp } from 'vue';

// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// Bootstrap
import 'bootstrap';
// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';
// Sweet Alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Vee Validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
//  Vue Loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// 自訂
import { date, currency } from './methods/filters';
// 原生
import App from './App.vue';
import router from './router';

// Vee Validate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]); // 載入規則
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filters = {
  date,
  currency,
};
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.component('Loading', Loading);
app.component('ErrorMessage', ErrorMessage);
app.component('Field', Field);
app.component('Form', Form);
app.mount('#app');

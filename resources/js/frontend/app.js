require('../bootstrap');
require('../plugins');

import { store } from './store';
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.component('table-boot', require('./components/TableBoot.vue').default);
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


const app = new Vue({
    el: '#app',
    store,
});


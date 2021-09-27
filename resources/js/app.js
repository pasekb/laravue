
require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes =[
    {path:'/data-dokumen', component:require('./components/dokumen/Data-Dokumen.vue').default},
    {path:'/data-level', component:require('./components/dokumen/Data-Level.vue').default},
]

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const router = new VueRouter({
    mode: 'history',
    routes
})

const app = new Vue({
    el: '#app',
    router
});

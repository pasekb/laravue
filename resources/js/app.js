
require('./bootstrap');

window.Vue = require('vue').default;

import {Form, HasError, AlertError} from 'vform';
window.Form  = Form;


let Fire = new Vue();
window.Fire = Fire;
//sweetalert
import Swal from 'sweetalert2';
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.Toast = Toast;

//progress bar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar,{
    color: 'rgb(143, 255, 199)',
    failedcolor: 'red',
    height: '100px'
})

import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes =[
    {path:'/data-dokumen', component:require('./components/dokumen/Data-Dokumen.vue').default},
    {path:'/data-level', component:require('./components/dokumen/Data-Level.vue').default},
    {path:'/data-pengguna', component:require('./components/dokumen/Data-Pengguna.vue').default},
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

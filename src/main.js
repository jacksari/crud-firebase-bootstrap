import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const firebase = require("firebase/app");
require('firebase/auth');
require('firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyBCxYyVL2_aMo_u9nfD9BEdqsBkWwd8jOM",
    authDomain: "crud-vue-2cba6.firebaseapp.com",
    databaseURL: "https://crud-vue-2cba6.firebaseio.com",
    projectId: "crud-vue-2cba6",
    storageBucket: "crud-vue-2cba6.appspot.com",
    messagingSenderId: "226318058311",
    appId: "1:226318058311:web:c989bba3fb4781dbb18262"
};
// Initialize Firebase
const fireApp = firebase.initializeApp(firebaseConfig);
export default fireApp.firestore();

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
    //console.log(user);
    if (user) {
        store.dispatch('detectarUsuario', { email: user.email, uid: user.uid })
    } else {
        store.dispatch('detectarUsuario', { email: '', uid: '' })
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");

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
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import route from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF-ClUkzozxtOdtpcNGJYS1r55txYvdW4",
  authDomain: "gestao-de-tarefas-d9079.firebaseapp.com",
  projectId: "gestao-de-tarefas-d9079",
  storageBucket: "gestao-de-tarefas-d9079.appspot.com",
  messagingSenderId: "79579981659",
  appId: "1:79579981659:web:713c5ac12364381119dc7e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(store).use(router).use(route).mount('#app')

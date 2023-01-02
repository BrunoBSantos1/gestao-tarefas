<template>
  <div class="container">
    
    <form>
      <img class="mb-4" src="../assets/loginImage.png" alt="" width="72" height="57">
      <h1 class="h3 mb-3 fw-normal">Login</h1>

      <div class="form-floating mb-3">
        <input type="email" class="form-control input" id="floatingInput" placeholder="name@example.com" v-model="email">
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control input" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Senha</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="button" @click="loginObject()">Login</button>
    </form>
  </div>
</template>

<script>
////import api from '@/services/api'
//import router from '@/vue'
//import firebase from 'firebase/auth'
//import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'LoginView',

    data() {
      return {
        email: null,
        password: null,
      }
    },

    methods: {
      async loginObject() {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in 
            const userResponse = userCredential.user;
            console.log(user)
            
            const userData = {
              access_token: userResponse.access_token,
              id: userResponse.uid,
              refresh_token: userResponse.refreshToken 
            }

            let user = JSON.stringify(userData)
            localStorage.setItem('user', user)
            this.$router.push('/home')
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      },
    }

}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }

  form {
    margin-top: 50px;
    width: 500px;
  }
 
</style>
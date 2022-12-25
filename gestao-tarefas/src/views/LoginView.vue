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
import api from '@/services/api'
import router from '@/router'
export default {
    name: 'LoginView',

    data() {
      return {
        email: null,
        password: null
      }
    },

    methods: {
      loginObject() {
        let dataLogin = {
          email: this.email,
          password: this.password
        }

        this.loginConexao(dataLogin)
      },

      async loginConexao(data) {
        await api.post('login',data)
        .then((response) => {
          let token = response.data.accessToken
          let user = JSON.stringify(response.data.user) 
          
          if(token) {
            const userObject = {
              'user': user,
              'accessToken': token
            }
            localStorage.setItem('user',JSON.stringify(userObject))
        

            router.push('/home')
          }
        })
        .catch((err) => {
          console.log(err.response.data)
        })
      }
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
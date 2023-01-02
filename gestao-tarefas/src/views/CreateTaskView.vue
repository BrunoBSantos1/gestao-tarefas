<template>
  <div class="container">
    <form >
      <h1 class="h3 mb-3 fw-normal">Nova Tarefa</h1>

      <div class="form-floating mb-3">
        <input type="text" class="form-control input" id="floatingInput" placeholder="Jogar o lixo fora" v-model="nameTask">
        <label for="floatingInput">Nome</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" class="form-control input" id="floatingPassword" placeholder="MM/DD/YYYY" v-model="dataConclusao">
        <label for="floatingPassword">Data de conclusão</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="button" @click="CreateTask()">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import router from '@/router'
import api from '../services/api'
export default {
  name: 'CreateTask',
  data() {
    return {
      idUser: null,
      nameTask: null,
      dataConclusao: null
    }
  },

  methods: {
    CreateTask() {
      const taksObject = {
        name: this.nameTask,
        dataConclusao: this.dataConclusao,
        status: 'Nao Iniciada',
        userId: this.idUser
      }
      this.createTexkConexao(taksObject)
    },

    async createTexkConexao(data) {
      await api.post('tasks',data)
            .then((response) => {
                if(response.status === 201)
                  this.$router.push('/list-tasks')
            })
            .catch((error) => {
                console.log(error);
            })
    }
  },

  mounted() {
    let user = JSON.parse(localStorage.getItem('user'))
    let userId = user.id
    this.idUser = userId
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
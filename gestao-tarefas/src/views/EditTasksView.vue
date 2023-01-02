<template>
    <div class="container">
      <form >
        <h1 class="h3 mb-3 fw-normal">Atualizar Tarefa</h1>
  
        <div class="form-floating mb-3">
          <input type="text" class="form-control input" id="floatingInput" placeholder="Jogar o lixo fora" v-model="nameTask">
          <label for="floatingInput">Nome</label>
        </div>
        <div class="form-floating mb-3">
          <input type="date" class="form-control input" id="floatingPassword" placeholder="MM/DD/YYYY" v-model="dataConclusao">
          <label for="floatingPassword">Data de conclusão</label>
        </div>
        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"  v-model="statusTask">
            <option selected>{{ statusTask }}</option>
            <option value="Nao Iniciada">Nao Iniciada</option>
            <option value="Andamento">Andamento</option>
            <option value="Concluida">Concluída</option>
        </select>
  
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="UpdatTask()">Atualizar</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api'
  export default {
    name: 'EditTask',
    data() {
      return {
        task: null,
        nameTask: null,
        dataConclusao: null,
        statusTask: null
      }
    },
  
    methods: {
        UpdatTask() {
        const taksObject = {
          name: this.nameTask,
          dataConclusao: this.dataConclusao,
          status: this.statusTask,
          userId: this.idUser
        }
        
        this.UpdateConexao(taksObject)
      },

      async UpdateConexao(data) {
        const id = this.$route.params.id
        await api.put(`tasks/${id}`,data,{
          params: {
            userId: this.idUser
          }
        })
        .then((response) => {
            this.task = response.data
            this.nameTask = this.task.name
            this.dataConclusao = this.task.dataConclusao
            this.statusTask = this.task.status
        })
        .catch((error) => {
            console.log('error: ',error);
        })
      },
  
      async getTask() {
        const id = this.$route.params.id
        await api.get(`tasks/${id}`,{
          params: {
            userId: this.idUser
          }
        })
            .then((response) => {
                this.task = response.data
                this.nameTask = this.task.name
                this.dataConclusao = this.task.dataConclusao
                this.statusTask = this.task.status
                console.log(this.statusTask);
            })
            .catch((error) => {
                console.log('error: ',error);
            })
      },
    },

    mounted() {
        let user = JSON.parse(localStorage.getItem('user'))
        let userId = user.id
        this.idUser = userId
        this.getTask()
      },
  
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

    select option {
        font-size: 12px;
    }
  </style>
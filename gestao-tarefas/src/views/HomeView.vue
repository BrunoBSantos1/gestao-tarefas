<template>
  <div class="container">
    <h3>Indicadores</h3>
    <ul class="indicadores">
      <li class="callout-notStarted" >Não iniciada <br>{{ notStarted }}</li>
      <li class="callout-info" >Andamento <br>{{ youTasksInProgess }}</li>
      <li class="callout-completed" >Concluídas <br>{{ completed }}</li>
    </ul>
    <h1>Tarefas em Andamento</h1>
    <ul class="callout-progress">
      <router-link v-for="task in tasksProgress" :key="task.id" :to="{name: 'editTask', params: {id: task.id}}">
        <li class="callout" ><strong>{{ task.name }}</strong><br><span>Data Conclusão {{ task.dataConclusao }}</span></li>
      </router-link>
      
    </ul>
  </div>
</template>

<script>
import api from "../services/api";
export default {
  name: "HomeView",
  data() {
    return {
      completed: 0,
      notStarted: 0,
      youTasksInProgess: 0,
      tasksProgress: [],
    };
  },

  methods: {
    async getTasks() {
      await api.get("tasks",{
        params: {
          userId: this.idUser
        }
      })
      .then((response) => {
        let tasks = [];
        tasks.push(response.data);
        for (let t of tasks[0]) {
          if (t.status === "Andamento") {
            this.tasksProgress.push(t);

            this.youTasksInProgess++
          }

          if (t.status === "Nao Iniciada") {
            this.notStarted++
          }

          if (t.status === "Concluida") {
            this.completed++
          }
        }
      });
    },
  },


  mounted() {
    let user = JSON.parse(localStorage.getItem('user'))
    let userId = user.id
    this.idUser = userId
    this.getTasks();
  },
};
</script>

<style scoped>

li {
  list-style: none;
  text-decoration: none;
  border: 1px solid;
  border-left: 5px solid;
  border-left-color: blue;
  border-radius: 5px;
  margin: 20px;
  height: 50px;
  color: black;
}
  .callout-info {
    width: 200px;
    border-left-color: blue;
  }

  .indicadores {
    display: flex;
    justify-items: center;
    width: 700px;
    height: 100px;
    margin: auto;
    text-align: center;
  }

  .callout {
    border: 1px solid;
    border-left: 5px solid;
    border-left-color: blue;
    border-radius: 5px;
  }

  .callout-progress {
    width: 700px;
    min-height: 500px;
    margin: auto;
  }

  .callout-completed {
    width: 200px;
    border-left-color: green;
  }
  
  .callout-notStarted {
    width: 200px;
    border-left-color: rgba(175, 180, 175, 0.644);
  }

  router-link {
    text-decoration: none ;
  }

</style>

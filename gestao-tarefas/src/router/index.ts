import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/new-task',
    name: 'newTask',
    component: () => import('../views/CreateTaskView.vue')
  },
  {
    path: '/list-tasks',
    name: 'listTask',
  
    component: () => import('../views/ListTasksView.vue')
  },
  {
    path: '/edit/:id',
    name: 'editTask',
    component: () => import('../views/EditTasksView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== "login" && !localStorage.getItem('user')) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router

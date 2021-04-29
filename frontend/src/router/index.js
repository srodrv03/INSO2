import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Inicio',
    component: () => import('../views/Login.vue'),
    meta: {
      hideForAuth: true
    }

  },
  {
    path: '/Registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue'),
    meta: {
      hideForAuth: true
    }

  },{
    path: '/HomeCliente',
    name: 'HomeCliente',
    component: () => import('../views/HomeCliente.vue'),
    meta: {
      hideForAuth: false
    }
  },{
    path: '/HomeEmpleado',
    name: 'HomeEmpleado',
    component: () => import('../views/HomeEmpleado.vue'),
    meta: {
      hideForAuth: true
    }
  },{
    path: '/HomeAdministrador',
    name: 'HomeAdministrador',
    component: () => import('../views/HomeAdmin.vue'),
    meta: {
      hideForAuth: true
    }

  },{
    path: '/AddCliente',
    name: 'AddCliente',
    component: () => import('../views/AddCliente.vue'),
    meta: {
      hideForAuth: true
    }

  }
] 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.logged) {
      next({ path: '/login' });
    } else {
      next();
    }

  } else {
    next();
  }

  if (to.matched.some(record => record.meta.hideForAuth)) {
    if (store.state.logged) {
        next({ path: '/home' });
    } else {
        next();
    }
} else {
    next();
}
})

export default router

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
    ,{
    path: '/AddEmpleado',
    name: 'AddEmpleado',
    component: () => import('../views/AddEmpleado.vue'),
    meta: {
      hideForAuth: true
    }
  }
  ,{
    path: '/AddVehiculo',
    name: 'AddVehiculo',
    component: () => import('../views/AddVehiculo.vue'),
    meta: {
      hideForAuth: true
    }
  }
  ,{
    path: '/HomeCliente/Vehiculos',
    name: '/HomeCliente/Vehiculos',
    component: () => import('../views/Vehiculos.vue'),
    meta: {
      hideForAuth: false
    }
  }
  ,{
    path: '/HomeCliente/Reparaciones',
    name: '/HomeCliente/Reparaciones',
    component: () => import('../views/Reparaciones.vue'),
    meta: {
      hideForAuth: false
    }
  }
  ,{
    path: '/HomeCliente/cuenta',
    name: '/HomeCliente/cuenta',
    component: () => import('../views/Cuenta.vue'),
    meta: {
      hideForAuth: false
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

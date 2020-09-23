import Vue from 'vue'
import VueRouter from 'vue-router'
const firebase = require("firebase/app");

Vue.use(VueRouter)

const routes = [{
        path: '/registro',
        name: 'registro',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Registro.vue')
    },
    {
        path: '/ingreso',
        name: 'ingreso',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Ingreso.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/agregar',
        name: 'agregar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Agregar.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/editar/:id',
        name: 'editar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Editar.vue'),
        meta: { requiresAuth: true }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requiresAuth)
    const user = firebase.auth().currentUser;
    if (rutaProtegida === true && user === null) {
        next({ name: 'ingreso' })
    } else {
        next()
    }
})

export default router
import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
const firebase = require("firebase/app");

import db from '../main';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: '',
        error: '',
        tareas: [],
        tarea: { nombre: '', id: '' }
    },
    mutations: {
        setUsuario(state, payload) {
            state.usuario = payload;
        },
        setError(state, payload) {
            state.error = payload
        },
        setTareas(state, tareas) {
            state.tareas = tareas;
        },
        setTarea(state, tarea) {
            state.tarea = tarea
        },
        eliminarTarea(state, id) {
            state.tareas = state.tareas.filter(doc => {
                return doc.id != id
            });
        }
    },
    actions: {
        crearUsuario({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
                .then(res => {
                    //console.log(res);
                    commit('setUsuario', { email: res.user.email, uid: res.user.uid });
                    //router.push({ name: 'home' });
                    db.collection(res.user.email).add({
                        nombre: 'Tarea de ejemplo'
                    }).then(() => {
                        router.push({ name: 'home' })
                    })
                })
                .catch(err => {
                    //console.log(err)
                    commit('setError', err.message);
                })
        },
        ingresoUsuario({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    //console.log(res)
                    commit('setUsuario', { email: res.user.email, uid: res.user.uid });
                    router.push({ name: 'home' });
                })
                .catch(err => {
                    //console.log(err)
                    commit('setError', err.message);
                })
        },
        detectarUsuario({ commit }, payload) {
            if (payload != null) {
                commit('setUsuario', { email: payload.email, uid: payload.uid });
            } else {

                commit('setUsuario', null);
            }
        },
        cerrarSesion({ commit }) {
            firebase.auth().signOut()
            commit('setUsuario', null);
            router.push({ name: 'ingreso' })
        },
        getTareas({ commit }) {
            const user = firebase.auth().currentUser;
            const tareas = []
            db.collection(user.email).get()
                .then(res => {
                    res.forEach(doc => {
                        let tarea = doc.data();
                        tarea.id = doc.id;
                        tareas.push(tarea);
                    })
                });
            commit('setTareas', tareas);
        },
        getTarea({ commit }, id) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(id).get()
                .then(doc => {
                    //console.log(doc.data());
                    let tarea = doc.data();
                    tarea.id = doc.id;
                    commit('setTarea', tarea);
                })
        },
        editarTarea({ commit }, tarea) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(tarea.id).update({
                nombre: tarea.nombre
            }).then(() => {
                router.push({
                    name: 'home'
                })
            })
        },
        agregarTarea({ commit }, nombre) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).add({
                nombre: nombre
            }).then(res => {
                console.log(res.id);
                router.push({
                    name: 'home'
                })
            })

        },
        eliminarTarea({ commit }, id) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(id).delete()
                .then(() => {
                    console.log('Tarea eliminada');
                    commit('eliminarTarea', id);
                })
        }
    },
    getters: {
        existeUsuario(state) {
            if (state.usuario == null || state.usuario.uid == '' || state.usuario === undefined) {
                return false
            } else {
                return true
            }
        }
    },
    modules: {}
})
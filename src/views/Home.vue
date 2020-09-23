<template>
  <div>
    <h1>Lista de tareas</h1>
    <div class="container d-flex justify-content-between my-4">
      <router-link :to="{name: 'agregar'}">
        <button class="btn btn-success">Agregar</button>
      </router-link>

      <button @click="cerrarSesion" type=" button" class="btn btn-danger">Cerrar Sesión</button>
    </div>
    <div class="container">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-md-8">
            <ul class="list-group">
              <li v-for="item of tareas" :key="item.id" class="list-group-item">
                {{item.id}} - {{item.nombre}}
                <div class="float-right">
                  <router-link :to="{name: 'editar',params:{id:item.id}}">
                    <button class="btn btn-warning mx-1">Editar</button>
                  </router-link>
                  <button @click="eliminarTarea(item.id)" class="btn btn-danger mx-1">Eliminar</button>
                </div>
              </li>
              <li v-if="tareas.length === 0" class="list-group-item">Sin tareas actuales</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["usuario", "tareas"]),
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea", "cerrarSesion"]),
  },
  created() {
    this.getTareas();
  },
};
</script>
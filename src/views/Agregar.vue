<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-8">
          <h1>Agregar</h1>
          <form @submit.prevent="agregarTarea(nombre)" class="mx-2">
            <input type="text" v-model="nombre" class="form-control" />
            <button class="btn btn-success my-2">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Agregar",
  data() {
    return {
      nombre: "",
    };
  },
  methods: {
    ...mapActions(["agregarTarea"]),
  },
};
</script>
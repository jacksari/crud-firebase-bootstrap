<template>
  <div>
    <h1>Registro</h1>
    <div class="container">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-md-6">
          <form @submit.prevent="crearUsuario({email:email,pass:pass1})">
            <input type="email" v-model="email" class="form-control my-2" placeholder="Email" />
            <input
              type="password"
              v-model="pass1"
              class="form-control my-2"
              placeholder="Contraseña"
            />
            <input
              type="password"
              v-model="pass2"
              class="form-control my-2"
              placeholder="Repetir contraseña"
            />
            <button type="submit" :disabled="!desactivar" class="btn btn-success">Crear Usuario</button>
          </form>
          <p class="alert alert-danger">{{error}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  methods: {
    ...mapActions(["crearUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return this.pass1 === this.pass2 && this.pass1 != "";
    },
  },
};
</script>
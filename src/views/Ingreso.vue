<template>
  <div>
    <h1>Login</h1>
    <div class="container">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-md-6">
          <form @submit.prevent="ingresoUsuario({email,password})">
            <input type="email" v-model="email" class="form-control my-2" placeholder="Email" />
            <input
              type="password"
              v-model="password"
              class="form-control my-2"
              placeholder="Contraseña"
            />
            <button class="btn btn-success my-2">Acceder</button>
          </form>
          <p class="alert alert-danger">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Ingreso",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
  },
};
</script>
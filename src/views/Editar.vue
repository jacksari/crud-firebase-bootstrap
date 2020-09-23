<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-8">
          <h1>Editar: {{id}}</h1>
          <form @submit.prevent="editarTarea(tarea)" class="my-4">
            <input type="text" v-model="tarea.nombre" class="form-control" />
            <button type="submit" class="btn btn-success my-4">editar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Editar",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["getTarea", "editarTarea"]),
  },
  created() {
    this.getTarea(this.id);
  },
  computed: {
    ...mapState(["tarea"]),
  },
};
</script>
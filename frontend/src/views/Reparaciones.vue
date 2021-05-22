<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-col cols="10">
      <v-card>
        <v-card-title>
          Reparaciones
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchReparacion"
            append-icon="mdi-magnify"
            label="Introduce el modelo del Vehiculo..."
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          dense
          :headers="cabeceraReparacion"
          :items="listaReparacion"
          :search="searchReparacion"
          item-key="name"
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
import dayjs from "dayjs";
import Menu from "@/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    searchReparacion: "",
    cabeceraReparacion: [
      { text: "Identificador Reparacion", value: "id" },
      { text: "Identificador Vehiculo", value: "idVehiculo" },
      { text: "Fecha incicio", value: "createdAt" },
      { text: "Fecha fin", value: "fechaFin" },
      { text: "Descripción", value: "descripcion" },
      { text: "Estado", value: "estado" },
    ],
    listaReparacion: [],
  }),
  mounted: function () {
    this.obtenerReparaciones();
  },
  computed: {
    ...mapState(["emailUsuario"]),
  },

  methods: {
    obtenerReparaciones() {
      const userdata = {
        email: this.emailUsuario,
      };
      axios
        .post("http://localhost:3000/reparaciones/listado", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              response.data[i].createdAt = dayjs(
                response.data[i].createdAt
              ).format("D MMMM, YYYY");
              this.listaReparacion.push(response.data[i]);
              if (response.data[i].estado == "FINALIZADA")
                this.listaReparacion[i].fechaFin = dayjs(
                  response.data[i].updatedAt
                ).format("D MMMM, YYYY");
            }
          }
        });
    },
  },
};
</script>
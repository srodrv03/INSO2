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
            v-model="searchVehiculo"
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
          :search="searchVehiculo"
          item-key="name"
          class="elevation-1"
        >

        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const axios= require("axios");
import { mapState } from "vuex";
import Menu from "@/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cabeceraReparacion: [
      { text: "Identificador Reparacion", value: "id" },
      { text: "Identificador Vehiculo", value: "idVehiculo" },
      { text: "Fecha incicio", value: "fechaInicio" },
      { text: "Fecha fin", value: "fechaFin" },
      { text: "Descripción", value: "descripcion" },
      { text: "Estado", value: "estado" },
    ],
    listaReparacion:[],
  }),
  mounted: function (){
    this.obtenerReparaciones()
  },
  computed: {
    ...mapState(["emailUsuario"]),
  },
  
  methods: {
    obtenerReparaciones(){
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
              this.listaReparacion.push(response.data[i]);
            }
            console.log("Hola")
          }
        });
    },
    
  },
};
</script>
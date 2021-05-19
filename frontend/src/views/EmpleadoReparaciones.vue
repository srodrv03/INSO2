<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
  <v-row class="text-center" justify="center">
    <v-col cols="10">
      <v-card>
        <v-card-title>
          Listado total de reparaciones
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchReparacion"
            append-icon="mdi-magnify"
            label="Introduce el identificador de la reparacion..."
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
    <v-col class="mb-4" cols="10">
      <v-card>
        <v-card-title>
          Listado de reparaciones pendientes
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchReparacionPendiente"
            append-icon="mdi-magnify"
            label="Introduce el identificador de la reparacion..."
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          dense
          :headers="cabeceraReparacion"
          :items="listaReparacionPendiente"
          :search="searchReparacionPendiente"
          item-key="name"
          class="elevation-1"
        >
         <template v-slot:item.comenzar="{ item }">
              <v-btn
                @click="creaDialogComenzar(item)"
                color="red"
                style="width: 210px; height: 22px"
                small
                v-model="item.borrarButton"
                >Comenzar reparacion</v-btn
              >
            </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card-text class="title">{{msgDialog}}</v-card-text>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green" text @click="confirmarReparacion(elemento)"
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
import dayjs from "dayjs";
import Menu from "@/components/MenuEmpleado.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    dialog: false,
    elemento:"",
    searchReparacion: "",
    msgDialog:"",
    searchReparacionPendiente: "",
    cabeceraReparacion: [
      { text: "Identificador Reparacion", value: "id" },
      { text: "Identificador Vehiculo", value: "idVehiculo" },
      { text: "Fecha incicio", value: "createdAt" },
      { text: "Fecha fin", value: "fechaFin" },
      { text: "Descripción", value: "descripcion" },
      { text: "Estado", value: "estado" },
      { text: "", value: "comenzar" },
    ],
    listaReparacion: [],
    listaReparacionPendiente:[]
  }),
  mounted: function () {
    this.obtenerReparaciones();
  },
  computed: {
    ...mapState(["emailUsuario","id"]),
  },

  methods: {
    obtenerReparaciones() {
      const userdata = {
        email: this.emailUsuario,
      };
      axios
        .post("http://localhost:3000/reparaciones/listadototal", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              response.data[i].createdAt = dayjs(
                response.data[i].createdAt
              ).format("D MMMM, YYYY");
              if(response.data[i].estado=="PENDIENTE"){
                this.listaReparacionPendiente.push(response.data[i]);
              }
              this.listaReparacion.push(response.data[i]);
            }
          }
        });
    },
    creaDialogComenzar(item){
      this.msgDialog="¿Esta seguro que desea aceptar la reparacion id:"+item.id+"?"
      this.elemento=item
      this.dialog=true
    },
    confirmarReparacion(elemento){
      const userdata={
        idReparacion:elemento.id,
        idEmpleado:this.id
      }
      axios.post("http://localhost:3000/reparaciones/iniciareparacion", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            this.listaReparacion=[]
            this.listaReparacionPendiente=[]
            this.obtenerReparaciones()
            this.dialog=false
          }
        });
     
    }
  },
};
</script>
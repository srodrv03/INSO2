<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-row class="text-center" justify="center">
      <v-col cols="10">
        <v-card color="basil" width="100%">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">
              Reparaciones Activas
            </h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card
                class="mr-5 ml-5 mt-5"
                color="basil"
                max-width="max"
                outlined
                elevation="24"
              >
                <v-card-title class="justify-center">
                  <span class="headline font-weight-black"
                    >Añadir piezas necesarias</span
                  >
                </v-card-title>
                <v-card-text class="justify-center mt-5">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        v-model="item.tab"
                        disabled
                        color="black"
                        label="Id de la reparacion"
                        >{{ item.tab }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.content"
                        disabled
                        label="Id del vehiculo"
                        >{{ item.content }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        disabled
                        label="DNI"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        :items="proveedores"
                        item-text='nombre'
                        item-value='nombre'
                        label="Proveedores"
                        outlined
                        @input="cambiaEtiqueta"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        v-model="seleccionado"
                        color="black"
                        label="Telefono"
                      >{{seleccionado}}</v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        label="IBAN"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        label="Localidad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" sm="3" md="3" lg="3">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        label="Código postal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" sm="3" md="3" lg="3">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        label="País"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>


<script>
const axios = require("axios");
import { mapState } from "vuex";
import Menu from "@/components/MenuEmpleado.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    tab: "",
    items: [],
    seleccionado:"",
    reparaciones: [],
    proveedores:[],
    idVehiculo: "",
    text: "ejemplo",
  }),
  mounted: function () {
    this.obtenerListado();
    this.obtenerProveedores()
  },
  computed: {
    ...mapState(["emailUsuario", "id"]),
  },

  methods: {
    obtenerListado() {
      axios
        .get("http://localhost:3000/reparaciones/listadototal")
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              /*response.data[i].createdAt = dayjs(
                response.data[i].createdAt
              ).format("D MMMM, YYYY");*/
              if (
                response.data[i].estado == "REPARANDO" &&
                response.data[i].idEmpleado == this.id
              ) {
                this.reparaciones.push(response.data[i]);
                this.items.push({
                  tab: "Reparacion " + response.data[i].id,
                  content: response.data[i].idVehiculo,
                });
              }
            }
          }
        });
    },
    obtenerProveedores(){
        axios
        .get("http://localhost:3000/proveedores/listado")
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              this.proveedores.push({id:response.data[i].id,nombre:response.data[i].nombre})
            }
            console.log(this.proveedores)
          }
        });

    },
    cambiaEtiqueta(event){
        this.seleccionado=event
    }
  },
};
</script>
<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>

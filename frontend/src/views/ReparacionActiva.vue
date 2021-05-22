<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-row class="text-center" justify="center">
      <v-col cols="10">
        <v-card color="basil" width="100%" height="100%" fluid>
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
            <v-tab
              v-for="item in items"
              :key="item.tab"
              @click="actualizadatos(item.tab)"
            >
              Reparacion {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card
                class="mr-5 ml-5 mt-5"
                color="white"
                max-width="max"
                outlined
              >
                <v-card-title class="justify-center">
                  <span class="headline font-weight-black"
                    >Añadir piezas necesarias</span
                  >
                </v-card-title>
                <v-card-text class="justify-center mt-5">
                  <v-row>
                    <v-col cols="3">
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
                    <v-col cols="3">
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
                    <v-col cols="6">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.descrip"
                        disabled
                        label="Descripcion"
                        >{{ item.descrip }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        :items="proveedores"
                        item-text="nombre"
                        item-value="nombre"
                        label="Proveedores"
                        outlined
                        @input="cambiaEtiqueta"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="e7"
                        :items="piezas"
                        item-text="nombre"
                        label="Piezas"
                        multiple
                        chips
                        outlined
                        hint="Seleccione las piezas para añadir a la reparacion"
                        persistent-hint
                      ></v-select>
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        class="ma-4"
                        outlined
                        color="indigo"
                        @click="addPiezas(e7)"
                      >
                        Añadir piezas</v-btn
                      >
                    </v-col>
                    <v-row class="text-center" justify="center">
                      <v-col cols="7" justify="center">
                        <v-simple-table class="basil">
                          <template v-slot:default>
                            <thead>
                              <tr class="basil1">
                                <th class="text-left font-weight-black basil1">
                                  Nombre
                                </th>
                                <th class="text-left font-weight-black basil1">
                                  Precio(€)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in piezasrep" :key="item.nombre">
                                <td>{{ item.nombre }}</td>
                                <td>{{ item.precio }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                      <v-col cols="2" justify="center">
                        <v-btn
                          class="ma-2 ml-10"
                          color="basil1"
                          @click="finalizaRep()"
                        >
                          Finalizar reparacion</v-btn
                        >
                      </v-col>
                    </v-row>
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
    e7: "",
    items: [],
    selecionado: "",
    reparaciones: [],
    piezas: [],
    piezasrep: [],
    proveedores: [],
    idVehiculo: "",
    text: "ejemplo",
  }),
  mounted: function () {
    this.obtenerListado();
    this.obtenerProveedores();
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
                  tab: response.data[i].id,
                  content: response.data[i].idVehiculo,
                  descrip: response.data[i].descripcion,
                });
              }
            }
            this.obtenerListadoPiezas(this.items[0].tab);
          }
        });
    },
    obtenerProveedores() {
      axios
        .get("http://localhost:3000/proveedores/listado")
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              this.proveedores.push({
                id: response.data[i].id,
                nombre: response.data[i].nombre,
              });
            }
          }
        });
    },
    cambiaEtiqueta(event) {
      const userdata = {
        nombreProveedor: event,
      };
      axios
        .post("http://localhost:3000/proveedores/listadopiezas", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              //this.piezas.push(response.data[i]);
              this.piezas.push({ nombre: response.data[i].nombre });
            }
            console.log(this.piezas);
          }
        });
    },
    addPiezas(lista) {
      const userdata = {
        idReparacion: this.items[this.tab].tab,
        listaPiezas: lista,
      };
      axios
        .post("http://localhost:3000/proveedores/addpiezas", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              //this.piezas.push(response.data[i]);
              this.piezas.push({ nombre: response.data[i].nombre });
            }
            this.obtenerListadoPiezas(userdata.idReparacion);
          }
        });
    },
    obtenerListadoPiezas(idreparacion) {
      const userdata = {
        idRep: idreparacion,
      };
      axios
        .post("http://localhost:3000/reparaciones/listadopiezas", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            this.piezasrep = [];
            for (var i of Object.keys(response.data)) {
              this.piezasrep.push({
                nombre: response.data[i].nombre,
                precio: response.data[i].precio,
              });
            }
          }
        });
    },
    actualizadatos(itemReparacion) {
      this.obtenerListadoPiezas(itemReparacion);
    },
    finalizaRep() {
      var msgTotal = this.piezasrep.reduce(function (prev, cur) {
        return prev + parseFloat(cur.precio);
      }, 0);
      const userdata = {
        idReparacion: this.items[this.tab].tab,
        importe: parseFloat(msgTotal),
      };
      axios
        .post("http://localhost:3000/reparaciones/finalizaReparacion", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            this.obtenerListado();
          }
        });
    },
  },
};
</script>
<style>
/* Helper classes */
.basil {
  background-color: #e0fdf8b7 !important;
}
.basil1 {
  background-color: #3d3d3d !important;
  color: #ffffff !important;
}
.basil--text {
  color: #000000 !important;
}
</style>

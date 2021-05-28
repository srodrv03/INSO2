<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-row class="text-center" justify="center">
      <v-col cols="10">
        <v-card color="basil" width="100%" height="100%" fluid>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Facturas</h1>
          </v-card-title>

          <v-tabs
            v-model="fac"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="item in items" :key="item.fac">
              Reparacion {{ item.fac }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="fac">
            <v-tab-item v-for="item in items" :key="item.fac">
              <v-card
                class="mr-5 ml-5 mt-5"
                color="white"
                max-width="max"
                outlined
              >
                <v-card-text class="justify-center mt-5">
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        v-model="item.fac"
                        disabled
                        color="black"
                        label="Id Factura"
                        >{{ item.fac }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.vehi"
                        disabled
                        label="Id del vehiculo"
                        >{{ item.vehi }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.emp"
                        disabled
                        label="Id del Empleado"
                        >{{ item.emp }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="6">
                      <p class="mt-2">Coste de mano de Obra (€) :</p>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.mano"
                        disabled
                        >{{ item.mano }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="6">
                      <p class="mt-2">Coste de Materiales (€) :</p>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.mat"
                        disabled
                        >{{ item.mat }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="6">
                      <p class="mt-2">Impuestos: I.V.A. 21% (€) :</p>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        class="font-weight-black"
                        outlined
                        color="black"
                        v-model="item.mat"
                        disabled
                        >{{ item.imp }}</v-text-field
                      >
                    </v-col>
                    <v-col cols="6">
                      <p class="mt-2 headline font-weight-black">TOTAL (€) :</p>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        class="font-weight-black headline"
                        outlined
                        color="black"
                        v-model="item.total"
                        disabled
                        >{{ item.total }}</v-text-field
                      >
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
import Menu from "@/components/Menu.vue";
import { mapState } from "vuex";

export default {
  components: {
    Menu,
  },
  data: () => ({
    fac: "",
    items: [],
  }),
  computed: {
    ...mapState(["emailUsuario", "id"]),
  },
  mounted: function () {
    this.obtenerListado();
  },
  methods: {
    obtenerListado() {
      const userdata = {
        idCliente: this.id,
      };
      axios
        .post("http://localhost:3000/reparaciones/listadoFacturas", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data["fac"])) {
              for (var j of Object.keys(response.data["rep"])) {
                if (response.data.rep[j].idFactura == response.data.fac[i].id) {
                  this.items.push({
                    fac: response.data.fac[i].id,
                    mano: response.data.fac[i].manoObra,
                    imp: response.data.fac[i].impuestos,
                    total: response.data.fac[i].total,
                    mat: response.data.fac[i].materiales,
                    vehi: response.data.rep[j].idVehiculo,
                    emp: response.data.rep[j].idEmpleado,
                  });
                }
              }
            }
          }
        });
    },
  },
};
</script>
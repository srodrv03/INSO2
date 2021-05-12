<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-col cols="10">
      <v-alert v-model="visible" dismissible elevation="24" type="success">
        Los cambios se han guardado correctamente.
      </v-alert>
      <v-card
        class="mr-5 ml-5 mt-5"
        color="white"
        max-width="max"
        outlined
        elevation="24"
      >
        <v-card-title class="justify-center">
          <span class="headline font-weight-black">EDITAR CUENTA</span>
        </v-card-title>
        <v-card-text class="justify-center mt-5">
          <v-row>
            <v-col cols="4">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="nombre"
                label="Nombre"
                >{{ nombre }}</v-text-field
              >
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="apellidos"
                label="Apellidos"
                >{{ apellidos }}</v-text-field
              >
            </v-col>
            <v-col cols="2">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                disabled
                v-model="DNI"
                label="DNI"
                >{{ DNI }}</v-text-field
              >
            </v-col>
            <v-col cols="3">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="email"
                disabled
                label="Email"
                >{{ this.email }}</v-text-field
              >
            </v-col>
            <v-col cols="3">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="telefono"
                label="Telefono"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="IBAN"
                label="IBAN"
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="direccion"
                label="Dirección"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="localidad"
                label="Localidad"
              ></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="CP"
                label="Código postal"
              ></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field
                class="font-weight-black"
                outlined
                color="black"
                v-model="pais"
                label="País"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn outlined text class="success" height="50" width="170" elevation="10" @click="confirmaCambios()">
            Aceptar
          </v-btn>
          <v-btn outlined text class="red ml-15" height="50" width="170" elevation="10" @click="obtieneInformacion()">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
import Menu from "@/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    nombre: "",
    apellidos: "",
    email: "",
    DNI: "",
    telefono: "",
    IBAN: "",
    direccion: "",
    localidad: "",
    CP: "",
    pais: "",
    visible:false,
  }),
  mounted: function () {
    this.obtieneInformacion();
  },
  methods: {
    obtieneInformacion() {
      const userdata = {
        email: this.emailUsuario,
      };
      axios
        .post("http://localhost:3000/clientes/informacion", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            this.nombre = response.data.nombre;
            this.apellidos = response.data.apellidos;
            this.DNI = response.data.DNI;
            this.email = response.data.email;
            this.telefono = response.data.telefono;
            this.IBAN = response.data.IBAN;
            this.direccion = response.data.direccion;
            this.localidad = response.data.localidad;
            this.CP = response.data.cp;
            this.pais = response.data.pais;
          }
        });
    },
    confirmaCambios() {
      const userdata = {
        nombre: this.nombre,
        email: this.emailUsuario,
        apellidos: this.apellidos,
        telefono: this.telefono,
        IBAN: this.IBAN,
        direccion: this.direccion,
        localidad: this.localidad,
        cp: this.CP,
        pais: this.pais,
      };
      axios
        .post("http://localhost:3000/clientes/edita", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            this.visible=true
            this.obtieneInformacion();
            
          }
        });
    },
  },
  computed: {
    ...mapState(["emailUsuario"]),
  },
};
</script>
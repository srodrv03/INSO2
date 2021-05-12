<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-col cols="10">
      <v-alert
          v-if="visibleAlerta"
          justify-center
          dismissible
          :type=tipo_alerta
          height="40"
          dense
          >{{msgAlerta}}</v-alert
        >
      <v-card class="mb-10" v-if="dialogAdd">
        <v-card-title class="text-h3 justify-center">
          Añadir Vehiculo
        </v-card-title>
        
        <v-card-text>
          <v-form ref="registerForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="marca"
                  label="Marca"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="modelo"
                  label="Modelo"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="anio"
                  label="Año de matriculación"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="matricula"
                  label="Matricula"
                  required
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="6" sm="6" xsm="6">
                <v-btn
                  x-large
                  block
                  :disabled="!valid"
                  color="success"
                  @click="confirmar()"
                  >Guardar Cambios</v-btn
                >
              </v-col>
              <v-col cols="6" sm="6" xsm="6">
                <v-btn x-large outlined color="red" @click="dialogAdd = false"
                  >Cancelar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          Vehiculos
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchVehiculo"
            append-icon="mdi-magnify"
            label="Introduce el modelo del Vehiculo..."
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="green" light @click="dialogAdd = true">
            Añadir Vehiculo</v-btn
          >
        </v-card-title>
        <v-data-table
          dense
          :headers="cabeceraVehiculos"
          :items="listaVehiculos"
          :search="searchVehiculo"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:item.borrarButton="{ item }">
            <v-btn
              @click="creaDialogDelete(item)"
              color="red"
              small
              style="width: 80px; height: 22px"
              v-model="item.borrarButton"
              >Eliminar</v-btn
            >
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card-text class="title"
                >"Esta seguro que desea eleminar el vehiculo con
                matricula"</v-card-text
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" text @click="confirmarEliminacion(elemento)"
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
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu,
  },
  data: () => ({
    valid:false,
    dialog: false,
    dialogAdd: false,
    visibleAlerta: false,
    msgAlerta:"",
    tipo_alerta:"",
    marca: "",
    modelo: "",
    anio: "",
    matricula: "",
    searchVehiculo: "",
    elemento: "",
    cabeceraVehiculos: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Marca", value: "marca" },
      { text: "Modelo", value: "modelo" },
      { text: "Matricula", value: "matricula" },
      { text: "Año de matriculacion", value: "anio" },
      { text: "", value: "borrarButton" },
    ],
    listaVehiculos: [],
  }),
  computed: {
    ...mapState(["emailUsuario"]),
  },
  mounted: function () {
    this.obtenerVehiculos();
  },
  methods: {
    obtenerVehiculos() {
      const userdata = {
        email: this.emailUsuario,
      };
      axios
        .post("http://localhost:3000/vehiculos/listadoUsuario", userdata)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data)) {
              this.listaVehiculos.push(response.data[i]);
            }
          }
        });
    },
    confirmarEliminacion(elemento) {
      const vehiculoData = {
        matricula: elemento.matricula,
      };
      axios
        .post("http://localhost:3000/vehiculos/delete", vehiculoData)
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            this.alerta_msg = response.data.error;
            this.tipo_alerta = "error";
            this.alerta = true;
          } else {
            this.alerta_msg = response.data.correcto;
            this.tipo_alerta = "success";
            this.alerta = true;
          }
          this.listaVehiculos = [];
          this.obtenerVehiculos();
        });
    },
    creaDialogDelete(item) {
      this.textoDialog =
        "¿Esta seguro que desea eliminar al El vehiculo " +
        item.marca +
        " " +
        item.modelo +
        " " +
        item.matricula +
        "? \n Esto eliminara tambien todas sus reparaciones";
      this.elemento = item;
      this.dialog = true;
    },
  confirmar() { 
    if (this.$refs.registerForm.validate()) {
        const userData = {
          marca: this.marca,
          modelo: this.modelo,
          anio: this.anio,
          matricula: this.matricula,
          id_cliente: this.listaVehiculos[0].clienteId,
        };
        axios.post("http://localhost:3000/vehiculos/add", userData).then(
          (response) => {
            if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
              this.msgAlerta=response.data.error;
              this.tipo_alerta="error"
              this.visibleAlerta = true;
            } else {
              ///modificar el push al home
              this.tipo_alerta = "success";
              this.msgAlerta="Vehiculo añadido correctamente."
              this.visibleAlerta=true
              this.listaVehiculos=[]
              this.obtenerVehiculos()
              this.dialogAdd=false
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  }
};
</script>
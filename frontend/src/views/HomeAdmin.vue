<template>
  <v-main>
    <v-row justify="center">
      <v-alert dismissible :type="tipo_alerta" v-if="alerta">
        <v-row>
          <v-col>
            <span class="font-weight-black">{{ this.alerta_msg }}</span>
          </v-col>
        </v-row>
      </v-alert>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4" cols="10">
        <v-card>
          <v-card-title>
            Empleados
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchEmpleados"
              append-icon="mdi-magnify"
              label="Introduce el nombre del empleado..."
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <router-link to="/AddEmpleado" tag="button"
              ><v-btn color="green" light>Añadir Empleado</v-btn></router-link
            >
          </v-card-title>
          <v-data-table
            dense
            :headers="cabeceraEmpleados"
            :items="listaEmpleados"
            :search="searchEmpleados"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.borrarButton="{ item }">
              <v-btn
                @click="creaDialogDelete(item, 0)"
                color="red"
                style="width: 80px; height: 22px"
                small
                v-model="item.borrarButton"
                >Eliminar</v-btn
              >
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4" cols="10">
        <v-card>
          <v-card-title>
            Clientes
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchCliente"
              append-icon="mdi-magnify"
              label="Introduce el nombre del cliente..."
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <router-link to="/AddCliente" tag="button"
              ><v-btn color="green" light>Añadir Cliente</v-btn></router-link
            >
          </v-card-title>
          <v-data-table
            dense
            :headers="cabeceraClientes"
            :items="listaClientes"
            :search="searchCliente"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.borrarButton="{ item }">
              <v-btn
                @click="creaDialogDelete(item, 1)"
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
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4" cols="10">
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
            <router-link to="/AddVehiculo" tag="button"
              ><v-btn color="green" light>Añadir Vehiculo</v-btn></router-link
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
                @click="creaDialogDelete(item, 2)"
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
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card-text class="title">{{ textoDialog }}</v-card-text>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn
              color="green"
              text
              @click="confirmarEliminacion(tipo, elemento)"
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-main>
</template>
<script>
const axios = require("axios");
export default {
  data: () => ({
    dialog: false,
    elemento: "",
    tipo_alerta: "",
    alerta: false,
    alerta_msg: "",
    tipo: "",
    prueba: "",
    tab_activa: "",
    textoDialog: "",
    searchEmpleados: "",
    listaEmpleados: [],
    searchCliente: "",
    listaClientes: [],
    searchVehiculo: "",
    listaVehiculos: [],
    cabeceraEmpleados: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Apellidos", value: "apellidos" },
      { text: "DNI", value: "DNI" },
      { text: "Email", value: "email" },
      { text: "", value: "borrarButton" },
    ],
    cabeceraClientes: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Primer Apellido", value: "apellido1" },
      { text: "Segundo Apellido", value: "apellido2" },
      { text: "DNI", value: "DNI" },
      { text: "Email", value: "email" },
      { text: "", value: "borrarButton" },
    ],
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
      { text: "Propietario", value: "clienteId" },
      { text: "", value: "borrarButton" },
    ],
  }),
  mounted: function () {
    this.obtenerEmpleados(), this.obtenerClientes(), this.obtenerVehiculos();
  },
  methods: {
    creaDialogDelete(item, numtabla) {
      //esta seleccionada empleado
      if (numtabla == "0") {
        this.textoDialog =
          "¿Esta seguro que desea eliminar al Empleado " +
          item.nombre +
          " " +
          item.apellido1 +
          " " +
          item.apellido2 +
          "?";
        this.tipo = 0;
        this.elemento = item;
        this.dialog = true;
      } else if (numtabla == "1") {
        this.textoDialog =
          "¿Esta seguro que desea eliminar al Cliente " +
          item.nombre +
          " " +
          item.apellido1 +
          " " +
          item.apellido2 +
          "? \n Esto eliminara tambien todos sus vehiculos";
        this.elemento = item;
        this.dialog = true;
        this.tipo = 1;
      } else if (numtabla == "2") {
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
        this.tipo = 2;
      }
    },
    obtenerEmpleados() {
      axios.get("http://localhost:3000/empleados/listado").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response.data);
        } else {
          for (var i of Object.keys(response.data)) {
            this.listaEmpleados.push(response.data[i]);
          }
        }
      });
    },
    obtenerClientes() {
      axios.get("http://localhost:3000/clientes/listado").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response.data);
        } else {
          for (var i of Object.keys(response.data)) {
            this.listaClientes.push(response.data[i]);
          }
        }
      });
    },
    obtenerVehiculos() {
      axios.get("http://localhost:3000/vehiculos/listado").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response.data);
        } else {
          for (var i of Object.keys(response.data)) {
            this.listaVehiculos.push(response.data[i]);
          }
        }
      });
    },
    confirmarEliminacion(tipo, elemento) {
      if (tipo == 0) {
        const userData = {
          email: elemento.email,
        };

        axios
          .post("http://localhost:3000/empleados/delete", userData)
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
            this.listaEmpleados = [];
            this.obtenerEmpleados();
          });
      } else if (tipo == 1) {
        const userData = {
          email: elemento.email,
        };

        axios
          .post("http://localhost:3000/clientes/delete", userData)
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
            this.listaClientes = [];
            this.obtenerClientes();
            this.listaVehiculos = [];
            this.obtenerVehiculos();
          });
      } else if (tipo == 2) {
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
      }
      this.dialog = false;
    },
  },
};
</script>
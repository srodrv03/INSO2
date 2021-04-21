<template>
  <v-main>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4" cols="10">
        <v-card>
          <v-data-table
            dense
            :headers="cabeceraEmpleados"
            :items="listaEmpleados"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.borrarButton="{ item }">
              <v-btn
                @click="creaDialogDelete(item, 0)"
                color="red"
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
          <v-data-table
            dense
            :headers="cabeceraClientes"
            :items="listaClientes"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.borrarButton="{ item }">
              <v-btn
                @click="creaDialogDelete(item, 1)"
                color="red"
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
          <v-data-table
            dense
            :headers="cabeceraVehiculos"
            :items="listaVehiculos"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.borrarButton="{ item }">
              <v-btn
                @click="creaDialogDelete(item, 2)"
                color="red"
                small
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
            <v-btn color="green" text @click="confirmarEliminacion(tipo)"
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    tipo: "",
    prueba: "",
    tab_activa: "",
    textoDialog: "",
    listaEmpleados: [
      {
        nombre: "prueba",
        apellido1: "apellido11",
        apellido2: "apellido22",
        DNI: "71717171717",
        email: "e@e.es",
      },
    ],
    listaClientes: [
      {
        nombre: "prueba",
        apellido1: "apellido11",
        apellido2: "apellido22",
        DNI: "71717171717",
        email: "e@e.es",
      },
    ],
    listaVehiculos: [
      {
        modelo: "prueba",
        marca: "apellido11",
        anio: "71717171717",
        id_cliente: "e@e.es",
      },
    ],
    cabeceraEmpleados: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "Id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Primer Apellido", value: "apellido1" },
      { text: "Segundo Apellido", value: "apellido2" },
      { text: "DNI", value: "DNI" },
      { text: "Email", value: "email" },
      { text: "", value: "borrarButton" },
    ],
    cabeceraClientes: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "Id",
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
        value: "Id",
      },
      { text: "Marca", value: "marca" },
      { text: "Modelo", value: "modelo" },
      { text: "Año de matriculacion", value: "anio" },
      { text: "Propietario", value: "id_cliente" },
      { text: "", value: "borrarButton" },
    ],
  }),
  methods: {
    creaDialogDelete(item, numtabla) {
      //esta seleccionada empleado
      console.log(numtabla);
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
        this.dialog = true;
        this.tipo = 2;
      }
    },
    obtenerEmpleados() {
      axios.get("http://localhost:3000/empleados/listado").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response.data);
        } else {
          for (var i of Object.keys(response.data.empleados)) {
            this.listaEmpleados.push(response.data.empleados[i]);
          }
        }
      });
    },
    obtenerClientes() {
      axios.get("http://localhost:3000/empleados/listado").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response.data);
        } else {
          for (var i of Object.keys(response.data.clientes)) {
            this.listaClientes.push(response.data.clientes[i]);
          }
        }
      });
    },
    obtenerVehiculos() {
      axios.get("http://localhost:3000/vehiculos/listado").then((response) => {
        if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
          console.log(response.data);
        } else {
          for (var i of Object.keys(response.data.vehiculos)) {
            this.listaVehiculos.push(response.data.vehiculos[i]);
          }
        }
      });
    },
    confirmarEliminacion(tipo) {
      if (tipo == 0) {
        axios.get("http://localhost:3000/empleados/delete").then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data.vehiculos)) {
              this.listaVehiculos.push(response.data.vehiculos[i]);
            }
          }
        });
      } else if (tipo == 1) {
        axios.get("http://localhost:3000/clientes/delete").then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data.vehiculos)) {
              this.listaVehiculos.push(response.data.vehiculos[i]);
            }
          }
        });
      } else if (tipo == 2) {
        axios.get("http://localhost:3000/vehiculos/delete").then((response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
            console.log(response.data);
          } else {
            for (var i of Object.keys(response.data.vehiculos)) {
              this.listaVehiculos.push(response.data.vehiculos[i]);
            }
          }
        });
      }
    },
  },
};
</script>
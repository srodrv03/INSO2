<template>
  <v-main>
    <v-row class="text-center"  justify=center>
      <v-col class="mb-4" cols=10 >
        <v-card>
          <v-tabs background-color="primary" center-active dark>
            <v-tab @click="obtenerEmpleados()">Empleados</v-tab>
            <v-tab @click="obtenerClientes()">Clientes</v-tab>
            <v-tab @click="obtenerVehiculos()">Vehiculos</v-tab>
          </v-tabs>
          <v-data-table
            dense
            :headers="headers"
            :items="desserts"
            item-key="name"
            class="elevation-1"
          >
          <template v-slot:item.venderbut="{ item }">
              <v-btn
                color="green lighten-1"
                @click="creaDialogVenta(item)"
                small
                v-model="item.venderbut"
              >Vender</v-btn>
            </template>
            <template v-slot:item.comprarbut="{ item }">
              <v-btn
                @click="creaDialogCompra(item)"
                color="red"
                small
                v-model="item.comprarbut"
              >Comprar</v-btn>
            </template></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    desserts: [
      {
        simbolo:"prueba",
        precio:"32"
      }
    ],
     headers: [
      {
        text: "Simbolo",
        align: "start",
        sortable: true,
        value: "simbolo"
      },
      { text: "Valor", value: "precio" },
      { text: "", value: "venderbut" },
      { text: "", value: "comprarbut" }
    ],
  }),
};
</script>
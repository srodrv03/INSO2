<template>
  <v-row class="mt-5">
    <v-col cols="1">
      <Menu />
    </v-col>
    <v-col cols="10">
      <v-card
        class="mr-5 ml-5 mt-5"
        color="white"
        max-width="max"
        outlined
        elevation="24"
      >
        <v-card-title class="justify-center">
          <span class="headline font-weight-black" >EDITAR CUENTA</span>
        </v-card-title>
        <v-card-text class="justify-center mt-5">
          <v-row>
            <v-col cols="4" >
              <v-text-field class="font-weight-black" outlined color="black" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="6" >
              <v-text-field class="font-weight-black" outlined color="black" label="Apellidos"></v-text-field>
            </v-col>
            <v-col cols="2" >
              <v-text-field class="font-weight-black" outlined color="black" label="DNI"></v-text-field>
            </v-col>
            <v-col cols="3" >
              <v-text-field class="font-weight-black" outlined color="black" label="Email"></v-text-field>
            </v-col>
            <v-col cols="3" >
              <v-text-field  class="font-weight-black" outlined color="black" label="Telefono"></v-text-field>
            </v-col>
            <v-col cols="6" >
              <v-text-field class="font-weight-black" outlined color="black" label="IBAN"></v-text-field>
            </v-col>
            <v-col cols="7" >
              <v-text-field class="font-weight-black" outlined color="black" label="Dirección"></v-text-field>
            </v-col>
            <v-col cols="5" >
              <v-text-field class="font-weight-black" outlined color="black" label="Localidad"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field class="font-weight-black" outlined color="black" label="Código postal"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field class="font-weight-black" outlined color="black" label="País"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn outlined text class="success"> Aceptar </v-btn>
          <v-btn outlined text class="red"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Marca", value: "marca" },
      { text: "Modelo", value: "modelo" },
      { text: "Motor", value: "motor" },
      { text: "Año", value: "anio" },
      { text: "Color", value: "color" },
      { text: "Puertas", value: "puertas" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      marca: "",
      modelo: "",
      motor: "",
      anio: "",
      color: "",
      puertas: "",
    },
    defaultItem: {
      marca: "",
      modelo: "",
      motor: "",
      anio: "",
      color: "",
      puertas: "",
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          marca: "Renault",
          modelo: "Twingo",
          motor: "OM654q",
          anio: "12/12/21",
          color: "Azul",
          puertas: 5,
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
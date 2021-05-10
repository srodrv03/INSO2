<template>
  <v-card class="mr-5 ml-5 mt-5" max-width="max" outlined>
    <v-card-title>
      <span class="headline">Editar cuenta</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-col>
          <v-container>
  <v-row>
            <v-col cols="3" sm="3" md="3">
              <v-text-field label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field label="Apellidos"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" sm="3" md="3">
              <v-text-field label="Email"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field label="Compañia"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" sm="3" md="3">
              <v-text-field label="Ciudad"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field label="País"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" sm="3" md="3">
              <v-text-field label="Dirección"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" lg="3">
              <v-text-field label="Código postal"></v-text-field>
            </v-col>
          </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="150"
            max-width="250"
            src="https://picsum.photos/id/11/500/300"
          ></v-img>
        </v-col>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn outlined text> Aceptar </v-btn>
      <v-btn outlined text> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
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
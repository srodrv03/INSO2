<template>
  <v-main>
    <v-row justify="center">
      <v-card class="mx-auto" max-width="80%">
        <v-card-title class="text-h3 text-center">
          Añadir Vehiculo
        </v-card-title>
        <v-alert
          :value="visibleAlerta"
          justify-center
          type="error"
          height="40"
          dense
          >{{ msgAlerta }}</v-alert
        >
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
              <v-col cols="12">
                <v-text-field
                  v-model="propietario"
                  label="Email del propietario del vehiculo"
                  required
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                <v-btn
                  x-large
                  block
                  :disabled="!valid"
                  color="success"
                  @click="confirmar()"
                  >Register</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-main>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      valid: true,
      visibleAlerta: false,
      marca: "",
      modelo: "",
      anio: "",
      matricula: "",
      propietario: "",
      msgAlerta: "",
      rules: {
        required: (value) => !!value || "Obligatorio.",
      },
    };
  },
  methods: {
    confirmar() {
      if (this.$refs.registerForm.validate()) {
        const userData = {
          marca: this.marca,
          modelo: this.modelo,
          anio: this.anio,
          matricula: this.matricula,
          email: this.propietario,
        };
        axios.post("http://localhost:3000/vehiculos/add", userData).then(
          (response) => {
            if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
              this.msgAlerta = response.data.error;
              this.visibleAlerta = true;
            } else {
              ///modificar el push al home
              this.$router.push("HomeAdministrador");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  mounted() {},
  computed: {},
};
</script>
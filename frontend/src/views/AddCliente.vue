<template>
  <v-main>
    <v-row justify="center">
      <v-card class="mx-auto" max-width="80%">
        <v-card-title class="text-h3 text-center">
          Añadir Cliente
        </v-card-title>
        <v-alert
          :value="visibleAlerta"
          justify-center
          type="error"
          height="40"
          dense
          >Ese Email ya ha sido registrado.</v-alert
        >
        <v-card-text>
          <v-form ref="registerForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="nombre"
                  label="Nombre"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="apellidos"
                  label="Apellidos"
                  maxlength="20"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="DNI" label="DNI" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  block
                  v-model="verify"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, passwordMatch]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirm Password"
                  counter
                  @click:append="show1 = !show1"
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
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      DNI: "",
      verify: "",

      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  methods: {
    confirmar() {
      if (this.$refs.registerForm.validate()) {
        const userData = {
          nombre: this.nombre,
          apellidos: this.apellidos,
          email: this.email,
          pass: this.password,
          DNI: this.DNI,
        };
        axios.post("http://localhost:3000/clientes/registro", userData).then(
          (response) => {
            if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
              console.log(response.data.error);
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
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
};
</script>
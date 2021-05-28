<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4" cols="12">
        <h1 class="display-2 white--text mb-3 mt-5 text-sub">Bienvenido</h1>
      </v-col>

      <v-col cols="12">
        <v-row justify="center" mb-5>
          <p class="font-weight-bold white--text font-italic">
            *Todos los campos son obligatorios.
          </p>
        </v-row>
        <v-row justify="center">
          <form>
            <v-row>
              <v-text-field
                name="nombre"
                v-model="nombre"
                :rules="textRules"
                label="Nombre"
                id="nombre"
                type="nombre"
                required
                dark
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                name="apellidos"
                v-model="apellidos"
                :rules="textRules"
                label="Apellidos"
                id="apellidos"
                type="apellidos"
                required
                dark
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                name="email-sin"
                label="Correo electrónico"
                id="email-sin"
                type="email"
                required
                dark
                prepend-icon="mdi-account-circle"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-text-field
                v-model="password"
                :rules="[
                  (v) => !!v || 'La contraseña es necesaria.',
                  (v) => v == this.password1 || 'Tiene que ser iguales',
                ]"
                name="password"
                label="Contraseña"
                id="password-sin"
                type="password"
                required
                dark
                prepend-icon="mdi-fingerprint"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-text-field
                v-model="password1"
                :rules="[
                  (v) => !!v || 'La contraseña es necesaria.',
                  (v) => v == this.password || 'Tiene que ser iguales',
                ]"
                name="password1"
                label="Repitir Contraseña"
                id="password-sin2"
                type="password"
                required
                dark
                prepend-icon="mdi-fingerprint"
              ></v-text-field>
            </v-row>
            <v-alert
              :value="visibleAlerta"
              justify-center
              type="error"
              height="40"
              dense
              >Ese Email ya ha sido registrado.</v-alert
            >

            <v-row>
              <v-col xs12 sm6>
                <v-btn @click="confirmaRegistro" color="white" light
                  >Confirmar</v-btn
                >
              </v-col>
              <v-col xs12 sm6>
                <router-link to="/Login" tag="button">
                  <v-btn type="submit" color="white" light
                    >¿Ya tienes cuenta? Inicia sesión</v-btn
                  >
                </router-link>
              </v-col>
            </v-row>
          </form>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  name: "Login",
  data: () => ({
    nombre: "",
    apellidos: "",
    email: "",
    visibleAlerta: false,
    password: "",
    password1: "",
    emailRules: [
      (v) => !!v || "El e-mail es necesario.",
      (v) => /.+@.+\..+/.test(v) || "Formato invalido.",
    ],
    textRules: [
      v => !!v || 'Este campo es necesario.',
    ]
  }),
  methods: {
    confirmaRegistro() {
      if (this.nombre != "" && this.apellidos != "") {
        const userData = {
          nombre: this.nombre,
          apellidos: this.apellidos,
          email: this.email,
          pass: this.password,
        };
        axios.post("http://localhost:3000/clientes/registro", userData).then(
          (response) => {
            if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
              console.log(response.data.error);
              this.visibleAlerta = true;
            } else {
              ///modificar el push al home
              this.$router.push("Login");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
};
</script>


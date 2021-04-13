<template>
  <v-main>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Bienvenido</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <v-alert dismissible type="error" v-if="alerta">
            <v-row>
              <v-col>
                <span class="font-weight-black">{{ this.alerta_msg }}</span>
              </v-col>
            </v-row>
          </v-alert>
        </v-row>
        <v-row justify="center" wrap>
          <v-form>
            <v-row xs12 sm6>
              <v-text-field
                v-model="email"
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
                name="password"
                label="Contraseña"
                id="password-sin"
                type="password"
                dark
                required
                prepend-icon="mdi-fingerprint"
                @keydown.native.enter="iniciar"
              ></v-text-field>
            </v-row>
            <v-row xs12 sm6>
              <v-select
                dark
                v-model="tipo_user"
                prepend-icon="mdi-fingerprint"
                :items="['Empleado', 'Cliente']"
                label="Tipo de usuario"
              ></v-select>
            </v-row>
            <v-row>
              <v-col xs12 sm6>
                <v-btn @click="iniciar" color="white" light
                  >Iniciar Sesión</v-btn
                >
              </v-col>
              <v-col xs12 sm6>
                <router-link to="/Registro" tag="button"
                  ><v-btn color="white" light
                    >¿No tienes cuenta? Regístrate</v-btn
                  ></router-link
                >
              </v-col>
            </v-row>
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
const axios = require("axios");
import { mapState, mapMutations } from "vuex";
export default {
  name: "Registro",
  data: () => ({
    password: "",
    tipo_user: "",
    email: "",
    alerta_msg: "",
    alerta: false,
  }),
  computed: {
    ...mapState(["logged", "emailUsuario", "tipoUsuario"]),
  },
  methods: {
    iniciar() {
      if (this.email != "" && this.password != "" && this.tipo_user != "") {
        const userData = {
          email: this.email,
          pass: this.password,
        };
        if (this.tipo_user == "Cliente") {
          axios.post("http://localhost:3000/clientes/login", userData).then(
            (response) => {
              if (
                Object.prototype.hasOwnProperty.call(response.data, "error")
              ) {
                this.password = "";
                this.email = "";

                this.alerta_msg = "La contraseña/email no son correctos.";
                this.alerta = true;
              } else {
                this.logearse();
                this.setEmail(this.email);
                this.setTipo(this.tipo_user);
                this.$router.push("/home");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          axios.post("http://localhost:3000/empleados/login", userData).then(
            (response) => {
              if (
                Object.prototype.hasOwnProperty.call(response.data, "error")
              ) {
                this.password = "";
                this.email = "";
                this.alerta_msg = "La contraseña/email no son correctos.";
                this.alerta = true;
              } else {
                this.logearse();
                this.setEmail(this.email);
                this.setTipo(this.tipo_user);
                this.$router.push("/home");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        this.alerta_msg = "Complete todos los campos";
        this.alerta = true;
      }
    },
    ...mapMutations(["logearse", "setEmail", "setTipo"]),
  },
};
</script>
<template>
  <v-app :style="color_fondo">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
        @click="deslog()"
      >
        <span class="mr-2">Deslog provisional</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main fluid>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapMutations } from "vuex";
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  computed: {
    color_fondo() {
      return "background: rgb(2,0,36);background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);";
    },
  },
  methods:{
    deslog(){
      this.deslogearse()
      this.$router.push('/')
    },
    ...mapMutations(["deslogearse"])
  }
  
};
</script>

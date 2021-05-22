<template>
  <v-app :style="color_fondo">
    <v-app-bar app color="#05C7F2" >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://e7.pngegg.com/pngimages/386/441/png-clipart-car-bmw-porsche-automobile-repair-shop-corey-s-german-auto-repair-car-logo-transport-thumbnail.png"
          transition="scale-transition"
          width="40"
        />

        <span class="text">LEÓNAUTO</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
        @click="deslog()"
      >
        <span class="mr-2">Cerrar</span>
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
      return "background: #05C7F2;background: linear-gradient(90deg, #05C7F2 0%, rgba(9,9,121,1) 50%, #05C7F2 100%);";
    },
  },
  methods:{
    deslog(){
      this.deslogearse()
      this.$router.push('/Login')
    },
    ...mapMutations(["deslogearse"])
  }
  
};
</script>
<style>
/* Helper classes */

.text {
  font-family: 'Signika', sans-serif; 
  font-size: 50px; 
  font-weight: 600; 
  line-height: 30px; 
  margin: 25px 0 24px; 
  text-align: center;
}
</style>

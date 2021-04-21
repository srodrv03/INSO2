<template>
  <v-app>
    <Navbar />
    <ListaReparaciones/>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import ListaReparaciones from "@/components/ListaReparaciones";
export default {
  name: "App",
  components: { Navbar, ListaReparaciones},
  data() {
    return {};
  },
};
</script>
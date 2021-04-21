<template>
  <v-app>
    <Navbar />
        <ListaVehiculos/>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import ListaVehiculos from "@/components/ListaVehiculos";
export default {
  name: "App",
  components: { Navbar, ListaVehiculos},
  data() {
    return {};
  },
};
</script>
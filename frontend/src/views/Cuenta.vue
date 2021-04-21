<template>
  <v-app>
    <Navbar />
    <EditarUsuario/>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import EditarUsuario from "@/components/EditarUsuario";
export default {
  name: "App",
  components: { Navbar, EditarUsuario},
  data() {
    return {};
  },
};
</script>
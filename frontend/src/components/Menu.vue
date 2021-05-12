<template>
<v-row>
    <v-navigation-drawer
      expand-on-hover
      v-model="drawer"
      app
      class="blue lighten-5"
      :mini-variant.sync="mini"
      permanent
    >
      <v-card class="mx-auto" width="5000">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            class="mt-6"
            @click="acciones(item)"
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <router-view />
</v-row>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: false,
      items: [
        {
          icon: "mdi-car",
          title: "Mis vehículos",
        },
        {
          icon: "mdi-tools",
          title: "Reparaciones",
        },
        { icon: "mdi-account", title: "Cuenta" },
      ],
    };
  },
  methods: {
    acciones(item) {
      if (item.title == "Mis vehículos") {
        this.$router.push("/HomeCliente/Vehiculos");
      } else if (item.title == "Reparaciones") {
        this.$router.push("/HomeCliente/Reparaciones");
      } else if (item.title == "Cuenta") {
        this.$router.push("/HomeCliente/cuenta");
      }
    },
  },
};
</script>
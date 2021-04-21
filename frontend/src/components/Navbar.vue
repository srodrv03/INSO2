<template>
    <v-navigation-drawer
      flat
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
    >
      <v-card class="mx-auto" width="5000" >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            router
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
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
          text: "Mis vehículos",
          route: "/HomeCliente/Vehiculos",
        },
        {
          icon: "mdi-tools",
          text: "Reparaciones",
          route: "/HomeCliente/Reparaciones",
        },
        { icon: "mdi-account", text: "Cuenta", route: "/HomeCliente/cuenta" },
        {
          icon: "mdi-account-group",
          text: "Equipo",
          route: "/HomeCliente/equipo",
        },
        {
          icon: "mdi-bell",
          text: "Notificaciones",
          route: "/HomeCliente/notificaciones",
        },
        { icon: "mdi-chat", text: "Chat", route: "/HomeCliente/chat" },
      ],
    };
  },
};
</script>
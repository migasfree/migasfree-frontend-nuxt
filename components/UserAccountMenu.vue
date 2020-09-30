<template>
  <div>
    <v-menu v-if="$auth.loggedIn" bottom offset-y class="ml-4">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              depressed
              icon
              color="brown darken-1 white--text"
              class="ml-40"
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >
              <v-icon color="white">mdi-account</v-icon>
            </v-btn>
          </template>
          <span>Cuenta de usuario</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-subheader>Usuario: {{ $auth.user.username }}</v-subheader>

        <v-list-item link to="#">
          <v-list-item-icon>
            <v-icon>mdi-account-key</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cambiar contraseña</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="$auth.logout()">
          <v-list-item-icon>
            <v-icon>mdi-power-standby</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Terminar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-else to="/login" icon class="ml-4">
      <v-icon color="white">mdi-account-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <AppMenu />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="brown darken-1 white--text"
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />

      <!-- v-btn icon color="white" @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn -->

      <!-- v-btn icon color="white" @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn -->

      <!-- v-btn icon color="white" @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn -->

      <v-toolbar-title v-text="title" />

      <v-spacer />

      <AlertMenu v-if="$auth.loggedIn" />

      <UserAccountMenu />

      <!-- v-btn icon @click.stop="rightDrawer = !rightDrawer" color="white">
        <v-icon>mdi-menu</v-icon>
      </v-btn -->
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <AppFooter :fixed="!fixed" />

    <Snackbar />
  </v-app>
</template>

<script>
import AppMenu from '@/components/ui/AppMenu'
import AlertMenu from '@/components/ui/AlertMenu'
import AppFooter from '@/components/ui/AppFooter'
import UserAccountMenu from '@/components/UserAccountMenu'
import Snackbar from '@/components/ui/Snackbar'

export default {
  components: {
    AppMenu,
    AlertMenu,
    AppFooter,
    UserAccountMenu,
    Snackbar,
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'migasfree',
    }
  },
}
</script>

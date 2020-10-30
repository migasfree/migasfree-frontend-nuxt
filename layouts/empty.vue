<template>
  <v-app>
    <nuxt />

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '@/components/ui/Snackbar'

export default {
  components: {
    Snackbar,
  },
}
</script>

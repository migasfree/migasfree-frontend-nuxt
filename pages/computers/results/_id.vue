<template>
  <v-container>
    <v-breadcrumbs large :items="breadcrumbs"></v-breadcrumbs>

    {{ item }}
  </v-container>
</template>

<script>
export default {
  async fetch() {
    await this.$axios
      .$get(`/api/v1/token/computers/${this.$route.params.id}/`)
      .then((response) => {
        console.log(response)
        this.item = response
        this.breadcrumbs[4].text = response.name
      })
      .catch((error) => {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'error',
          text: error.response.data,
        })
      })
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Datos',
          disabled: true,
        },
        {
          text: 'Ordenadores',
          disabled: false,
          href: '/computers',
        },
        {
          text: 'Resultados',
          disabled: true,
        },
        {
          text: 'Id',
          disabled: true,
        },
      ],
      item: {},
    }
  },
}
</script>

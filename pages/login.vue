<template>
  <v-app id="login">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <UserAuthForm :submit-form="loginUser" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  layout: 'empty',
  components: {
    UserAuthForm,
  },
  methods: {
    async loginUser(info) {
      this.loading = true
      await this.$auth
        .loginWith('local', {
          data: info,
        })
        .catch((error) => {
          this.$store.dispatch('snackbar/setSnackbar', {
            color: 'error',
            text: error.response.data.non_field_errors[0],
          })
        })
    },
  },
}
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  background-color: #6d4c41;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>

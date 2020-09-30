<template>
  <v-card class="elevation-1 pa-3">
    <v-card-text>
      <div class="layout column align-center">
        <img
          src="../static/migasfree-logo.svg"
          alt="migasfree logo"
          width="120"
          height="120"
        />
        <h1 class="flex my-4">Log in @ migasfree</h1>
      </div>
      <v-form v-model="valid">
        <v-text-field
          v-model="model.username"
          autofocus
          prepend-icon="mdi-account"
          name="user"
          label="User"
          type="text"
          :rules="[required('user')]"
        ></v-text-field>

        <v-text-field
          id="password"
          v-model="model.password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          name="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          counter="true"
          :rules="[required('password'), minLength('password', 4)]"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        type="submit"
        :loading="loading"
        :disabled="!valid"
        @click="submitForm(model)"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import validations from '@/utils/validations'

export default {
  props: { submitForm: { type: Function, default: () => {} } },
  data: () => ({
    loading: false,
    showPassword: false,
    valid: false,
    model: {
      username: '',
      password: '',
    },
    ...validations,
  }),
}
</script>

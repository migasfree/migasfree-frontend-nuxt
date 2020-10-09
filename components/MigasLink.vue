<template>
  <v-btn-toggle mandatory>
    <v-btn small :to="link" class="text-none">
      <v-icon v-if="icon">{{ icon }}</v-icon>
      {{ value }}
    </v-btn>
    <v-btn small class="dropdown">
      <v-icon>mdi-menu-down</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    model: { type: String, required: true },
    pk: { type: Number, required: true },
    value: { type: String, required: true },
    tooltip: { type: String, required: false, default: '' },
    icon: { type: String, required: false, default: '' },
  },
  computed: {
    link() {
      return `/${this.model}/results/${this.pk}`
    },
  },
}
</script>

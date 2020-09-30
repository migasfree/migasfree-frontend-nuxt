<template>
  <v-row>
    <v-col cols="1">
      <v-btn v-if="hasAddButton" fab dark color="primary">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="11">
      <h2 class="display-2">
        {{ title }} <v-chip>{{ results }}</v-chip>
      </h2>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    results: { type: Number, required: false, default: 0 },
    hasAddButton: { type: Boolean, required: false, default: true },
  },
}
</script>

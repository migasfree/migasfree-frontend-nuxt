<template>
  <v-row>
    <v-col v-if="hasAddButton" cols="1">
      <v-btn fab dark color="primary">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-col :cols="titleCols">
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
  computed: {
    titleCols() {
      return this.hasAddButton ? 11 : 12
    },
  },
}
</script>

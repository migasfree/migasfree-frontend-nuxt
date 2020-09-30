<template>
  <v-footer :absolute="!fixed" app color="brown lighten-5">
    <span
      >&copy; 2010-{{ new Date().getFullYear() }}
      <a href="http://www.migasfree.org/">migasfree</a> (<a
        href="http://www.gnu.org/licenses/gpl.html"
        >GPLv3</a
      >),
      <v-btn icon href="https://github.com/migasfree/migasfree"
        ><v-icon>mdi-github</v-icon></v-btn
      ></span
    >
    <v-spacer />

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon :href="apiLink" v-bind="attrs" v-on="on"
          ><v-icon>mdi-api</v-icon></v-btn
        >
      </template>
      <span>API Rest Info</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          href="http://fun-with-migasfree.readthedocs.io/"
          v-bind="attrs"
          v-on="on"
          ><v-icon>mdi-text-box-multiple</v-icon></v-btn
        >
      </template>
      <span>migasfree documentation</span>
    </v-tooltip>
  </v-footer>
</template>

<script>
export default {
  props: { fixed: { type: Boolean, required: false, default: false } },
  data() {
    return {
      apiLink: `${this.$config.migasfreeServer}/docs/`,
    }
  },
}
</script>

<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer />
      <v-chip label color="info" @click="passData">{{ data.total }}</v-chip>
    </v-card-title>
    <v-card-text>
      <v-chart
        ref="chart"
        :init-options="initOptions"
        :options="options"
        autoresize
        @click="passData"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card__text {
  width: 100%;
  height: 400px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

export default {
  name: 'NestedPieChart',
  props: {
    title: { type: String, required: true },
    data: {
      type: Object,
      required: true,
      default() {
        return { inner: [], outer: [], total: 0 }
      },
    },
  },
  data: () => ({
    initOptions: {
      renderer: 'svg',
    },
    options: {
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: '{b} ({c}): <strong>{d}%</strong>',
      },
      series: [
        {
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
        {
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            formatter: '{b} ({c}): {per|{d}%}',
            rich: {
              per: {
                fontWeight: 'bold',
              },
            },
          },
          data: [],
        },
      ],
    },
  }),
  watch: {
    data: function (val, oldVal) {
      this.options.series[0].data = val.inner
      this.options.series[1].data = val.outer
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    passData(params) {
      this.$emit('getLink', params)
    },
    windowResize() {
      if (this.$refs.chart !== null && this.$refs.chart !== undefined) {
        this.$refs.chart.resize()
      }
    },
  },
}
</script>

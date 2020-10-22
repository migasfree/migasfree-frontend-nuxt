<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-chart
        ref="chart"
        :init-options="initOptions"
        :options="options"
        @click="passData"
        autoresize
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
  name: 'PieChart',
  props: {
    title: { type: String, required: true },
    data: { type: Array, required: true },
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
          radius: ['30%', '65%'],
          center: ['50%', '60%'],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    },
  }),
  watch: {
    data: function (val, oldVal) {
      this.options.series[0].data = val
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

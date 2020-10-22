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
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

export default {
  name: 'StackedBarChart',
  props: {
    title: { type: String, required: true },
    data: { type: Object, required: true },
  },
  data: () => ({
    options: {
      animation: false,
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: true,
        bottom: 'bottom',
      },
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [],
    },
    initOptions: {
      renderer: 'svg',
    },
  }),
  watch: {
    data: function (val, oldVal) {
      this.options.series = val.series
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

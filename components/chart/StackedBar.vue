<template>
  <v-chart :options="options" @click="passData" />
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
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
      title: {
        text: '',
        left: 'center',
      },
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
  }),
  watch: {
    data: function (val, oldVal) {
      this.options.series = val.series
    },
  },
  mounted() {
    this.options.title.text = this.title
  },
  methods: {
    passData(params) {
      this.$emit('getLink', params)
    },
  },
}
</script>

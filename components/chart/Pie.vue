<template>
  <v-chart :options="options" @click="passData" />
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

export default {
  name: 'PieChart',
  props: {
    title: { type: String, required: true },
    data: { type: Array, required: true },
  },
  data: () => ({
    options: {
      animation: false,
      title: {
        text: '',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} ({c}): <strong>{d}%</strong>',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
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

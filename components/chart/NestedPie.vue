<template>
  <v-chart :options="options" @click="passData" />
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

export default {
  name: 'NestedPieChart',
  props: {
    title: { type: String, required: true },
    data: {
      type: Object,
      required: true,
      default() {
        return { inner: [], outer: [] }
      },
    },
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
        left: 10,
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

<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer />
      <v-chip label color="info" @click="goTo">{{ data.total }}</v-chip>
    </v-card-title>
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
    data: {
      type: Object,
      required: true,
      default() {
        return { data: [], total: 0 }
      },
    },
    url: { type: String, required: false, default: '' },
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
      this.options.series[0].data = val.data
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
    goTo() {
      if (this.url) {
        this.$router.push(this.url)
      }
    },
  },
}
</script>

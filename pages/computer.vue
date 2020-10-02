<template>
  <v-container>
    <v-breadcrumbs large :items="breadcrumbs"></v-breadcrumbs>

    <h2 class="display-2">Ordenadores</h2>

    <v-chart :options="options" @click="goTo" />
  </v-container>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Datos',
          disabled: true,
        },
        {
          text: 'Ordenadores',
          disabled: true,
        },
      ],
      options: {
        title: {
          text: 'Ordenadores por proyecto',
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
    }
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      await this.$axios
        .$get('/api/v1/token/stats/computers/projects/')
        .then((response) => {
          this.options.series[0].data = response
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goTo(params) {
      console.log(params)
    },
  },
}
</script>

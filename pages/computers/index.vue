<template>
  <v-container>
    <v-breadcrumbs large :items="breadcrumbs"></v-breadcrumbs>

    <h2 class="display-2">Ordenadores</h2>

    <PieChart
      title="Ordenadores por proyecto"
      :data="pieData"
      @getLink="goTo"
    />

    <NestedPieChart
      title="Ordenadores productivos"
      :data="nestedPieData"
      @getLink="goTo"
    />

    <StackedBarChart
      title="Nuevos ordenadores / mes"
      :data="barData"
      @getLink="goTo"
    />
  </v-container>
</template>

<script>
import PieChart from '@/components/chart/Pie'
import NestedPieChart from '@/components/chart/NestedPie'
import StackedBarChart from '@/components/chart/StackedBar'

export default {
  components: {
    PieChart,
    NestedPieChart,
    StackedBarChart,
  },
  async fetch() {
    await this.$axios
      .$get('/api/v1/token/stats/computers/projects/')
      .then((response) => {
        this.pieData = response
      })
      .catch((error) => {
        console.log(error)
      })

    await this.$axios
      .$get('/api/v1/token/stats/computers/productive/platform/')
      .then((response) => {
        this.nestedPieData = { inner: response.inner, outer: response.outer }
      })
      .catch((error) => {
        console.log(error)
      })

    await this.$axios
      .$get('/api/v1/token/stats/computers/new/month/')
      .then((response) => {
        const series = []

        Object.entries(response.data).map(([key, val]) => {
          series.push({
            type: 'line',
            smooth: true,
            name: key,
            data: val,
          })
        })
        this.barData = {
          xData: response.x_labels,
          series,
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
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
      pieData: [],
      nestedPieData: {},
      barData: {},
    }
  },
  methods: {
    goTo(params) {
      const url = 'computers/results/?'
      console.log(params)
      if (params.data.project_id) {
        this.$router.push(url + `project_id=${params.data.project_id}`)
      }
    },
  },
}
</script>

<template>
  <v-container>
    <v-breadcrumbs large :items="breadcrumbs"></v-breadcrumbs>

    <v-row>
      <v-col cols="12">
        <h2 class="display-2">Ordenadores</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" sm="4">
        <v-text-field
          v-model="searchText"
          label="Buscar..."
          clearable
          autofocus
          @keydown.enter="search"
        >
          <template slot="append">
            <v-btn icon color="primary" @click="search">
              <v-icon left>mdi-text-search</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" sm="6">
        <PieChart
          title="Ordenadores por proyecto"
          :data="pieData"
          :url="byProjectUrl"
          @getLink="goTo"
        />
      </v-col>

      <v-col cols="6" sm="6">
        <NestedPieChart
          title="Ordenadores productivos"
          :data="nestedPieData"
          :url="productiveUrl"
          @getLink="goTo"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <StackedBarChart
          title="Nuevos ordenadores / mes"
          :data="newMonthData"
          @getLink="goTo"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <StackedBarChart
          title="Ordenadores físicos que entran al sistema por año"
          :data="entryYearData"
          @getLink="goTo"
        />
      </v-col>
    </v-row>
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
        this.nestedPieData = response
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
        this.newMonthData = {
          xData: response.x_labels,
          series,
        }
      })
      .catch((error) => {
        console.log(error)
      })

    await this.$axios
      .$get('/api/v1/token/stats/computers/entry/year/')
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
        this.entryYearData = {
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
      pieData: {},
      nestedPieData: {},
      newMonthData: {},
      entryYearData: {},
      searchText: '',
      url: 'computers/results/?',
    }
  },
  computed: {
    byProjectUrl() {
      return `${this.url}status_in=intended,reserved,unknown` // FIXME
    },
    productiveUrl() {
      return `${this.url}status_in=intended,reserved,unknown`
    },
  },
  methods: {
    goTo(params) {
      console.log(params)
      if (params.data.project_id) {
        this.$router.push(this.url + `project_id=${params.data.project_id}`)
      }

      if (params.data.created_at__lt) {
        let url =
          this.url +
          `created_at__gte=${params.data.created_at__gte}` +
          `&created_at__lt=${params.data.created_at__lt}`
        if (params.data.project__id__exact) {
          url += `&project_id=${params.data.project__id__exact}`
        }
        if (params.data.machine) {
          url += `&machine=${params.data.machine}`
        }
        this.$router.push(url)
      }
    },

    search() {
      this.$router.push(this.url + `search=${this.searchText}`)
    },
  },
}
</script>

<template>
  <v-container>
    <v-breadcrumbs large :items="breadcrumbs"></v-breadcrumbs>

    <CrudHeading title="Ordenadores" :results="totalRecords" />

    <v-row>
      <v-col cols="12">
        <vue-good-table
          ref="myTable"
          :columns="columns"
          :rows="rows"
          mode="remote"
          compact-mode
          :total-rows="totalRecords"
          :is-loading.sync="isLoading"
          :line-numbers="false"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 100,
            perPageDropdown: [50, 100, 150],
            dropdownAllowAll: false,
            nextLabel: $t('vgt.next'),
            prevLabel: $t('vgt.prev'),
            rowsPerPageLabel: $t('vgt.rowPerPage'),
            ofLabel: $t('vgt.of'),
            pageLabel: $t('vgt.page'), // for 'pages' mode
            allLabel: $t('vgt.all'),
          }"
          style-class="vgt-table striped condensed"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'actions'">
              <v-btn x-small color="primary"
                ><v-icon small>mdi-pencil</v-icon></v-btn
              >
              <v-btn x-small color="error"
                ><v-icon small>mdi-delete</v-icon></v-btn
              >
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
          <div slot="emptystate">{{ $t('vgt.noData') }}</div>
          <div slot="selected-row-actions">
            <v-btn x-small color="primary"
              ><v-icon small>mdi-pencil</v-icon></v-btn
            >
            <v-btn x-small color="error"
              ><v-icon small>mdi-delete</v-icon></v-btn
            >
          </div>
        </vue-good-table>
        <v-btn text @click="resetFilters">Reset filters</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CrudHeading from '@/components/CrudHeading'

export default {
  components: {
    CrudHeading,
  },
  async fetch() {
    const url = '/api/v1/token/computers/?' + this.paramsToQueryString()

    await this.$axios
      .$get(url)
      .then((response) => {
        this.totalRecords = response.count
        this.rows = response.results
      })
      .catch((error) => {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'error',
          text: error.response.data,
        })
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
        {
          text: 'Resultados',
          disabled: true,
        },
      ],
      isLoading: false,
      columns: [
        {
          label: 'Actions',
          field: 'actions',
          html: true,
          sortable: false,
          globalSearchDisabled: true,
        },
        {
          label: 'Name',
          field: 'name',
          html: true,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('vgt.filter'),
            trigger: 'enter',
          },
        },
        {
          label: 'Status',
          field: 'status',
          html: false,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('vgt.filter'),
            trigger: 'enter',
          },
        },
        {
          label: 'Project',
          field: 'project.name',
          html: true,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('vgt.filter'),
            trigger: 'enter',
          },
        },
        {
          label: 'User',
          field: 'sync_user.name',
          html: true,
        },
        {
          label: 'Sync end Date',
          field: 'sync_end_date',
          type: 'date',
          dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSSSS",
          dateOutputFormat: 'yyyy-MM-dd HH:mm:ss',
        },
        {
          label: 'Product',
          field: 'product',
          html: true,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('vgt.filter'),
            trigger: 'enter',
          },
        },
      ],
      rows: [],
      totalRecords: 0,
      serverParams: {
        columnFilters: {},
        sort: {
          field: '',
          type: '',
        },
        page: 1,
        perPage: 100,
      },
    }
  },
  created() {
    if (this.$route.query.name) {
      this.updateParams({ columnFilters: { name: this.$route.query.name } })
      this.columns[1].filterOptions.filterValue = this.$route.query.name
    }
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.$fetch()
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.$fetch()
    },

    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type === 'desc' ? '-' : '',
          field: params[0].field.split('.')[0],
        },
      })
      this.$fetch()
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.$fetch()
    },

    paramsToQueryString() {
      let ret = `page_size=${this.serverParams.perPage}&page=${this.serverParams.page}`

      if (Object.keys(this.serverParams.columnFilters).length) {
        ret +=
          '&' +
          Object.entries(this.serverParams.columnFilters)
            .map(([key, val]) => `${key}__icontains=${val}`)
            .join('&')
      }
      if (this.serverParams.sort.field) {
        ret += `&ordering=${this.serverParams.sort.type}${this.serverParams.sort.field}`
      }

      return ret
    },

    resetFilters() {
      this.$refs.myTable.reset()
      this.updateParams({ columnFilters: {} })
      this.$fetch()
    },
  },
}
</script>
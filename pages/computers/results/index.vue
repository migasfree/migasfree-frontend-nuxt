<template>
  <v-container>
    <v-breadcrumbs large :items="breadcrumbs"></v-breadcrumbs>

    <CrudHeading
      title="Ordenadores"
      :results="totalRecords"
      :has-add-button="false"
    />

    <v-row>
      <v-col cols="4" sm="4">
        <v-text-field
          v-model="tableFilters.search"
          label="Buscar..."
          clearable
          autofocus
          @keydown.enter="onSearch"
          @click:clear="onSearchClear"
        >
          <template slot="append">
            <v-btn icon color="primary" @click="onSearch">
              <v-icon left>mdi-text-search</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <v-select
          v-model="tableFilters.platform.selected"
          prepend-icon="mdi-filter"
          :items="tableFilters.platform.items"
          label="Por plataforma"
          dense
          outlined
          item-text="name"
          item-value="id"
          return-object
          @change="onPlatformFilter"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          v-model="tableFilters.architecture.selected"
          prepend-icon="mdi-filter"
          :items="tableFilters.architecture.items"
          label="Por arquitectura"
          dense
          outlined
          item-text="name"
          item-value="id"
          return-object
          @change="onArchitectureFilter"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          v-model="tableFilters.syncEndDate.selected"
          prepend-icon="mdi-filter"
          :items="tableFilters.syncEndDate.items"
          label="Por fecha de última sincronización"
          dense
          outlined
          item-text="name"
          item-value="id"
          return-object
          @change="onSyncEndDateFilter"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          v-model="tableFilters.softwareInventory.selected"
          prepend-icon="mdi-filter"
          :items="tableFilters.softwareInventory.items"
          label="Por inventario de software"
          dense
          outlined
          item-text="name"
          item-value="id"
          return-object
          @change="onSoftwareInventoryFilter"
        ></v-select>
      </v-col>

      <v-col cols="1" sm="1">
        <v-icon right>mdi-filter</v-icon>
      </v-col>
      <v-col cols="11" sm="5"
        ><treeselect
          v-model="tableFilters.statusIn.selected"
          :options="tableFilters.statusIn.items"
          :close-on-select="true"
          :clearable="false"
          placeholder="Por estado"
          @select="onStatusInFilter"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="tableFilters.createdAt.menu"
          :close-on-content-click="false"
          :return-value.sync="tableFilters.createdAt.selected"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="tableFilters.createdAt.view"
              label="Por fecha de alta (rango)"
              prepend-icon="mdi-filter"
              readonly
              dense
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="tableFilters.createdAt.selected"
            range
            no-title
            scrollable
            :first-day-of-week="1"
            locale="es-es"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="tableFilters.createdAt.menu = false"
            >
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="onCreatedAtFilter"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menuSync"
          v-model="tableFilters.syncEndDateRange.menu"
          :close-on-content-click="false"
          :return-value.sync="tableFilters.syncEndDateRange.selected"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="tableFilters.syncEndDateRange.view"
              label="Por fecha de última sincronización (rango)"
              prepend-icon="mdi-filter"
              readonly
              dense
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="tableFilters.syncEndDateRange.selected"
            range
            no-title
            scrollable
            :first-day-of-week="1"
            locale="es-es"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="tableFilters.syncEndDateRange.menu = false"
            >
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="onSyncEndDateRangeFilter">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <treeselect
          v-model="tableFilters.machine.selected"
          :options="tableFilters.machine.items"
          :close-on-select="true"
          :clearable="false"
          placeholder="Por máquina"
          @select="onMachineFilter"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn text @click="resetFilters">Reset all filters</v-btn>
      </v-col>
    </v-row>

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
            perPage: serverParams.perPage,
            perPageDropdown: [50, 100, 150],
            dropdownAllowAll: false,
            nextLabel: $t('vgt.next'),
            prevLabel: $t('vgt.prev'),
            rowsPerPageLabel: $t('vgt.rowPerPage'),
            ofLabel: $t('vgt.of'),
            pageLabel: $t('vgt.page'), // for 'pages' mode
            allLabel: $t('vgt.all'),
          }"
          :search-options="{
            enabled: true,
            skipDiacritics: true,
            externalQuery: tableFilters.search,
          }"
          style-class="vgt-table striped condensed"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          @on-selected-rows-change="onSelectionChanged"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'actions'">
              <v-btn fab x-small color="primary" @click="edit(props.row.id)"
                ><v-icon small>mdi-pencil</v-icon></v-btn
              >
              <v-btn fab x-small color="error" @click="remove(props.row.id)"
                ><v-icon small>mdi-delete</v-icon></v-btn
              >
            </span>
            <span v-else-if="props.column.field == 'name'">
              <MigasLink
                model="computer"
                :pk="props.row.id"
                :icon="computerIcon(props.row.status)"
                :value="props.row.__str__ || ''"
              />
            </span>
            <span v-else-if="props.column.field == 'project.name'">
              <MigasLink
                model="project"
                :pk="props.row.project.id"
                :value="props.row.project.name || ''"
              />
            </span>
            <span v-else-if="props.column.field == 'sync_user.name'">
              <MigasLink
                model="user"
                :pk="props.row.sync_user.id"
                :value="props.row.sync_user.name || ''"
              />
            </span>
            <span v-else-if="props.column.field == 'product'">
              <MigasLink
                model="computer"
                :pk="props.row.id"
                :value="props.row.product || ''"
              />
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
          <div slot="emptystate">{{ $t('vgt.noData') }}</div>
          <div slot="selected-row-actions">
            <v-btn x-small color="error"
              ><v-icon small>mdi-delete</v-icon></v-btn
            >
          </div>
        </vue-good-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CrudHeading from '@/components/ui/CrudHeading'
import MigasLink from '@/components/MigasLink'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    CrudHeading,
    MigasLink,
    Treeselect,
  },
  async fetch() {
    await this.loadFilters()
    await this.loadItems()
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
          disabled: false,
          href: '/computers',
        },
        {
          text: 'Resultados',
          disabled: true,
        },
      ],
      isLoading: false,
      columns: [
        {
          field: 'id',
          hidden: true,
        },
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
          field: '__str__',
          hidden: true,
        },
        {
          field: 'project.id',
          hidden: true,
        },
        {
          label: 'Project',
          field: 'project.name',
          html: true,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('vgt.all'),
            trigger: 'enter',
          },
        },
        {
          field: 'sync_user.id',
          hidden: true,
        },
        {
          label: 'User',
          field: 'sync_user.name',
          html: true,
          filterOptions: {
            enabled: true,
            placeholder: this.$t('vgt.filter'),
            trigger: 'enter',
          },
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
      tableFilters: {
        search: '',
        platform: {
          items: [{ id: '', name: 'Todas' }],
          selected: {},
        },
        architecture: {
          items: [
            { id: '', name: 'Todas' },
            { id: 32, name: '32 bits' },
            { id: 64, name: '64 bits' },
          ],
          selected: {},
        },
        machine: {
          items: [
            { id: '', label: 'Todas' },
            {
              id: 'P',
              label: 'Físicas',
              children: [
                { id: 'desktop', label: 'desktop' },
                { id: 'laptop', label: 'portátil' },
              ],
            },
            {
              id: 'V',
              label: 'Virtuales',
              children: [
                { id: 'virtual', label: 'emulador' },
                { id: 'docker', label: 'contenedor' },
              ],
            },
          ],
          selected: null,
        },
        syncEndDate: {
          items: [
            { id: '', name: 'Todas' },
            { id: 0, name: 'sin fecha' },
            { id: 7, name: 'hace 7 días' },
            { id: 30, name: 'hace 30 días' },
            { id: 60, name: 'hace 60 días' },
            { id: 180, name: 'hace 180 días' },
            { id: 365, name: 'hacer 365 días' },
          ],
          selected: {},
        },
        softwareInventory: {
          items: [
            { id: '', name: 'Todos' },
            { id: 0, name: 'sin inventario' },
          ],
          selected: {},
        },
        statusIn: {
          items: [],
          selected: null,
          choices: {},
        },
        createdAt: {
          selected: [],
          view: '',
          menu: false,
        },
        syncEndDateRange: {
          selected: [],
          view: '',
          menu: false,
        },
      },
    }
  },
  created() {
    if (this.$route.query.name) {
      this.updateParams({ columnFilters: { name: this.$route.query.name } })
      this.columns[2].filterOptions.filterValue = this.$route.query.name
    }

    if (this.$route.query.project_id) {
      this.updateParams({
        columnFilters: { 'project.name': this.$route.query.project_id },
      })
      this.columns[5].filterOptions.filterValue = this.$route.query.project_id
    }

    if (this.$route.query.machine) {
      this.updateParams({
        columnFilters: { machine: this.$route.query.machine },
      })
      this.tableFilters.machine.selected = this.$route.query.machine
    }

    if (this.$route.query.search) {
      this.updateParams({
        columnFilters: { search: this.$route.query.search },
      })
      this.tableFilters.search = this.$route.query.search
    }

    if (this.$route.query.status_in) {
      this.updateParams({
        columnFilters: { status_in: this.$route.query.status_in },
      })
      this.tableFilters.statusIn.selected = this.$route.query.status_in
    }

    if (this.$route.query.created_at__gte && this.$route.query.created_at__lt) {
      this.updateParams({
        columnFilters: {
          created_at__gte: this.$route.query.created_at__gte,
          created_at__lt: this.$route.query.created_at__lt,
        },
      })
      this.tableFilters.createdAt.selected = [
        this.$route.query.created_at__gte,
        this.$route.query.created_at__lt,
      ]
      this.tableFilters.createdAt.view = this.tableFilters.createdAt.selected.join(
        ' ~ '
      )
    }
  },
  methods: {
    updateParams(newProps) {
      console.log('serverParams before', this.serverParams)
      this.serverParams = Object.assign({}, this.serverParams, newProps)
      console.log('serverParams after', this.serverParams)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type === 'desc' ? '-' : '',
          field: params[0].field.split('.')[0],
        },
      })
      this.loadItems()
    },

    onColumnFilter(params) {
      console.log(params)
      this.updateParams(params)
      this.loadItems()
    },

    onSelectionChanged(params) {
      console.log(params)
    },

    onPlatformFilter(params) {
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          platform: params.id,
        }),
      })
      this.loadItems()
    },

    onArchitectureFilter(params) {
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          architecture: params.id,
        }),
      })
      this.loadItems()
    },

    onMachineFilter(params) {
      if (params.id === '' || params.id === 'P' || params.id === 'V') {
        this.updateParams({
          columnFilters: Object.assign(this.serverParams.columnFilters, {
            machine: params.id,
            product_system: '',
          }),
        })
      } else {
        this.updateParams({
          columnFilters: Object.assign(this.serverParams.columnFilters, {
            machine: '',
            product_system: params.id,
          }),
        })
      }
      this.loadItems()
    },

    onSyncEndDateFilter(params) {
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          sync_end_date: params.id,
        }),
      })
      this.loadItems()
    },

    onSoftwareInventoryFilter(params) {
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          has_software_inventory: params.id === 0 ? false : '',
        }),
      })
      this.loadItems()
    },

    onStatusInFilter(params) {
      console.log(params)
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          status_in: params.id,
        }),
      })
      this.loadItems()
    },

    updateStatusInFilter(options) {
      this.tableFilters.statusIn.choices = options.choices

      this.tableFilters.statusIn.items = [
        { id: '', label: 'Todos' },
        {
          id: options.subscribed.join(','),
          label: 'subscribed',
          children: [
            {
              id: options.productive.join(','),
              label: 'productive',
              children: Object.entries(options.productive).map(([key, val]) => {
                return { id: val, label: options.choices[val] }
              }),
            },
            {
              id: options.unproductive.join(','),
              label: 'unproductive',
              children: Object.entries(options.unproductive).map(
                ([key, val]) => {
                  return { id: val, label: options.choices[val] }
                }
              ),
            },
          ],
        },
        { id: options.unsubscribed.join(','), label: 'unsubscribed' },
      ]
    },

    onCreatedAtFilter() {
      this.$refs.menu.save(this.tableFilters.createdAt.selected)
      this.tableFilters.createdAt.view = this.tableFilters.createdAt.selected.join(
        ' ~ '
      )
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          created_at__gte: this.tableFilters.createdAt.selected[0],
          created_at__lt: this.tableFilters.createdAt.selected[1],
        }),
      })
      this.loadItems()
    },

    onSyncEndDateRangeFilter() {
      this.$refs.menuSync.save(this.tableFilters.syncEndDateRange.selected)
      this.tableFilters.syncEndDateRange.view = this.tableFilters.syncEndDateRange.selected.join(
        ' ~ '
      )
      this.updateParams({
        columnFilters: Object.assign(this.serverParams.columnFilters, {
          sync_end_date__gte:
            this.tableFilters.syncEndDateRange.selected[0] + 'T00:00:00',
          sync_end_date__lt:
            this.tableFilters.syncEndDateRange.selected[1] + 'T23:59:59',
        }),
      })
      this.loadItems()
    },

    onSearch() {
      console.log(this.tableFilters.search)
      this.updateParams({
        columnFilters: { search: this.tableFilters.search },
      })
      this.loadItems()
    },

    onSearchClear() {
      this.tableFilters.search = ''
      this.onSearch()
    },

    paramsToQueryString() {
      let ret = `page_size=${this.serverParams.perPage}&page=${this.serverParams.page}`

      if (Object.keys(this.serverParams.columnFilters).length) {
        ret +=
          '&' +
          Object.entries(this.serverParams.columnFilters)
            .map(([key, val]) => {
              switch (key) {
                case 'project.name':
                  return `project__id=${val}`
                case 'platform':
                case 'architecture':
                case 'machine':
                case 'product_system':
                case 'has_software_inventory':
                case 'search':
                case 'created_at__gte':
                case 'created_at__lt':
                case 'sync_end_date__gte':
                case 'sync_end_date__lt':
                  return `${key}=${val}`
                case 'status_in':
                  return `status__in=${val}`
                case 'sync_end_date':
                  if (val === 0) return `${key}__isnull=true`
                  else {
                    let d = new Date()
                    d = d.toISOString(d.setDate(d.getDate() - val))
                    return `${key}__lt=${d}`
                  }
                default:
                  return `${key.replace('.', '__')}__icontains=${val}`
              }
            })
            .join('&')
      }
      if (this.serverParams.sort.field) {
        ret += `&ordering=${this.serverParams.sort.type}${this.serverParams.sort.field}`
      }

      console.log(ret)
      return ret
    },

    async loadFilters() {
      await this.$axios
        .$get('/api/v1/token/platforms/')
        .then((response) => {
          console.log(response.results)
          this.tableFilters.platform.items = this.tableFilters.platform.items.concat(
            response.results
          )
        })
        .catch((error) => {
          this.$store.dispatch('snackbar/setSnackbar', {
            color: 'error',
            text: error.response.data,
          })
        })

      await this.$axios
        .$get('/api/v1/token/projects/')
        .then((response) => {
          this.columns[5].filterOptions.filterDropdownItems = response.results.map(
            (item) => {
              return {
                value: item.id,
                text: item.name,
              }
            }
          )
        })
        .catch((error) => {
          this.$store.dispatch('snackbar/setSnackbar', {
            color: 'error',
            text: error.response.data,
          })
        })

      await this.$axios
        .$get('/api/v1/token/computers/status/')
        .then((response) => {
          this.updateStatusInFilter(response)
        })
        .catch((error) => {
          this.$store.dispatch('snackbar/setSnackbar', {
            color: 'error',
            text: error.response.data,
          })
        })
    },

    async loadItems() {
      await this.$axios
        .$get('/api/v1/token/computers/?' + this.paramsToQueryString())
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

    resetFilters() {
      this.$refs.myTable.reset()
      this.updateParams({ columnFilters: {} })
      this.tableFilters.platform.selected = {}
      this.tableFilters.architecture.selected = {}
      this.tableFilters.syncEndDate.selected = {}
      this.tableFilters.statusIn.selected = null
      this.tableFilters.createdAt.selected = []
      this.tableFilters.createdAt.view = ''
      this.tableFilters.syncEndDateRange.selected = []
      this.tableFilters.syncEndDateRange.view = ''
      this.tableFilters.search = ''
      this.loadItems()
    },

    edit(id) {
      console.log(id)
    },

    remove(id) {
      console.log(id)
    },

    computerIcon(status) {
      switch (status) {
        case 'intended':
          return 'mdi-heart-pulse'
        case 'available':
          return 'mdi-cart'
        case 'in repair':
          return 'mdi-wrench'
        case 'reserved':
          return 'mdi-lock-alert'
        case 'unknown':
          return 'mdi-crosshairs-question'
        case 'unsubscribed':
          return 'mdi-recycle-variant'
      }
    },
  },
}
</script>

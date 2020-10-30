<template>
  <v-list>
    <v-list-group
      v-for="(item, index) in items"
      :key="index"
      :prepend-icon="item.icon"
    >
      <template v-slot:activator>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </template>

      <v-list v-for="(option, indx) in item.options" :key="indx">
        <v-list-item :to="option.to">{{ option.title }}</v-list-item>
        <v-divider v-if="option.separatorAfter"></v-divider>
      </v-list>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-cogs',
          title: 'Configuración',
          options: [
            { title: 'Plataformas', to: '/platforms' },
            { title: 'Proyectos', to: '/projects', separatorAfter: true },
            { title: 'Fórmulas', to: '/formulas' },
            { title: 'Categorías de etiquetas', to: '/stamps' },
            { title: 'Conjuntos de atributos', to: '/attribute-sets' },
            {
              title: 'Definiciones de fallas',
              to: '/fault-definitions',
              separatorAfter: true,
            },
            { title: 'Perfiles de usuario/a', to: '/user-profiles' },
            { title: 'Grupos', to: '/groups' },
            { title: 'Dominios', to: '/domains' },
            { title: 'Ámbitos', to: '/scopes' },
          ],
        },
        {
          icon: 'mdi-printer-eye',
          title: 'Dispositivos',
          options: [
            { title: 'Fabricantes', to: '/manufacturers' },
            { title: 'Modelos', to: '/models' },
            { title: 'Prestaciones', to: '/features' },
            { title: 'Dispositivos', to: '/devices', separatorAfter: true },
            { title: 'Reemplazo de Dispositivos', to: '/devices/replacement' },
          ],
        },
        {
          icon: 'mdi-truck-delivery',
          title: 'Liberación',
          options: [
            { title: 'Despliegues', to: '/deployments' },
            { title: 'Calendarios', to: '/schedules', separatorAfter: true },
            { title: 'Almacenes', to: '/stores' },
            { title: 'Información de Paquetes', to: '/packages/info' },
            { title: 'Paquetes', to: '/packages', separatorAfter: true },
            { title: 'Aplicaciones', to: '/applications' },
            { title: 'Políticas', to: '/policies' },
          ],
        },
        {
          icon: 'mdi-database-search',
          title: 'Datos',
          options: [
            { title: 'Ordenadores', to: '/computers' },
            { title: 'Reemplazo de Ordenadores', to: '/computers/replacement' },
            { title: 'Usuarios/as', to: '/users', separatorAfter: true },
            { title: 'Atributos', to: '/attributes' },
            { title: 'Etiquetas', to: '/tags', separatorAfter: true },
            { title: 'Sincronizaciones', to: '/synchronizations' },
            { title: 'Errores', to: '/errors' },
            { title: 'Fallas', to: '/faults' },
            { title: 'Registros de Estados', to: '/status-logs' },
            { title: 'Migraciones', to: '/migrations', separatorAfter: true },
            { title: 'Notificaciones', to: '/notifications' },
          ],
        },
      ],
    }
  },
}
</script>

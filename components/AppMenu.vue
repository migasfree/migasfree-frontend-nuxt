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
            { title: 'Plataformas', to: '/platform' },
            { title: 'Proyectos', to: '/project', separatorAfter: true },
            { title: 'Fórmulas', to: '/formula' },
            { title: 'Categorías de etiquetas', to: '/stamp' },
            { title: 'Conjuntos de atributos', to: '/attribute-set' },
            {
              title: 'Definiciones de fallas',
              to: '/fault-definition',
              separatorAfter: true,
            },
            { title: 'Perfiles de usuario/a', to: '/user-profile' },
            { title: 'Grupos', to: '/group' },
            { title: 'Dominios', to: '/domain' },
            { title: 'Ámbitos', to: '/scope' },
          ],
        },
        {
          icon: 'mdi-printer-eye',
          title: 'Dispositivos',
          options: [
            { title: 'Fabricantes', to: '/manufacturer' },
            { title: 'Modelos', to: '/model' },
            { title: 'Prestaciones', to: '/feature' },
            { title: 'Dispositivos', to: '/device', separatorAfter: true },
            { title: 'Reemplazo de Dispositivos', to: '/computer' },
          ],
        },
        {
          icon: 'mdi-truck-delivery',
          title: 'Liberación',
          options: [
            { title: 'Despliegues', to: '/deployment' },
            { title: 'Calendarios', to: '/schedule', separatorAfter: true },
            { title: 'Almacenes', to: '/store' },
            { title: 'Información de Paquetes', to: '/package-info' },
            { title: 'Paquetes', to: '/package', separatorAfter: true },
            { title: 'Aplicaciones', to: '/application' },
            { title: 'Políticas', to: '/policy' },
          ],
        },
        {
          icon: 'mdi-database-search',
          title: 'Datos',
          options: [
            { title: 'Ordenadores', to: '/computer' },
            { title: 'Reemplazo de Ordenadores', to: '/computer' },
            { title: 'Usuarios/as', to: '/user', separatorAfter: true },
            { title: 'Atributos', to: '/attribute' },
            { title: 'Etiquetas', to: '/tag', separatorAfter: true },
            { title: 'Sincronizaciones', to: '/synchronization' },
            { title: 'Errores', to: '/error' },
            { title: 'Fallas', to: '/fault' },
            { title: 'Registros de Estados', to: '/status-log' },
            { title: 'Migraciones', to: '/migration', separatorAfter: true },
            { title: 'Notificaciones', to: '/notification' },
          ],
        },
      ],
    }
  },
}
</script>

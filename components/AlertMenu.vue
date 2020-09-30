<template>
  <div>
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
              <v-badge color="error" content="6" overlap>
                <v-icon color="white">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <span>Errores</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-list-item link to="/error">
          <v-list-item-icon>
            <v-icon>mdi-laptop</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="error">21</v-chip> Errores sin
              comprobar</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/fault">
          <v-list-item-icon>
            <v-icon>mdi-laptop</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="error">16</v-chip> Fallas sin
              comprobar</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu bottom offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
              <v-badge color="warning" content="12" overlap>
                <v-icon color="white">mdi-format-list-checkbox</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <span>Avisos</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-list-item link to="/package">
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="warning">54</v-chip> Paquetes
              huérfanos</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/notification">
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="warning">4</v-chip> Notificaciones sin
              comprobar</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/message">
          <v-list-item-icon>
            <v-icon>mdi-laptop</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="warning">34</v-chip> Ordenadores
              retrasados</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/package">
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="warning">2</v-chip> Despliegues con
              calendario finalizado</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu bottom offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
              <v-badge color="info" content="3" overlap>
                <v-icon color="white">mdi-email-outline</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <span>Informaciones</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-list-item link to="/message">
          <v-list-item-icon>
            <v-icon>mdi-laptop</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="info">2</v-chip> Ordenadores
              sincronizándose</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/deployment">
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><v-chip small color="info">1</v-chip> Despliegues con calendario
              activo</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

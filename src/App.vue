<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Poll</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Dashboard</v-btn>
        <v-btn flat>About</v-btn>
        <v-btn flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
    <v-footer
    dark
    height="auto"
    >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="(icon, link) in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
          <p>{{link}}</p>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import Poll from './components/Poll'
import Questions from './components/Questions'

export default {
  name: 'App',
  components: {
    Poll
  },
  data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
}
</script>

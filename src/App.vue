<template>
  <v-app>
    <v-toolbar v-if='$store.state.token'>
      <v-toolbar-title>Poll</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Dashboard</v-btn>
        <v-btn flat>About</v-btn>
        <v-btn flat @click="$store.dispatch('logout')">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view v-on:error-raised="showsnackbar($event)" v-on:login-success="showsnackbar($event);saveToken($event);setToken($event)"></router-view>
    <v-snackbar
      :value="snackbarVisible"
      multi-line
      :timeout='timeout'
      auto-height
      right
    >
      {{ message }}
      <v-btn
        dark
        flat
        @click="snackbarVisible=false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-footer v-if='$store.state.token'
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
// import Poll from './components/Poll'
import LoginForm from '@/components/Login/LoginForm'
import Questions from './components/Questions'
import { setTimeout } from 'timers';
import Vue from 'vue'
import axios from 'axios'
import store from 'vuex'

export default {
  name: 'App',
  components: {
    // Poll
    LoginForm
  },
  data: () => ({
    message:'',
    token: '',
    timeout: 10,
    snackbarVisible: false,
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  }),
  created () {
    if (this.token) {
      axios.defaults.headers['Authorization'] = `JWT ${this.token}`
    }
    global.axios = axios
    global.Vue = Vue
    global.Bus = new Vue()
  },
  // mounted() {
  //   // let token = localStorage.getItem('user-token')
  //   // const instance = axios.create()
  //   axios.defaults.headers['Authorization'] = `JWT ${this.token}`;
  // },
  methods:{
    showsnackbar(event){
      if(event.status=="success"){
        this.$store.commit('update_token', event.token)
        this.$router.push({name:'poll'})
      }
      if(event.status=="error"){
        this.snackbarVisible = true;
        this.message = 'Invalid username or password';
        this.timeout = 4000;
        setTimeout(()=>{
          this.snackbarVisible = false;
        }, this.timeout);
      }
    },
    saveToken(event){
      localStorage.setItem('user-token',event.token)
    },
    setToken(event){
      this.token = event.token
    }
  }
}
</script>

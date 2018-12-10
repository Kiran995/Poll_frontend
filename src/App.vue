<template>
  <v-app>
    <v-toolbar v-if='this.token'>
      <v-toolbar-title>Poll</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Dashboard</v-btn>
        <v-btn flat>About</v-btn>
        <v-btn flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view v-on:error-raised="showsnackbar"></router-view>
    <v-footer v-if='this.token'
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
  methods:{
    showsnackbar(params){
      debugger;
      if(params.response){
        if(params.response.status==400){
          this.snackbarVisible = true;
          this.message = 'Invalid username or password';
          this.timeout = 4000;
          setTimeout(()=>{
            this.snackbarVisible = false;
          }, this.timeout);
        }
      }
      else{
        this.token = params;
        this.$router.push({name:'poll'})
      }
    }
  }
}
</script>

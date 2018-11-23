<template>
  <v-container>
    <h1>Hello</h1>
    <ul v-for="poll in polls" :key="poll.id">
      <h3>{{poll.poll_name}}</h3> 
    </ul>
    <!-- <h3>{{polls}}</h3> -->
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        polls: []
      }
    },
    mounted() {
      var self = this;
      axios.get('http://localhost:8000/web-api/v1/questions/')
      .then(function(response){
        self.polls = response.data.results;
        console.log('Data: ', response.data);
      })
      .catch(function(error){
        console.log("Error:", error);
      })
    }
  }
</script>

<style>

</style>

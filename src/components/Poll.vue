<template>
  <v-container>
    <h1>Poll data</h1>
    <ul v-for="poll in polls" :key="poll.id">
      <button v-on:click="show_questions(poll.id, poll.poll_name)">{{poll.poll_name}}</button> 
    </ul>
    
    <!-- <h3>{{polls}}</h3> -->
  </v-container>
</template>

<script>
  import Questions from '@/components/Questions.vue'
  import axios from 'axios'
  export default {
    // components:{
    //   'second-component-name': require('./Questions.vue',)
    // },
    data() {
      return{
        polls: [],
      }
    },
    mounted() {
      var self = this;
      axios.get('http://localhost:8000/web-api/v1/polls/')
      .then(function(response){
        self.polls = response.data.results;
        console.log('Data: ', response.data);
      })
      .catch(function(error){
        console.log("Error:", error);
      })
    },
    methods:{
      show_questions(id, name){
        this.$router.push({name:'question', params:{name: name, id: id}})
      }
    }
  }
</script>

<style>

</style>

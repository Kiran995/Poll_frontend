<template>
  <v-container>
    <h1>{{$route.params.name}} </h1>
    <ul v-for="question in questions" :key="question.id">
      <button v-on:click='show_options(question.id, question.question)'>{{question.question}}</button> 
    </ul>
    <!-- <h3>{{polls}}</h3> -->
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        questions: []
      }
    },
    mounted() {
      var self = this;
      axios.get('http://localhost:8000/web-api/v1/questions?poll=' + this.$route.params.id)
      .then(function(response){
        self.questions = response.data.results;
      })
      .catch(function(error){
        console.log("Error:", error);
      })
    },
    methods:{
      show_options(id, name){
        this.$router.push({name:'option', params:{name:name, id:id}})
      }
    }
  }
</script>

<style>

</style>

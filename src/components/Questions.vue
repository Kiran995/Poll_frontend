<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h1>{{$route.params.name}} </h1>
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
            v-model="filter.question__icontains"
            label="Filter by Question" class="px-1">
          </v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
            v-model="filter.poll"
            label="Filter by Poll ID" class="px-1">
          </v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-card>
      <ul v-for="question in questions" :key="question.id" :url="geturl">
        <button v-on:click='show_options(question.id, question.question)'>{{question.question}}</button> 
      </ul>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        questions: [],
        filter: {},
        url: ''
      }
    },
    mounted() {
      var self = this;
      axios.get('/questions?poll=' + this.$route.params.id)
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
      },
      getData(endpoint){
        if(this.filter.question__icontains || this.filter.poll){
          global.axios.get(endpoint)
            .then((response)=>{
              this.polls = response.data.results;
              console.log('Data: ', response.data);
            })
            .catch((error)=>{
              console.log("Error:", error);
            })
        }
      }
    },
    computed: {
      geturl () {
        let endpoint = `/questions/`
        let count = 0
        for (let key in this.filter) {
          if (this.filter[key] !== undefined && this.filter[key]) {
            endpoint += `${count ? '&' : '?'}${key}=${this.filter[key]}`
            count += 1
          }
        }
        console.log(endpoint)
        if(this.filter.question__icontains || this.filter.poll){
          global.axios.get(endpoint)
            .then((response)=>{
              this.polls = response.data.results;
              console.log('Data: ', response.data);
            })
            .catch((error)=>{
              console.log("Error:", error);
            })
        }
      }
    }
  }
</script>

<style>

</style>

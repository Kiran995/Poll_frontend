<template>
  <v-container>
    <h3>{{$route.params.name}} </h3>
    <!-- <form id="selected_value" @submit.prevent='processForm'> -->
      <select v-model="checkedValue">
        <option v-for="option in options" :key="option.id">
        {{option.description}}
        </option>
      </select>
      <v-btn color="success" v-on:click="processForm()">Submit</v-btn>
    <!-- </form> -->
    <span>Picked: {{checkedValue}}</span>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        options: [],
        checkedValue: ''
      }
    },
    mounted() {
      var self = this;
      axios.get('http://localhost:8000/web-api/v1/options/?question=' + this.$route.params.id)
      .then(function(response){
        self.options = response.data.results
      })
      .catch(function(error){
        console.log("Error:", error);
      })
    },
    methods:{
        processForm(){
            console.log(this.checkedValue);
        }
    }
  }
</script>

<style>
button{
    border: 1px;
}
</style>

<template>
  <v-container>
    <h3>{{$route.params.name}} </h3>
    <p>{{checkedValue}}</p>
      <v-radio-group v-model="checkedValue">
        <v-radio v-for="option in options" :key="option.id" :label="option.description" :value="option"></v-radio>
      </v-radio-group>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field
          label="Other"
          v-model = "otherOption"
          solo
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn color="success" v-on:click="processForm(otherOption)">Submit</v-btn>
    <span>Picked: {{checkedValue}}</span>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return{
        options: [],
        checkedValue: '',
        otherOption: ''
      }
    },
    mounted() {
      var self = this
      axios.get('/options/?question=' + this.$route.params.id)
      .then(function(response){
        self.options = response.data.results
      })
      .catch(function(error){
        console.log("Error:", error);
      })
    },
    methods:{
      processForm(otherOption){
        console.log(this.otherOption)
        if (this.otherOption.length == 0){
          this.checkedValue.count++;
          axios({
            method: 'PUT',
            url: '/options/'+ this.checkedValue.id + '/',
            data: this.checkedValue
          })
          .then(function(response){
            console.log(response);
            console.log('Done');
          })
          alert('Submitted')
        }else{
          axios.post('/options/', 
            {
              description : this.otherOption,
              count : 1, 
              question: this.$route.params.id
            }).then((response)=>{
              console.log(response)
              location.reload()
            })
        }
      }
    }
  }
</script>

<style>
button{
    border: 1px;
}
</style>

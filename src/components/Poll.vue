<template>
  <v-container>
    <div v-show="!showAddModal">
      <h1>Poll data</h1>
      <span v-for="poll in polls" :key="poll.id">
        <v-btn color="success" v-on:click="show_questions(poll.id, poll.poll_name)">{{poll.poll_name}}</v-btn> 
      </span>
      <v-fab-transition>
        <v-btn class="fab-btn"
          color="pink"
          dark
          absolute
          bottom
          right
          fab
        >
          <v-icon @click="showAddModal = true">add</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>

    <add-poll v-if="showAddModal" @close="changeModal(showAddModal)"></add-poll>
    <!-- <h3>{{polls}}</h3> -->
  </v-container>
</template>

<script>
  import Questions from '@/components/Questions.vue'
  import AddPoll from '@/components/AddPoll.vue'
  import axios from 'axios'
  export default {
    // components:{
    //   'second-component-name': require('./Questions.vue',)
    // },
    data() {
      return{
        polls: [],
        showAddModal: false
      }
    },
    mounted(){
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
    components: {
      AddPoll
    },
    methods:{
      show_questions(id, name){
        this.$router.push({name:'question', params:{name: name, id: id}})
      },
      changeModal(showAddModal){
        this.showAddModal = false;
      }
    }
  }
</script>

<style>
  .fab-btn{
    margin: 0 0 120px 80px;
  }
</style>

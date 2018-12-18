<template>
  <v-container>
    <div v-show="!showAddModal">
      <h1>Poll data</h1>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field
              v-model="filter.poll_name__icontains"
              label="Filter by Poll" class="px-1">
            </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text :url="geturl">
          <span v-for="poll in polls" :key="poll.id">
            <v-btn color="success" v-on:click="show_questions(poll.id, poll.poll_name)">{{poll.poll_name}}</v-btn> 
          </span>
        </v-card-text>
      </v-card>
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
        showAddModal: false,
        filter: {},
        url:''
      }
    },
    mounted(){
      if(this.filter.poll_name__icontains){
        geturl()
      }else{
        global.axios.get('/polls/')
          .then((response)=>{
            this.polls = response.data.results;
            console.log('Data: ', response.data);
          })
          .catch((error)=>{
            console.log("Error:", error);
          })
      }
    },
    components: { 
      AddPoll
    },
    computed: {
      geturl () {
        let url = `/polls/?poll_name__icontains=${this.filter.poll_name__icontains}`
        global.axios.get(url)
        .then((response)=>{
          this.polls = response.data.results;
          console.log('Data: ', response.data);
        })
        .catch((error)=>{
          console.log("Error:", error);
        })
      }
    },
    methods:{
      show_questions(id, name){
        this.$router.push({name:'question', params:{name: name, id: id}})
      },
      changeModal(showAddModal){
        this.showAddModal = false;
        this.$router.go()
      }
    }
  }
</script>

<style>
  .fab-btn{
    margin: 0 0 120px 80px;
  }
</style>

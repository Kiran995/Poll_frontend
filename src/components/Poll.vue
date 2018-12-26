<template>
  <v-container>
    <div v-show="!showAddModal">
      <v-card>
        <v-card-text>
          <h1>Poll data</h1>
          <v-layout row wrap>
            <v-card-actions>
              <v-text-field
                v-model="filter.poll_name__icontains"
                label="Filter by Poll" class="px-1">
              </v-text-field>
             <v-btn color="primary" dark class="mb-2" @click="$router.push({name:'Create Poll'})">Add Poll</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="polls"
            class="elevation-1"
            :url="geturl"
          >
            <template slot="items" slot-scope="props">
              <td v-on:click="show_questions(props.item.id, props.item.poll_name)">{{ props.item.poll_name }}</td>
              <td class="justify-right layout px-4">
                <v-icon
                  small
                  class="mr-2 mt-3"
                  @click="editItem(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  class="mt-3"
                  @click="deleteItem(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <!-- <v-fab-transition>
        <v-btn class="fab-btn"
          color="pink"
          dark
          absolute
          bottom
          right
          fab
          @click="$router.push({name:'Create Poll'})"
        > -->
          <!-- <v-icon @click="showAddModal = true">add</v-icon> -->
          <!-- <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition> -->
    </div>
    <add-poll v-if="showAddModal" @close="changeModal(showAddModal)"></add-poll>
  </v-container>
</template>

<script>
  import Questions from '@/components/Questions.vue'
  import AddPoll from '@/components/AddPoll.vue'
  import axios from 'axios'
  export default {
    data() {
      return{
        polls: [],
        headers: [
        {
          text: 'Poll Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ],
        showAddModal: false,
        filter: {},
        url:''
      }
    },
    mounted(){
      global.axios.get('/polls/')
        .then((response)=>{
          this.polls = response.data.results;
          console.log('Data: ', response.data);
        })
        .catch((error)=>{
          console.log("Error:", error);
        })
    },
    components: { 
      AddPoll
    },
    computed: {
      geturl () {
        if(this.filter.poll_name__icontains){
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
      }
    },
    methods:{
      show_questions(id, name){
        this.$router.push({name:'question', params:{name: name, id: id}})
      },
      changeModal(showAddModal){
        this.showAddModal = false;
        this.$router.go()
      },
      editItem: function(item) {
        // global.axios.get('/nestedPolls/'+ item.id)
        // .then((response)=>{
        //   console.log(response.data)
        //   let editedData = []
        //   editedData = response.data
        //   this.$root.$emit('getData', editedData)
        //   this.$router.push({name:'Create Poll'})
        // })
        this.$router.push({name:'Edit Poll', params:{id:item.id}})
      },
      deleteItem (item) {
        // const index = this.polls.indexOf(item)
        // confirm('Are you sure you want to delete this item?') && this.polls.splice(index, 1)
        if(confirm('Are you sure you want to delete this poll?')){
          global.axios.delete('/polls/'+ item.id)
          .then((response)=>{
            console.log(response);
            location.reload()
          }).catch((error)=>{
            console.log(error);
          })
          return true;
        }else{
          return false;
        }
      },
    }
  }
</script>

<style>
  .fab-btn{
    margin: 0 0 120px 80px;
  }
</style>

<template>
  <!-- <div class="modal is active"> -->
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 class='add-poll'>
        <v-card>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox >
                <span class="headline">Create new poll</span><br>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    label="Type a poll name here"
                    v-model="poll_name"
                  ></v-text-field>
                </v-flex>
                <v-btn color="success" @click="addNewPoll">Create</v-btn>
                <v-btn @click="$emit('close')">Cancel</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  <!-- </div> -->
</template>
<script>
  import axios from 'axios'
  export default{
    data: () => {
      return {
        poll_name : ''
      } 
    },
    methods: {
      addNewPoll () {
        axios.post('http://localhost:8000/web-api/v1/polls/?Create', {poll_name: this.poll_name})
        .then(function(response){
          console.log(response);
        })
        this.$emit('close');
      }
    }
  }
</script>
<style>
  .add-poll{
    margin-top: 20px;
  }
</style>
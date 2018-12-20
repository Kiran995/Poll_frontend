<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <h1>Create New Poll</h1>
            <v-flex xs12 sm6 md3>
              <v-text-field
              label="solo"
              placeholder="Add Poll Name"
              solo
            ></v-text-field>
            </v-flex>
          </v-layout>
          <ul v-for='(box, boxId) in boxes' v-bind:key="boxId">
            <add-questions v-model="box.question"></add-questions>
            <v-btn small color="#4EA699" class="white--text" @click="deleteQuestion(boxId)">DELETE QUESTION</v-btn>
          </ul>
          <v-btn small color="#4EA699" class="white--text" @click="addNewQuestion()">ADD ANOTHER QUESTION</v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
  import AddQuestions from '@/components/AddForm/AddQuestion.vue'
  export default {
    data(){
      return{
        boxes: []
      }
    },
    components:{
      AddQuestions
    },
    methods:{
      addNewQuestion(){
        this.boxes.push({
          question:null
        })
      },
      deleteQuestion(boxId){
        this.boxes.splice(boxId, 1)
      }
    }
  }

</script>

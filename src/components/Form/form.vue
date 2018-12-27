<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-text>
          <v-layout row wrap class="pa-4">
            <v-flex xs12 sm6 md3>
              <h1 v-if="!$route.params.id">Create New Poll</h1>
              <h1 v-else>Edit Poll</h1>
              <v-text-field
              v-model="poll_name"
              label="solo"
              placeholder="Add Poll Name"
              solo
            ></v-text-field>
            </v-flex>
          </v-layout>
          <ul v-for='(question, questionId) in questions' v-bind:key="questionId">
            <add-questions 
              :value="question.question" 
              @input="updateQuestion($event, questionId)"
              :prop_question="question.question"
              :prop_choices="question.options"
            ></add-questions>
            <v-btn small color="#4EA699" class="white--text" @click="deleteQuestion(questionId, question.id)">DELETE QUESTION</v-btn>
          </ul>
          <v-btn small color="#4EA699" class="white--text" @click="addNewQuestion()">ADD ANOTHER QUESTION</v-btn>
        <p>questions:{{questions}}</p>
          <v-layout align-end justify-end>
            <v-btn color="#4EA699" class="white--text" @click="submit" v-if="!$route.params.id">ADD</v-btn>
            <v-btn color="#4EA699" class="white--text" @click="submit" v-else>EDIT</v-btn>
          </v-layout>
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
        poll_name: '',
        questions: []
      }
    },
    components:{
      AddQuestions
    },
    created(){
      if(this.$route.params.id){
        axios.get('/nestedPolls/'+this.$route.params.id)
        .then((response)=>{
          this.questions = response.data.questions
          this.poll_name = response.data.poll_name
        })
      }
    },
    methods:{
      updateQuestion(value, index){
        let obj = this.questions[index]
        if( typeof(value) != 'string'){
          obj.options = value
        }else{
          obj.question = value
        }
        this.$set(this.questions, index, obj)
      },
      addNewQuestion(){
        this.questions.push({
          question:null
        })
      },
      deleteQuestion(questionId, id){
        this.questions.splice(questionId, 1)
        global.axios.delete('/questions/'+id)
        .then((response)=>{
          console.log(response)
        }).catch((error)=>{
          console.log(error)
        })
      },
      submit(){
        if(!this.$route.params.id){
          axios.post('/nestedPolls/', {poll_name:this.poll_name, questions:this.questions})
          .then((response)=>{
            debugger
            console.log(response)
          })
        }else{
          axios.put('/nestedPolls/' + this.$route.params.id + '/', {
            poll_name: this.poll_name,
            questions:this.questions
          }).then((response)=>{
            console.log(response)
          })
        }
      }
    }
  }

</script>

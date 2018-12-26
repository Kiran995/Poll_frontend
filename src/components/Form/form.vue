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
              v-model="name"
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
              :prop_choices="question.options"></add-questions>
            <v-btn small color="#4EA699" class="white--text" @click="deleteQuestion(questionId, question.id)">DELETE QUESTION</v-btn>
          </ul>
          <v-btn small color="#4EA699" class="white--text" @click="addNewQuestion()">ADD ANOTHER QUESTION</v-btn>
        <p>Box:{{questions}}</p>
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
        name: '',
        questions: []
      }
    },
    components:{
      AddQuestions
    },
    created(){
      axios.get('/nestedPolls/'+this.$route.params.id)
      .then((response)=>{
        this.questions = response.data.questions
        this.name = response.data.poll_name
      })
    },
    methods:{
      updateQuestion(value, index){
        let obj = this.boxes[index]
        if( typeof(value) != 'string'){
          obj.options = value
        }else{
          obj.questions = value
        }
        this.$set(this.boxes, index, obj)
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
        axios.post('/polls/', {poll_name: this.poll})       
        .then((response)=>{          
          this.boxes.forEach((element) => {
            axios.post('/questions/', {question: element.question, poll:response.data['id']})
            .then((response)=>{
              element.options.forEach((opt)=>{
                axios.post('/options/', {description:opt.option, count:0, question: response.data['id']})
                .then(function(response){
                  console.log(response);
                })
              })
            })
          })
        })
        
      }
    }
  }

</script>

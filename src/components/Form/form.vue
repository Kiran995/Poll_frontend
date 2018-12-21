<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-text>
          <v-layout row wrap class="pa-4">
            <v-flex xs12 sm6 md3>
              <h1>Create New Poll</h1>
              <v-text-field
              v-model="poll"
              label="solo"
              placeholder="Add Poll Name"
              solo
            ></v-text-field>
            <p>Poll:{{poll}}</p>
            </v-flex>
          </v-layout>
          <ul v-for='(box, boxId) in boxes' v-bind:key="boxId">
            <add-questions :value="box.question" @input="updateQuestion($event, boxId)"></add-questions>
            <v-btn small color="#4EA699" class="white--text" @click="deleteQuestion(boxId)">DELETE QUESTION</v-btn>
          </ul>
          <v-btn small color="#4EA699" class="white--text" @click="addNewQuestion()">ADD ANOTHER QUESTION</v-btn>
        <p>Box:{{boxes}}</p>
          <v-layout align-end justify-end>
            <v-btn color="#4EA699" class="white--text" @click="submit">ADD</v-btn>
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
        poll: '',
        boxes: []
      }
    },
    components:{
      AddQuestions
    },
    methods:{
      updateQuestion(value, index){
        let obj = this.boxes[index]
        if( typeof(value) != 'string'){
          obj.options = value
        }else{
          obj.question = value
        }
        this.$set(this.boxes, index, obj)
      },
      addNewQuestion(){
        this.boxes.push({
          question:null
        })
      },
      deleteQuestion(boxId){
        this.boxes.splice(boxId, 1)
      },
      submit(){
        let questions = []
        questions = this.boxes
        axios.post('http://localhost:8000/web-api/v1/polls/', {poll_name: this.poll})
        .then(function(response){
          console.log(response.data['id']);
          questions.forEach((element) => {
            let options = []
            options = element.options
            axios.post('http://localhost:8000/web-api/v1/questions/', {question: element.question, poll:response.data['id']})
            .then(function(response){
              console.log(response);
              options.forEach((opt)=>{
                axios.post('http://localhost:8000/web-api/v1/options/', {description:opt.option, count:0, question: response.data['id']})
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

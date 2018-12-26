<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-text>
          <v-layout row wrap class="pa-4">
            <v-flex xs12 sm6 md3>
              <h1 v-if="!id">Create New Poll </h1>
              <h1 v-else> Edit Poll </h1>
              <p>{{$route.params.id}}</p>
              <v-text-field
              v-model="boxes.poll_name"
              label="solo"
              placeholder="Add Poll Name"
              solo
            ></v-text-field>
            </v-flex>
          </v-layout>
          <ul v-for='(box, boxId) in boxes.questions' v-bind:key="boxId">
            <add-questions v-model="box.question"
            :prop_question="box.question" :prop_options = "box.options"></add-questions>
            <v-btn small color="#4EA699" class="white--text" @click="deleteQuestion(boxId, box.id)">DELETE QUESTION</v-btn>
          </ul>
          <v-btn small color="#4EA699" class="white--text" @click="addNewQuestion()">ADD ANOTHER QUESTION</v-btn>
        <p>Box:{{boxes}}</p>
          <v-layout align-end justify-end>
            <v-btn color="#4EA699" class="white--text" @click="submit" v-if="!id">ADD</v-btn>
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
        data: [],
        poll: '',
        boxes: [],
        id: null
      }
    },
    components:{
      AddQuestions
    },
    created(){
      this.id = this.$route.params.id
      if(this.$route.params.id){
        global.axios.get('/nestedPolls/'+ this.$route.params.id)
        .then((response)=>{
          this.boxes = response.data
        })
      }
    },
    methods:{
      // updateQuestion(value, index){
      //   let obj = this.boxes[index]
      //   if( typeof(value) != 'string'){
      //     obj.options = value
      //   }else{
      //     debugger
      //     obj.question = value
      //   }
      //   this.$set(this.boxes, index, obj)
      // },
      addNewQuestion(){
        if(!this.id){
          this.boxes.push({
            questions:null
          })
        }else{
          this.boxes.questions.push({
            question:null
          })
        }
      },
      deleteQuestion(boxId, id){
        if(id!=null){
          axios.delete('/questions/'+id)
          .then((response)=>{
            console.log(response)
          })
        }
        this.boxes.questions.splice(boxId, 1)
      },
      submit(){
        if(this.id){
          axios.put('/polls/'+this.id, {poll_name:this.data.poll_name})
          .then((response)=>{
            console.log(response)
          })
        }else{
          axios.post('/polls/', {poll_name: this.data.poll_name})
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
  }

</script>

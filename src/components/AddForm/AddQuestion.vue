<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <span>Add Question</span>
          {{question}}
          <v-text-field
            v-model="question"
            label="solo"
            placeholder="Add Question"
            solo
          ></v-text-field>
        </v-flex>
        <span>Add Option</span>
        <ul v-for='(choice, index) in choices' v-bind:key="index">
          <v-flex xs12 lg12>
            <v-text-field
              v-model="choice.description"
              label="solo"
              placeholder="Add Option"
              solo
            ></v-text-field>
            <v-btn
              fab
              dark
              small
              color="#140D4F"
              @click="deleteTextBox(index, choice.id)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </ul>
        <v-flex xs12>
          <v-btn
            fab
            dark
            small
            color="indigo"
            @click="addTextBox($event)"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    props:[
      'prop_question',
      'prop_choices'
    ],
    data() {
      return{
        // check if value is null or not
        question: this.prop_question != null ? this.prop_question : [],
        choices: this.prop_choices != null ? this.prop_choices : []
      }
    },
    watch: {
      'question': function(newVal, oldVal){
        this.$emit('input', newVal)
      },
      'choices': function(newVal, oldVal){
        this.$emit('input', newVal)
      }
    },
    methods: {
      addTextBox(){
        this.choices.push({
          description:null,
        })
      },
      deleteTextBox(index, id){
        this.choices.splice(index, 1)
        axios.delete('/options/'+id)
        .then((response)=>{
          console.log(response)
        })
      }
    }
  }
</script>
<style>

</style>

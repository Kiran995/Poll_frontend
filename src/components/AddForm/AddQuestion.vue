<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <span>Add Question</span>
          <v-text-field
            v-model="question"
            label="solo"
            placeholder="Add Question"
            solo
          ></v-text-field>
        </v-flex>
        <span>Add Option</span>
        <ul v-for='(input, index) in inputs' v-bind:key="index">
          {{input}}
          <v-flex xs12 lg12>
            <v-text-field
              v-model="input.description"
              label="solo"
              placeholder="Add Option"
              solo
            ></v-text-field>
            <v-btn
              fab
              dark
              small
              color="#140D4F"
              @click="deleteTextBox(index)"
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
    props: [
      'prop_question',
      'prop_options'
    ],
    data() {
      return{
        question: this.prop_question,
        inputs: this.prop_options
      }
    },
    watch: {
      'question': function(newVal, oldVal){
        this.$emit('input', newVal)
      },
      'inputs': function(newVal, oldVal){
        this.$emit('input', newVal)
      }
    },
    methods: {
      addTextBox() {
        this.inputs.push({
          description:null
        })
      },
      deleteTextBox(index){
        this.inputs.splice(index, 1)
      }
    }
  }
</script>
<style>

</style>

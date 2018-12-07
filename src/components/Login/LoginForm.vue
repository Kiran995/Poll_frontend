<template>
    <v-card class="div-form">
        <h2>LOGIN</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="20"
            label="Name"
            required
            ></v-text-field>
            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
            <v-btn
            :disabled="!valid"
            @click="submit"
            >
            submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
    </v-card>
</template>
<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
<style>
  .div-form{
    width: 400px;
    margin:150px;
    padding: 20px;
    margin-left: 450px;
  }
</style>

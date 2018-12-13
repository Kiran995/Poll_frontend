<template>
  <div>
    <v-card class="div-form">
        <h2>LOGIN</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required
            ></v-text-field>
            <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="passwordFieldType"
            label="Password"
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
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      token: '',
      error: '',
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      password: '',
      passwordFieldType: 'password',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 4) || 'Password must be greater than 4 characters'
      ],
      select: null,
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('http://localhost:8000/web-api/v1/token-auth/', {
            username: this.username,
            password: this.password,
          })
          .then(response => {
            let token = response.data['token']
            console.log(response.data['token'])
            this.$emit('login-success', {"token":token,"status":"success","message":"Login Success"})
          })
          .catch(error => {
            this.error = error
            this.$emit('error-raised', {"status":"error","message":"failed"})
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

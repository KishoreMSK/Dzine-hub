<template>
    <v-container class="container">
    <v-card >
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login" class="form">
          <v-text-field v-model="email" label="Email-id" :rules="emailRules" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
          <v-btn :loading="loading" color="success" type="submit" variant="flat" rounded="lg" size="large" @click="register">Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router';
export default{
    name:'RegisterComponent',
    data() {
    return {
      email: '',
      emailRules: [
        value => {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
                return 'Must be a valid e-mail.'
        },
      ],
      password: '',
      loading: false
    };
  },
  methods: {
    register() {
        if(/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(this.email)){
          this.loading = true
          const payload = {
            email: this.email,
            password: this.password
          }
          axios.post(`https://reqres.in/api/register`,payload)
          .then((response) => {
            this.successCallback(response)
          })
          .catch((e) => {
            this.errorCallback(e)
          })
        } else {
            return
        }
    },
    successCallback(response){
        this.loading = false;
        if(response.status === 200){
            this.$router.push('/')
            console.log(response.data);
        } 
    },
    errorCallback(e){
        this.loading = false;
        if(e.response.status)
        console.log(e.response.data);
    }
  },
}
</script>

<style scoped>
.container{
    width: 450px;
    height: 450px;
}
.form{
    margin-bottom: 15px;
}
</style>
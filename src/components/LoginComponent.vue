<template>
  <v-container class="container">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" class="form">
          <v-text-field v-model="email" label="Email-id" :rules="emailRules" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          <v-btn :loading="loading" color="success" type="submit" variant="flat" rounded="lg" size="large"
            @click="login">Login</v-btn>
        </v-form>
        <span>Don't have an accoount.?<routerLink to="/register"> Click here to Register </routerLink></span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import { useToast, POSITION } from 'vue-toastification'
export default {
  name: "LoginComponent",
  setup() {
    const toast = useToast();
    return { toast }
  },
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
  created() {
        sessionStorage.setItem('isAuth', false)
    },
  methods: {
    login() {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(this.email)) {
        this.loading = true
        const payload = {
          email: this.email,
          password: this.password
        }
        axios.post(`https://reqres.in/api/login`, payload)
          .then((response) => {
            this.successCallback(response)
          })
          .catch((e) => {
            this.errorCallback(e)
          })
      }
    },
    successCallback(response) {
      this.loading = false;
      if (response.status === 200) {
        this.toast.success("Login successful", { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
        localStorage.setItem("token", response.data.token)
        sessionStorage.setItem("isAuth", true)
        this.$router.push('/users')
      }
    },
    errorCallback(e) {
      this.loading = false
      const error = e.response.data.error
      if (e.response.status === 400) {
        this.toast.error(error, { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
      }
    }
  },
};
</script>

<style scoped>
.container {
  width: 450px;
  height: 450px;
  margin-top: 10%;
}

.form {
  margin-bottom: 15px;
}
</style>
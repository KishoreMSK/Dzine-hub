<template>
    <v-container class="container">
        <v-card>
            <v-card-title>Register</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submit" class="form">
                    <v-text-field v-model="email" label="Email-id" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                    <v-btn :loading="loading" color="success" type="submit" variant="flat" rounded="lg" size="large"
                        @click="register">Register</v-btn>
                </v-form>
                <routerLink to="/">Back to login</routerLink>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios'
import { useToast, POSITION } from 'vue-toastification'
export default {
    name: 'RegisterComponent',
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
    methods: {
        register() {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(this.email)) {
                this.loading = true
                const payload = {
                    email: this.email,
                    password: this.password
                }
                axios.post(`https://reqres.in/api/register`, payload)
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
        successCallback(response) {
            this.loading = false;
            if (response.status === 200) {
                this.toast.success("Registration successful", { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
                this.$router.push('/')
                this.$store.dispatch('updateAccessToken', response.data.token)
            }
        },
        errorCallback(e) {
            this.loading = false;
            const error = e.response.data.error
            if (e.response.status === 400)
                this.toast.error(error, { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
        }
    },
}
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
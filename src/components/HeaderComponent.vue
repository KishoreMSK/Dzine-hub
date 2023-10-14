<template>
    <div class="header">
        <strong class="flex-item-left">Hellooo users...</strong>
        <v-btn class="flex-item-right" size="large" @click="openCreateUser">Create User</v-btn>
        <!-- Create user dialog -->
        <div class="dialog-container">
            <v-dialog v-model="showCreateUser" class="dialog">
                <v-container class="container">
                    <v-card class="userCard">
                        <v-card-title class="create-user">Create User</v-card-title>
                        <span class="closeIcon" @click="closeCreateUserDialog">X</span>
                        <v-card-text>
                            <v-form @submit.prevent="submit" class="form">
                                <v-text-field v-model="name" label="name" :rules="nameRules" required></v-text-field>
                                <v-text-field v-model="job" label="job" required></v-text-field>
                                <v-btn class="create-user" :loading="loading" color="success" type="submit" variant="flat"
                                    rounded="lg" size="large" @click="createUser">Create</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-container>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useToast, POSITION } from "vue-toastification";
export default {
    name: 'HeaderComponent',
    setup() {
        const toast = useToast();
        return { toast }
    },
    data() {
        return {
            showCreateUser: false,
            name: '',
            job: '',
            loading: false,
            nameRules: [
                value => {
                    if (/^[a-z.-]/i.test(value)) return true
                    return 'Must be a valid e-mail.'
                },
            ],
        }
    },
    methods: {
        openCreateUser() {
            this.showCreateUser = true;
        },
        createUser() {
            const payload = {
                name: this.name,
                job: this.job
            }
            this.loading = true;
            axios.post(`https://reqres.in/api/users`)
                .then((response) => {
                    this.successCallback(response)
                })
                .catch((e) => {
                    this.errorCallback(e)
                })
        },
        successCallback(response) {
            console.log(response);
            this.loading = false
            this.toast.success("User created successfully", { position: POSITION.BOTTOM_RIGHT, timeout: 3000 });
            this.closeCreateUserDialog()
        },
        errorCallback(e) {
            if (e.response.status === 400) {
                console.log(e.response.data);
            }
        },
        closeCreateUserDialog() {
            this.showCreateUser = false
        }
    }
}
</script>

<style scoped> .header {
     display: flex;
     font-size: x-large;
     font-weight: bold;
 }

 .create-user {
     margin-left: 130px;
 }

 .flex-item-left {
     padding: 10px;
     flex: 50%;
 }

 .flex-item-right {
     background-color: #b7e6b4;
     margin-right: 5%;
     flex: 1%;
 }

 .dialog-container {
     display: flex;
     justify-content: center;
     align-items: center;
 }

 .dialog {
     width: 375px;
     height: 530px;
 }

 .form {
     margin-bottom: 15px;
 }

 .container {
     width: 450px;
     height: 450px;
     justify-content: center;
 }

 .userCard {
     position: relative;
 }

 .closeIcon {
     position: absolute;
     right: 15px;
     top: 10px;
     cursor: pointer;
     font-weight: bold;
 }
</style>
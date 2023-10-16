<template>
    <div class="header">
        <div class="flex-item-left">
            <strong class="heading">Employees List</strong>
        </div>
        <div class="flex-item-right">
            <v-btn class="userBtn" size="large" @click="openCreateUser">Create User</v-btn>
        </div>
        <!-- Create user dialog -->
        <div class="dialog-container">
            <v-dialog v-model="showCreateUser" class="dialog">
                <v-container class="container">
                    <v-card class="userCard">
                        <v-card-title class="create-user">Create User</v-card-title>
                        <span class="closeIcon" @click="closeCreateUserDialog">X</span>
                        <v-card-text>
                            <v-form @submit.prevent="submit" class="form">
                                <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
                                <v-text-field v-model="job" label="Job" :rules="jobRules" required></v-text-field>
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
import axios from '../service/axios'
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
                    return 'Name should not be empty.'
                },
            ],
            jobRules: [
                value => {
                    if (/^[a-z.-]/i.test(value)) return true
                    return 'Job should not be empty.'
                },
            ]
        }
    },
    methods: {
        openCreateUser() {
            this.showCreateUser = true;
        },
        createUser() {
            if (this.name !== '' && this.job !== '') {
                const payload = {
                    name: this.name,
                    job: this.job
                }
                this.loading = true;
                axios.post(`/api/users`)
                    .then((response) => {
                        this.successCallback(response)
                    })
                    .catch((e) => {
                        this.errorCallback(e)
                    })
            }
        },
        successCallback(response) {
            this.loading = false
            this.toast.success("User created successfully", { position: POSITION.BOTTOM_RIGHT, timeout: 3000 });
            this.closeCreateUserDialog()
        },
        errorCallback(e) {
            if (e.response.status === 400) {
                this.toast.error("User creation failed", { position: POSITION.BOTTOM_RIGHT, timeout: 3000 });
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
     margin-top: 5%;
 }

 .create-user {
     margin-left: 130px;
 }

 .flex-item-left {
     padding: 10px;
     flex: 50%;
     position: relative;
 }

 .flex-item-right {
     margin-right: 5%;
     flex: 1%;
     position: relative;
 }

 .userBtn {
     position: absolute;
     right: 10%;
     font-family: serif;
     font-size: medium;
     font-weight: bold;
     background-color: azure;
 }

 .heading {
     position: absolute;
     left: 7%;
     font-family: math;
     color: crimson;
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

 @media screen and (max-width: 620px) {
     .heading {
         width: 100%;
         margin-top: 5%;
         margin-left: 20%;
     }

     .userBtn {
         width: 240px;
         margin-top: 50%;
         margin-right: 100%;
         font-size: revert;
     }

     .flex-item-right {
         padding: 20px;
     }

     .container {
         width: 380px;
     }

     .create-user {
         margin-left: 100px;
     }
     .dialog {
         margin-right: 26%;
     }
 }

 @media screen and (max-width: 460px) {
     .userBtn {
         width: 100%;
         margin-top: 65%;
         margin-right: 100%;
         font-size: x-small;
     }

     .flex-item-left {
         margin-left: 15%;
     }

     .dialog-container {
         margin-right: 5%;
     }

     .flex-item-right {
         padding: 20px;
     }

     .container {
         width: 380px;
         margin-left: 22%
     }

     .create-user {
         margin-left: 100px;
     }
 }</style>
<template>
    <v-layout>
        <v-app-bar color="teal-darken-4">
            <template v-slot:image>
                <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
            </template>
            <v-app-bar-title class="title">Employee Management System</v-app-bar-title>
            <v-btn v-if="checkIsAuth" class="logout" @click="logout">Logout</v-btn>
        </v-app-bar>
    </v-layout>
    <AlertComponent v-if="logoutUser" message='logout' @handleConfirm="handleConfirm" @closeDialog="closeDialog" />
</template>

<style scoped>
.title {
    font-size: x-large;
    font-style: italic;
    font-family: emoji;
}

.logout {
    font-style: italic;
    font-family: emoji;
    font-size: large;
}
</style>
<script>
import AlertComponent from './AlertComponent.vue';
import { useToast, POSITION } from 'vue-toastification'

export default {
    name: 'NavbarComponent',
    setup() {
        const toast = useToast();
        return { toast }
    },
    components: {
        AlertComponent
    },
    data() {
        return {
            logoutUser: false,
            // isAuthenticated: ;
        }
    },
    computed:{
        checkIsAuth(){
            console.log(sessionStorage.getItem('isAuth'))
            return sessionStorage.getItem('isAuth');
        }
    },
    // mounted(){
    //     this.isAuthenticated = sessionStorage.getItem('isAuth');
    // },
    methods: {
        logout() {
            this.logoutUser = true;
            console.log(this.logoutUser);
        },
        closeDialog(value) {
            this.logoutUser = value;
        },
        handleConfirm(value) {
            this.logoutUser = value;
            this.toast.success("Logged out successfully", { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
            sessionStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>
<template>
    <v-card class="content" max-width="444" @click="getSingleUser(user.id)">
        <img :src="user.avatar" class="avatar" />
        <v-card-title>
            {{ user.first_name }} {{ user.last_name }}
        </v-card-title>
        <v-text>
            {{ user.email }}
        </v-text>
    </v-card>
    <!-- show single user dialog -->
    <div v-if="showDialog" class="dialog-container">
        <v-dialog v-model="showDialog" class="dialog">
            <v-card class="modal">
                <span class="closeIcon" @click="closeSingleUserDialog">X</span>

                <img :src="singleUser.avatar" class="avatar" />
                <v-chip class="ma-2" color="success" size="large" label>
                    <svg-icon type="mdi" :path="profile"></svg-icon>
                    {{ singleUser.first_name }} {{ singleUser.last_name }}
                </v-chip>
                <v-chip class="ma-2" color="indigo" size="large">
                    <svg-icon type="mdi" :path="email"></svg-icon>
                    {{ singleUser.email }}
                </v-chip>
                <div class="d-flex justify-space-around">
                    <v-btn class="ma-2" color="red" @click="openDeleteUser">
                        <svg-icon type="mdi" :path="delete"></svg-icon>
                        Delete
                    </v-btn>
                    <v-btn class="ma-2" color="blue-lighten-1" @click="openUpdateUser">
                        <svg-icon type="mdi" :path="update"></svg-icon>
                        Update
                        <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>

    <!-- update user dialog -->
    <div class="dialog-container">
        <v-dialog v-model="updatingUser" class="dialog">
            <v-container class="container">
                <v-card class="userCard">
                    <v-card-title class="updateBtn">Update User</v-card-title>
                    <span class="closeIcon" @click="closeUpdateUserDialog">X</span>
                    <v-card-text>
                        <v-form @submit.prevent="login" class="form">
                            <v-text-field v-model="name" class="name-field" label="name" disabled required></v-text-field>
                            <v-text-field v-model="job" class="job-field" label="enter the job" required></v-text-field>
                            <v-btn class="updateBtn" :loading="loading" color="success" type="submit" variant="flat"
                                rounded="lg" size="large" @click="updateUser(singleUser.id)">Update</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-dialog>
    </div>
    <div>

        <!-- Delete dialog -->
        <div class="dialog-container">
            <v-dialog v-model="deletingUser" class="deleteDialog">
                <v-container class="container">
                    <v-card class="deleteCard">
                        <span class="closeIcon" @click="closeDeleteDialog">X</span>
                        <div class="msg-Container">
                            <div>
                                Are you sure you want to delete this user.?
                            </div>
                        </div>
                        <div class="chips">
                            <v-chip class="ma-2" color="red" size="x-large" text-color="white"  @click="deleteUser(singleUser.id)">
                                Confirm
                            </v-chip>

                            <v-chip class="ma-2" color="green" size="x-large" text-color="white" @click="closeDeleteDialog">
                                 Cancel
                            </v-chip>
                        </div>
                    </v-card>
                </v-container>
            </v-dialog>
        </div>

    </div>
</template>

<script src="./CardComponent.js" />

<style scoped>
.content {
    width: 300px;
    margin: 20px;
    border-radius: 10%;
}

.container {
    width: 450px;
    height: 450px;
    justify-content: center;
}

.userCard {
    position: relative;
}

.msg-Container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    margin-left: 6%;
    font-size: x-large;
}

.deleteCard {
    width: 340px;
    height: 230px;
}
.chips{
    display: flex;
    justify-content: center;
    padding-top: 5%;
}
.avatar {
    width: 80%;
    height: 59%;
    margin-top: 15px;
    border-radius: 50%;
}

.dialog-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.name-field {
    border-style: ridge;
    font-weight: bolder;
}

.job-field {
    margin-top: 8px;
}

.dialog {
    width: 375px;
    height: 530px;
}

.deleteDialog {
    width: 375px;
    height: 560px;
}

.updateBtn {
    margin-left: 130px;
}

.modal {
    display: flex;
    position: relative;
    align-items: center;
    width: 320px;
    height: 370px;
    padding: 15px;
    border-radius: 5%;
}

.closeIcon {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
    font-weight: b
        /* padding: 5px ; */
}
</style>
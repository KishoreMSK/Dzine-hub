<template>
    <div class="dialog-container">
        <v-dialog v-model="isOpen" class="deleteDialog">
            <v-container class="container">
                <v-card class="deleteCard">
                    <span class="closeIcon" @click="closeDialog">X</span>
                    <div class="msg-Container">
                        <div>
                            Are you sure you want to {{ message }}?
                        </div>
                    </div>
                    <div class="chips">
                        <v-chip class="ma-2" color="red" size="x-large" text-color="white" @click="confirm">
                            Confirm
                        </v-chip>

                        <v-chip class="ma-2" color="green" size="x-large" text-color="white" @click="closeDialog">
                            Cancel
                        </v-chip>
                    </div>
                </v-card>
            </v-container>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'AlertComponent',
    data() {
        return {
            isOpen: true
        }
    },
    props: {
        message: String,
    },
    methods: {
        closeDialog() {
            this.isOpen = false;
            this.$emit('closeDialog', false);
        },
        confirm() {
            this.isOpen = false;
            this.$emit('handleConfirm', false)
        }
    }
}
</script>

<style scoped>
.dialog-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.deleteDialog {
    width: 375px;
    height: 560px;
}

.deleteCard {
    width: 340px;
    height: 230px;
}

.chips {
    display: flex;
    justify-content: center;
    padding-top: 5%;
}

.container {
    width: 450px;
    height: 450px;
    justify-content: center;
}

.closeIcon {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
    font-weight: b
}

.msg-Container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    margin-left: 6%;
    font-size: x-large;
}</style>
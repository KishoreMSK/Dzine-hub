import axios from "axios";
import SvgIcon from "@jamescoyle/vue-icon";
import {useToast, POSITION} from 'vue-toastification'
import { mdiDelete, mdiUpdate, mdiAccount, mdiEmail } from "@mdi/js";
export default {
  name: "CardComponent",
  components: {
    SvgIcon,
    mdiUpdate,
    mdiAccount
  },
  setup(){
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      delete: mdiDelete,
      update: mdiUpdate,
      profile: mdiAccount,
      email: mdiEmail,
      showDialog: false,
      updatingUser: false,
      deletingUser: false,
      deletingUser: false,
      loading: false,
      singleUser: {},
      name: "",
      job: "",
    };
  },
  props: {
    user: Object,
  },
  methods: {
    getSingleUser(id) {
      axios
        .get(`https://reqres.in/api/users/${id}`)
        .then((response) => {
          this.successCallback(response.data.data);
        })
        .catch((e) => {
          this.errorCallback(e);
        });
    },
    successCallback(data) {
      this.showDialog = true;
      this.singleUser = data;
      console.log(this.showDialog);
    },
    errorCallback(e) {
      console.log(e);
    },
    updateUser(id) {
      const payload = {
        name: this.singleUser.first_name,
        job: this.job,
      };
      this.loading = true;
      axios
        .put(`https://reqres.in/api/users/${id}`,payload)
        .then((response) => {
          this.success(response.data.data);
        })
        .catch((e) => {
          this.error(e);
        });
    },
    success() {
      this.loading = false;
      this.updatingUser = false;
      this.toast.success("User updated successfully",{position: POSITION.BOTTOM_RIGHT, timeout: 3000})
    },
    error(e) {
      this.toast.error("User updation failed",{position: POSITION.BOTTOM_RIGHT, timeout: 3000})
      console.log(e);
    },
    deleteUser(id){
        axios
        .delete(`https://reqres.in/api/users/${id}`)
        .then((response) => {
          this.deleteSuccess(response.data.data);
        })
        .catch((e) => {
          this.deleteFail(e);
        });
    },
    deleteSuccess(){
        this.toast.success("User deleted successfully",{position: POSITION.BOTTOM_RIGHT, timeout: 3000})
        this.closeDeleteDialog();
    },
    deleteFail(){
        this.toast.error("User deletion failed",{position: POSITION.BOTTOM_RIGHT, timeout: 3000})
        this.closeDeleteDialog()
    },
    openUpdateUser() {
        this.showDialog = false;
        console.log(this.singleUser);
        this.name = this.singleUser.first_name;
        this.updatingUser = true;
    },
    openDeleteUser() {
        this.deletingUser = true;
        this.showDialog = false
    },
    closeSingleUserDialog() {
      this.showDialog = false;
    },
    closeUpdateUserDialog() {
      this.updatingUser = false;
    },
    closeDeleteDialog(){
        this.deletingUser= false
    }
  },
};

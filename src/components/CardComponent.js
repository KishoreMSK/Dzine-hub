import axios from "../service/axios";
import SvgIcon from "@jamescoyle/vue-icon";
import { useToast, POSITION } from "vue-toastification";
import { mdiDelete, mdiUpdate, mdiAccount, mdiEmail } from "@mdi/js";
import AlertComponent from "./AlertComponent.vue";
export default {
  name: "CardComponent",
  components: {
    SvgIcon,
    mdiUpdate,
    mdiAccount,
    AlertComponent,
  },
  setup() {
    const toast = useToast();
    return { toast };
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
      jobRules: [
        (value) => {
          if (/^[a-z.-]/i.test(value)) return true;
          return "Job should not be empty.";
        },
      ],
    };
  },
  props: {
    user: Object,
  },
  methods: {
    getSingleUser(id) {
      axios
        .get(`/api/users/${id}`)
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
    },
    errorCallback(e) {
      if (e.response.status === 404) {
        this.toast.error("User not found", {
          position: POSITION.BOTTOM_RIGHT,
          timeout: 2000,
        });
      }
    },
    updateUser(id) {
      if (this.job !== "") {
        const payload = {
          name: this.singleUser.first_name,
          job: this.job,
        };
        this.loading = true;
        axios
          .put(`/api/users/${id}`, payload)
          .then((response) => {
            this.success(response.data.data);
          })
          .catch((e) => {
            this.error(e);
          });
      }
    },
    success() {
      this.loading = false;
      this.closeUpdateUserDialog();
      this.toast.success("User updated successfully", {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 2000,
      });
    },
    error(e) {
      this.toast.error("User updation failed", {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 2000,
      });
    },
    deleteUser(id) {
      axios
        .delete(`/api/users/${id}`)
        .then((response) => {
          this.deleteSuccess(response.data.data);
        })
        .catch((e) => {
          this.deleteFail(e);
        });
    },
    deleteSuccess() {
      this.toast.success("User deleted successfully", {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 2000,
      });
      this.closeDeleteDialog();
    },
    deleteFail() {
      this.toast.error("User deletion failed", {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 2000,
      });
      this.closeDeleteDialog();
    },
    openUpdateUser() {
      this.showDialog = false;
      this.name = this.singleUser.first_name;
      this.updatingUser = true;
    },
    openDeleteUser() {
      this.deletingUser = true;
      this.showDialog = false;
    },
    closeSingleUserDialog() {
      this.showDialog = false;
    },
    closeUpdateUserDialog() {
      this.updatingUser = false;
    },
    closeDeleteDialog() {
      this.deletingUser = false;
    },
  },
};

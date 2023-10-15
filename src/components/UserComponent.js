import axios from "../service/axios";
import NavBarComponent from "./NavbarComponent.vue";
import CardComponent from "./CardComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";
import HeaderComponent from "./HeaderComponent.vue";
export default {
  name: "UserComponent",
  components: {
    NavBarComponent,
    CardComponent,
    PaginationComponent,
    HeaderComponent,
  },
  data() {
    return {
      name: "",
      job: "",
      page: 1,
      totalPages: 0,
      usersList: [],
      show: false,
      showCreateUserDialog: false,
      loading: false,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get(`/api/users?page=${this.page}`)
        .then((response) => {
          this.successCallback(response);
        })
        .catch((e) => {
          this.errorCallback(e);
        });
    },
    successCallback(response) {
      if (response.status === 200) {
        this.usersList = response.data.data;
        this.totalPages = response.data.total_pages;
      }
    },
    errorCallback(e) {
      //do nothing
    },
    closeCreateUserDialog() {
      this.showCreateUserDialog = false;
    },
    createUser() {
      const payload = {
        name: this.name,
        job: this.job,
      };
      this.loading = true;
      axios
        .post(`/api/user`, payload)
        .then((response) => {
          this.success(response);
        })
        .catch((e) => {
          this.error(e);
        });
    },
    success() {
      this.loading = false;
      this.showCreateUserDialog = false;
    },
    error(e) {
      //do nothing
    },
    changePage(page) {
      this.page = page;
      this.getUsers();
    },
  },
};

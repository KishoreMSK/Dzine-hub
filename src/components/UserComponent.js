import axios from 'axios'
import CardComponent from './CardComponent.vue'
import PaginationComponent from './PaginationComponent.vue'
import HeaderComponent from './HeaderComponent.vue'
export default {
    name: 'UserComponent',
    components:{
        CardComponent,
        PaginationComponent,
        HeaderComponent,
    },
    data() {
        return {
            name:'',
            job:'',
            page: 1,
            totalPages: 0,
            usersList: [],
            show: false,
            showCreateUserDialog: false,
            loading: false
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            axios.get(`https://reqres.in/api/users?page=${this.page}`)
                .then((response) => {
                    this.successCallback(response)
                })
                .catch((e) => {
                    this.errorCallback(e)
                })
        },
        successCallback(response){
            if(response.status === 200){
                this.usersList = response.data.data;
                this.totalPages = response.data.total_pages;
                // this.page = response.data.page
            }
            console.log(response);
        },
        errorCallback(e){
            if(e.response.status === 400){
                console.log(e.response.data);
            }
        },        
        closeCreateUserDialog(){
            this.showCreateUserDialog = false;
        },
        createUser(){
            const payload = {
                name: this.name,
                job: this.job
            }
            this.loading = true
            axios.post(`https://reqres.in/api/user}`,payload)
                .then((response) => {
                    this.success(response)
                })
                .catch((e) => {
                    this.error(e)
                })
        },
        success(res){
            this.loading = false
            this.showCreateUserDialog = false
            console.log('user created');
        },
        error(e){
            //do nothing
        },
        changePage(page){
            this.page = page;
            this.getUsers()
        }
    }
}
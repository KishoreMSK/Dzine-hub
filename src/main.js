import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css'
import router from './router/index'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

const vuetify = createVuetify({
    components,
    directives,
  })
  const options = {
    // You can set your default options here
};

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(Toast, options);
app.mount('#app')

// createApp(App).use(vuetify).use(router).mount('#app')

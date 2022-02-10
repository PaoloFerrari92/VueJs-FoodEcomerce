import { createApp } from 'vue';
import store from './store';

import App from './App.vue';
import router from './router';
import './assets/tailwind.css';


const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');


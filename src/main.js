import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import { emitter } from '@/helpers/eventBus';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(store);

app.use(router).mount('#app');

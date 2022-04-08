import { createApp } from 'vue';
import { data, message } from '@/data/data';
import alertFunc from './alertFunc';
import App from './App.vue';
import mitt from 'mitt';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.mount('#app');

alertFunc(data.message);
alertFunc(message);

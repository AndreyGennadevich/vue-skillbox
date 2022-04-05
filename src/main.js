import { createApp } from 'vue';
import { data, message } from '@/data/data';
import alertFunc from './alertFunc';
import App from './App.vue';

createApp(App).mount('#app');

alertFunc(data.message);
alertFunc(message);

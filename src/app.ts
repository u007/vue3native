import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';
const app = createApp(Home);

registerElement('MLKitView', () => require('@nativescript/mlkit-core').MLKitView);

app.start();

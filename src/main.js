import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';


import 'primeicons/primeicons.css';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToastService from 'primevue/toastservice';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';

/* --- CONFIGURACIÓN DE PINIA (STORE) ADEMAS DE LA PERSISTENCIA DE DATOS ---*/

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Aplicas el plugin de persistencia

const app = createApp(App);
app.use(PrimeVue); 
app.use(pinia); // Usas la misma instancia de Pinia con el plugin aplicado
app.use(router);

/* --- COMPONENTES DE PRIMEVUE 4.0 ---*/

app.component('Password', Password);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Paginator', Paginator);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('MultiSelect', MultiSelect);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);

app.use(ToastService);

app.mount('#app');
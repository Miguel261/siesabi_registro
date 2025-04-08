<template>
    <div class="mb-5">

        <div v-if="states" class="row">
            <div class="col-12 d-flex flex-column flex-md-row align-items-md-center justify-content-md-end">
                <!-- Dropdown - 12 columnas en móvil, 4 en desktop -->
                <MultiSelect v-model="selectedStates" filter :options="states" optionLabel="stateName" :panel="{
                    'font-size': '1.4rem'
                }" :multiple="true" :maxSelectedLabels="3" class="w-100 mb-3 mb-md-0 me-md-4 custom-state fuente"
                    placeholder="Selecciona el estado" :class="{ 'col-md-3': true }" v-on:change="handleChange()"
                    required />

                <!-- Buscador - Ocupa el espacio restante -->
                <div class="block p-input-icon-left w-90">
                    <i class="pi pi-search"></i>
                    <InputText class="fuente w-100" placeholder="Buscar..." v-model="filters['global'].value" />
                </div>
            </div>
        </div>

        <br>

        <DataTable :reorderableColumns="true" @rowReorder="onRowReorder" :value="cluesValues" dataKey="id"
            responsiveLayout="scroll" v-model:expandedRows="expandedRows" :paginator="true" :rows="20"
            :filters="filters">


            <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>

            <Column field="unityName" class="fuente" header="Nombre de la unidad" headerClass="column-header"
                bodyClass="column-body" headerStyle="width:20%;">
                <template #body="slotProps">
                    {{ slotProps.data.unityName }}
                </template>
            </Column>

            <Column field="value" class="fuente" header="Clues" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.value }}
                </template>
            </Column>

            <Column class="fuente" header="Entidad federativa" headerClass="column-header"
                bodyClass="column-body" headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ slotProps.data.stateName }}
                </template>
            </Column>

            <Column field="municipalityName" class="fuente" header="Nombre del municipio" headerClass="column-header"
                bodyClass="column-body" headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ slotProps.data.municipalityName }}
                </template>
            </Column>

            <Column class="fuente" header="Nombre de la localidad" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ slotProps.data.localityName }}
                </template>
            </Column>

            <Column field="institutionNode" class="fuente" header="Institución" headerClass="column-header"
                bodyClass="column-body" headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.institutionNode }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;

const states = ref(null);
const selectedStates = ref(null);
const cluesValues = ref(null);
const filters = ref({});

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}
onMounted(async () => {
    getState();
    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const getState = async () => {
    try {
        const response = await axios.post(`${url}/api/location/state`, {}, config);
        states.value = response.data;
    }
    catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al hacer la petición al servidor Codigo: ${error.status}`,
            life: 2000
        });
        console.log(error);
    }
};

const handleChange = () => {
    let arrayStates = []

    for (let state of selectedStates.value) {
        arrayStates.push(state.stateName);
    }

    getClues(arrayStates);
};


const getClues = async (clues) => {
    try {
        const response = await axios.post(`${url}/api/clue`,
            { stateNames: clues }, config);
        cluesValues.value = response.data;
    }
    catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al hacer la petición al servidor Codigo: ${error.status}`,
            life: 2000
        });
        console.log(error);
    }
};

</script>

<style>
.custom-state {
    height: 41px;
    border-radius: 10px;
    border: 2px solid gray !important;
    background-color: white !important;
}

.custom-state .p-multiselect-label-container {
    height: 41px;
    border-radius: 10px;
    border: none;
    background-color: transparent !important;
    font-size: 15px;
    text-align: left;
}

.custom-state .p-inputtext:focus {
    outline: none;
    box-shadow: none;
    border-color: gray;
}
</style>
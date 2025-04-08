<template>
    <div class="mb-5">
        <DataTable :reorderableColumns="true" @rowReorder="onRowReorder" :value="institutions" dataKey="id"
            responsiveLayout="scroll" v-model:expandedRows="expandedRows" :paginator="true" :rows="20"
            :filters="filters">

            <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>

            <Column field="unityName" class="fuente" header="Nombre de la institución" headerClass="column-header"
                bodyClass="column-body" headerStyle="width:20%;">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>

            <Column field="value" class="fuente" header="Codigo de la institución" headerClass="column-header"
                bodyClass="column-body" headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ slotProps.data.code }}
                </template>
            </Column>


            <Column class="fuente" header="Fecha de registro" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.created_at).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha de actualización" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.updated_at).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="No. de usuarios" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:6%;">
                <template #body="slotProps">
                    {{ slotProps.data.totalUsers }}
                </template>
            </Column>

            <Column class="fuente" header="Opciones" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    <Button icon="pi pi-cog" style="color: white; background-color: #a57f2c;
                    border-color: #a57f2c;" class="p-button-md p-button-rounded p-button custom-icon"
                        title="Opciones" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import moment from 'moment';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;

const institutions = ref(null);

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}
onMounted(async () => {
    getInstitutions();
});

const getInstitutions = async () =>{
    try{
        const response = await axios.get(`${url}/api/institution`, config);
        institutions.value = response.data.results;
    }
    catch(error){

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
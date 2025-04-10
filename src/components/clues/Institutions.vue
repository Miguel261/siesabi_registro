<template>
    <div class="mb-5">

        <div class="row">
            <div class="col-12 justify-content-right text-right">
                <Button style="height: 44px; color: white; background-color: #611232;"
                    class="col-md-1 col-sm-12  Button-manager custom-icon" @click="visible2 = true" label="Agregar"
                    icon="pi pi-plus" />
            </div>

        </div>

        <br><br>
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

            <Column field="value" class="fuente" header="Código de la institución" headerClass="column-header"
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
                    <Button icon="pi pi-pencil" style="color: white; background-color: #a57f2c;
                    border-color: #a57f2c;" class="p-button-md p-button-rounded p-button custom-icon" title="Editar"
                        v-on:click="OpenDialog(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="visible2" modal header="Agregar institución" :style="{ width: '70rem' }">
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Nombre de la institución</label>
                <br>
                <input type="text" v-model="formData.name" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Nombre corto</label>
                <br>
                <input type="text" v-model="formData.code" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <br>
            <div class="d-flex justify-content-center">
                <div class="row g-sm-3 g-md-0 col-12"> <!-- Gap solo en móvil (sm) -->
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"
                            class="Button-courses w-100"></Button>
                    </div>
                    <td class="td"><br></td>
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Guardar" @click="ConfirmAddInstitution"
                            class="Button-manager w-100"></Button>
                    </div>
                </div>
            </div>
            <br>
        </Dialog>

        <Dialog v-model:visible="visible" modal header="Actualizar institución" :style="{ width: '70rem' }">
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Nombre de la institución</label>
                <br>
                <input type="text" v-model="name" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Nombre corto</label>
                <br>
                <input type="text" v-model="code" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <br>
            <div class="d-flex justify-content-center">
                <div class="row g-sm-3 g-md-0 col-12"> <!-- Gap solo en móvil (sm) -->
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"
                            class="Button-courses w-100"></Button>
                    </div>
                    <td class="td"><br></td>
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Actualizar" @click="ConfirmSave"
                            class="Button-manager w-100"></Button>
                    </div>
                </div>
            </div>
            <br>
        </Dialog>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import moment from 'moment';
import Dialog from 'primevue/dialog';
import { MannagerError } from '@/errors/MannagerErros';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const visible = ref(false);
const visible2 = ref(false);
const url = import.meta.env.VITE_URL_HOST;
const institutions = ref(null);
const name = ref(null);
const code = ref(null);
const id = ref(null);

const formData = ref({
    name: '',
    code: ''
})

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}
onMounted(async () => {
    getInstitutions();
});

const getInstitutions = async () => {
    try {
        const response = await axios.get(`${url}/api/institution`, config);
        institutions.value = response.data.results;
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const OpenDialog = async (data) => {
    name.value = data.name;
    code.value = data.code;
    id.value = data.id;
    visible.value = true;
};

const ConfirmSave = async () => {
    const userConfirmation = await swal({
        title: "Actualizar institución",
        text: "¿Seguro deseas actualizar esta institución?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        UpdateInstitution();
    }
};

const UpdateInstitution = async () => {
    try {
        const response = await axios.put(`${url}/api/institution/${id.value}/update`,{
            name: name.value,
            code: code.value
        }, config);

        if(response.status == 200){
            toast.add({ severity: 'success', summary: 'Institución actualizada correctamente', life: 3000 });
            visible.value = false;
            getInstitutions();
        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const ConfirmAddInstitution = async () =>{
    const userConfirmation = await swal({
        title: "Agregar institución",
        text: "¿Seguro deseas agregar esta institución?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        AddInstitution()
    }
};

const AddInstitution = async () =>{
    try{
        const response = await axios.post(`${url}/api/institution/create`,{
            name: formData.value.name,
            code: formData.value.code
        }, config);

        if(response.status == 201){
            toast.add({ severity: 'success', summary: 'Institución creada correctamente', life: 3000 });
            visible2.value = false;
            getInstitutions();
        }
    }
    catch(error){
        MannagerError(error, router, authStore, toast);
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
<template>
    <div class="mb-5">

        <div class="row">
            <div class="col-12 justify-content-right text-right">
                <Button style="height: 44px; color: white; background-color: #611232;"
                    class="col-md-2 col-sm-12  Button-manager custom-icon" @click="ConfirmCredential()"
                    label="Agregar otra credencial" icon="pi pi-plus" />
            </div>

        </div>

        <br><br>

        <DataTable :value="keys" dataKey="id" responsiveLayout="scroll">
            <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>

            <Column class="fuente" header="Value" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:20%;">
                <template #body="slotProps">
                    {{ slotProps.data.value }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha de creación" headerClass="column-header" bodyClass="column-body"
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


            <Column class="fuente" header="Opciones" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <div style="display: flex; gap: 10px;">
                        <Button icon="pi pi-refresh"
                            style="color: white; background-color: #611232; border-color: #611232;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ConfirmRefresh(slotProps.data)" title="Opciones" />

                        <Button icon="pi pi-trash"
                            style="color: white; background-color: #a57f2c; border-color: #a57f2c;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ConfirmDeleteCredential(slotProps.data)" title="Opciones" />
                    </div>
                </template>
            </Column>

        </DataTable>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import moment from 'moment';
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;

const keys = ref(null);

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

onMounted(async () => {
    await getKeys();
});

const getKeys = async () => {
    try {
        const response = await axios.get(`${url}/api/credential`, config);
        keys.value = response.data;
    }
    catch (error) {
        console.error(error);
    }
};

const ConfirmCredential = async () => {
    const userConfirmation = await swal({
        title: "Creación de nueva credencial",
        text: "¿Seguro que deseas crear una nueva credencial?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        AddCredential();
    }
};

const AddCredential = async () => {
    try {
        const response = await axios.post(`${url}/api/credential/create`, {}, config);

        if (response.status === 201) {
            toast.add({ severity: 'success', summary: 'Credencial creada', life: 3000 });
            getKeys();
        }
    }
    catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error al crear credencial', life: 3000 });
    }
};

const ConfirmDeleteCredential = async (data) =>{
    const userConfirmation = await swal({
        title: "Eliminar credencial",
        text: "¿Seguro que deseas eliminar esta credencial?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        DeleteCredential(data);
    }
};

const DeleteCredential = async (credential) =>{
    try {
        const response = await axios.delete(`${url}/api/credential/${credential.id}`, config);

        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Credencial eliminada', life: 3000 });
            getKeys();
        }
    }
    catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error al eliminar credencial', life: 3000 });
    }
};

const ConfirmRefresh = async (data) =>{
    const userConfirmation = await swal({
        title: "Regenerar credencial",
        text: "¿Seguro que deseas regenerar esta credencial?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        RefreshCredential(data);
    }
};

const RefreshCredential = async (credential) =>{
    try {
        const response = await axios.put(`${url}/api/credential/${credential.id}/regenerate`, {}, config);

        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Credencial regenerada', life: 3000 });
            getKeys();
        }
    }
    catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error al regenerar credencial', life: 3000 });
    }
};

</script>

<style>
.td {
    display: none;
}

@media (min-width: 200px) and (max-width: 900px) {
    .td {
        display: block;
    }
}
</style>
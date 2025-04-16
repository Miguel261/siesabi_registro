<template>
    <div class="mb-5">

        <div class="row">
            <div class="col-12 justify-content-right text-right">
                <Button style="height: 44px; color: white; background-color: #611232;"
                    class="col-md-1 col-sm-12  Button-manager custom-icon" @click="ConfirmCredential()" label="Agregar"
                    icon="pi pi-plus" />
            </div>

        </div>

        <br><br>

        <DataTable :reorderableColumns="true" @rowReorder="onRowReorder" :value="directory" dataKey="id"
            responsiveLayout="scroll" v-model:expandedRows="expandedRows">

            <template #header>
                <div class="pb-2 d-flex gap-2 justify-content-between">
                    <div class="fs-3">
                        Directorio
                    </div>
                </div>
            </template>

            <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="true" />

            <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:15%;">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>

            <Column class="fuente" header="Nombre" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:35%;">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>

            <Column class="fuente" header="Orden" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ slotProps.data.order }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha de creación" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:20%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.created_at).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha de actualización" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:20%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.updated_at).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Acciones" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <div style="display: flex; gap: 10px;">
                        <Button icon="pi pi-arrow-down"
                            style="color: white; background-color: #611232; border-color: #611232;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ViewContent(slotProps.data)" title="Desplegar" />

                        <Button icon="pi pi-file-edit"
                            style="color: white; background-color: #a57f2c; border-color: #a57f2c;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ModalDirectory(slotProps.data)" title="Editar" />

                        <Button icon="pi pi-trash"
                            style="color: white; background-color: #161a1d; border-color: #161a1d;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ConfirmDelteDirectory(slotProps.data)" title="Eliminar" />

                    </div>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-3">
                    <h5 class="fuente">Detalles de Personas</h5>
                    <DataTable :value="people[slotProps.data.id] || []" responsiveLayout="scroll"
                        :reorderableRows="true" @rowReorder="(e) => onPeopleRowReorder(e, slotProps.data.id)"
                        dataKey="id">
                        <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="true" />
                        <Column class="fuente-table" headerClass="column-header" field="name" header="Nombre"></Column>
                        <Column class="fuente-table" field="position" header="Puesto"></Column>
                        <Column class="fuente-table" field="public_email" header="Email"></Column>
                        <Column class="fuente-table" field="order" header="Orden"></Column>
                        <Column class="fuente-table" header="Fecha creación">
                            <template #body="{ data }">
                                {{ moment(data.created_at).format('DD/MM/YYYY') }}
                            </template>
                        </Column>
                        <Column class="fuente-table" header="Fecha actualización">
                            <template #body="{ data }">
                                {{ moment(data.updated_at).format('DD/MM/YYYY') }}
                            </template>
                        </Column>
                        <Column class="fuente-table" header="Opciones" headerClass="column-header"
                            bodyClass="column-body">
                            <template #body="slotProps">
                                <div style="display: flex; gap: 10px;">
                                    <Button icon="pi pi-file-edit"
                                        style="color: white; background-color: #611232; border-color: #611232;"
                                        class="p-button-md p-button-rounded p-button custom-icon"
                                        @click="ModalPeople(slotProps.data)" title="Ver" />

                                    <Button icon="pi pi-trash"
                                        style="color: white; background-color: #a57f2c; border-color: #a57f2c;"
                                        class="p-button-md p-button-rounded p-button custom-icon"
                                        @click="ConfirmDeletePeople(slotProps.data)" title="Ver" />

                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>

        <Dialog v-model:visible="visible" modal header="Actualizar directorio" :style="{ width: '50rem' }">
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Nombre del directorio</label>
                <br>
                <input type="text" v-model="nameDirectory" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <div class="d-flex justify-content-center">
                <div class="row g-sm-3 g-md-0 col-12"> <!-- Gap solo en móvil (sm) -->
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"
                            class="Button-courses w-100"></Button>
                    </div>
                    <td class="td"><br></td>
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Actualizar" @click="ConfirmUpdateDirectory()"
                            class="Button-manager w-100"></Button>
                    </div>
                </div>
            </div>
            <br>
        </Dialog>

        <Dialog v-model:visible="visible2" modal header="Actualizar directorio" :style="{ width: '70rem' }">
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Nombre</label>
                <br>
                <input type="text" v-model="namePeople" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Puesto</label>
                <br>
                <input type="text" v-model="puestoPeople" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Email</label>
                <br>
                <input type="text" v-model="emailPeople" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <div class="d-flex justify-content-center">
                <div class="row g-sm-3 g-md-0 col-12"> <!-- Gap solo en móvil (sm) -->
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible2 = false"
                            class="Button-courses w-100"></Button>
                    </div>
                    <td class="td"><br></td>
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Actualizar" @click="ConfirmUpdatedPeople()"
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
import moment from 'moment';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import { MannagerError } from '@/errors/MannagerErros';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;
const directory = ref(null);
const people = ref(null);
const expandedRows = ref([]);
const visible = ref(false);
const visible2 = ref(false);

const nameDirectory = ref(null);
const idDirectory = ref(null);

const idPeople = ref(null);
const namePeople = ref(null);
const puestoPeople = ref(null);
const emailPeople = ref(null);
const dataPeople = ref(null);

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}
onMounted(async () => {
    await getDirectory();
});

const getDirectory = async () => {
    try {
        const response = await axios.get(`${url}/api/directory/all`, config);
        directory.value = response.data.results;
    }
    catch (error) {
        if (error.status == 401) {
            router.push('/login');
        }
    }
};

const onRowReorder = (event) => {
    directory.value = event.value.map((item, index) => ({
        ...item,
        order: index + 1
    }));

    updateOrderDirectory(directory.value);

};

const updateOrderDirectory = async (reorderDirectory) => {
    try {

        const faqs = reorderDirectory.map(x => ({
            id: x.id,
            order: x.order
        }));

        await axios.put(`${url}/api/directory/order`, { faqs }, config);

        toast.add({ severity: 'success', summary: 'Orden guardado', life: 3000 });
    } catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const onPeopleRowReorder = async (event, directoryId) => {
    try {
        const updatedPeople = event.value.map((item, index) => ({
            ...item,
            order: index + 1
        }));

        people.value = {
            ...people.value,
            [directoryId]: updatedPeople
        };

        await updateOrderPeople(updatedPeople, directoryId);

    } catch (error) {
        console.error("Error reordering people:", error);
    }
};

const updateOrderPeople = async (peopleList, directoryId) => {
    try {
        const payload = peopleList.map(person => ({
            id: person.id,
            order: person.order
        }));

        await axios.put(`${url}/api/directory/${directoryId}/people/order`,
            { faqs: payload },
            config
        );

        toast.add({
            severity: 'success',
            summary: 'Orden de personas guardado',
            life: 3000
        });
    } catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const ViewContent = async (data) => {
    try {
        const expanded = expandedRows.value;
        const isRowExpanded = expanded.some(row => row.id === data.id);

        if (isRowExpanded) {
            expandedRows.value = expanded.filter(row => row.id !== data.id);
            return;
        }

        const response = await axios.get(`${url}/api/directory/${data.id}`, config);

        people.value = {
            ...people.value,
            [data.id]: response.data.results
        };

        expandedRows.value = [...expanded, data];
    } catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const ModalDirectory = async (data) => {
    visible.value = true;
    nameDirectory.value = data.name;
    idDirectory.value = data.id
};

const ModalPeople = async (data) => {
    visible2.value = true;
    idPeople.value = data.id;
    namePeople.value = data.name;
    puestoPeople.value = data.position;
    emailPeople.value = data.public_email;
    dataPeople.value = data;
};

const ConfirmUpdateDirectory = async () => {
    const userConfirmation = await swal({
        title: "Actualizar directorio",
        text: "¿Seguro deseas actualizar el nombre de este directorio?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        if (nameDirectory.value != '' || nameDirectory.value != null) {
            UpdateDirectory()
        }
    }
};

const UpdateDirectory = async () => {
    try {
        const response = await axios.put(`${url}/api/directory/${idDirectory.value}/update`, {
            name: nameDirectory.value
        }, config);

        if (response.status == 200) {
            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: `El nombre del directorio fue actualizado con exito`,
                life: 2000
            });

            visible.value = false;
            getDirectory();
        }
    }
    catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al actualizar el nombre del directorio`,
            life: 2000
        });
    }
};

const ConfirmUpdatedPeople = async () => {
    const userConfirmation = await swal({
        title: "Actualizar persona",
        text: "¿Seguro deseas actualizar la información de esta persona?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        UpdatePeople()
    }
};

const UpdatePeople = async () => {
    try {

        const response = await axios.put(`${url}/api/directory/1/people/${idPeople.value}/update`, {
            name: namePeople.value,
            position: puestoPeople.value,
            email: emailPeople.value
        }, config);

        if (response.status == 200) {
            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: `Los datos de la persona fueron actualizados con exito`,
                life: 2000
            });

            visible2.value = false;
            window.location.reload();
        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const ConfirmDelteDirectory = async (data) => {
    const userConfirmation = await swal({
        title: "Eliminar directorio",
        text: "¿Seguro deseas eliminar este directorio?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        DeleteDirectory(data);
    }
};

const DeleteDirectory = async (data) =>{
    try {

        const response = await axios.delete(`${url}/api/directory/${data.id}`, config);

        if (response.status == 200) {
            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: `El directorio fue eliminado con exito`,
                life: 2000
            });

            visible2.value = false;
            getDirectory();
        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const ConfirmDeletePeople = async (data) => {
    const userConfirmation = await swal({
        title: "Eliminar persona",
        text: "¿Seguro deseas eliminar esta persona?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        DeletePeople(data);
    }
};

const DeletePeople = async (data) => {
    try {

        const response = await axios.delete(`${url}/api/directory/1/people/${data.id}`, config);

        if (response.status == 200) {
            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: `La persona fue eliminada con exito`,
                life: 2000
            });

            visible2.value = false;
            window.location.reload();
        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

</script>

<style>
.fuente-table {
    color: black;
    font-size: 13px;
    font-family: 'Noto Sans';
}

.td {
    display: none;
}

@media (min-width: 200px) and (max-width: 900px) {
    .td {
        display: block;
    }
}
</style>
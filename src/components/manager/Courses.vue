<template>
    <div class="mb-5">

        <div class="row">
            <div class="col-12 justify-content-right text-right">
                <Button style="height: 44px; color: white; background-color: #611232;"
                    class="col-md-1 col-sm-12  Button-manager custom-icon" @click="getCoursesMoodle()" label="Agregar"
                    icon="pi pi-plus" />
            </div>

        </div>

        <br><br>

        <DataTable :reorderableColumns="true" @rowReorder="onRowReorder" :value="course" dataKey="id"
            responsiveLayout="scroll" v-model:expandedRows="expandedRows">

            <template #header>
                <div class="pb-2 d-flex gap-2 justify-content-between">
                    <div class="fs-3">
                        Lista de cursos prioritarios
                    </div>
                </div>
            </template>

            <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="true" />

            <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>

            <Column class="fuente" header="Nombre" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:50%;">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>

            <Column class="fuente" header="Visible" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:10%;">
                <template #body="slotProps">
                    {{ slotProps.data.is_enabled ? 'Visible' : 'Oculto' }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha de creación" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:15%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.created_at).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha de actualización" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:15%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.updated_at).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Acciones" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <div style="display: flex; gap: 10px;">
                        <Button :icon="slotProps.data.is_enabled ? 'pi pi-eye-slash' : 'pi pi-eye'"
                            style="color: white; background-color: #611232; border-color: #611232;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ViewCourse(slotProps.data)"
                            :title="slotProps.data.is_enabled ? 'Ocultar' : 'Desplegar'" />

                        <Button icon="pi pi-trash"
                            style="color: white; background-color: #a57f2c; border-color: #a57f2c;"
                            class="p-button-md p-button-rounded p-button custom-icon"
                            @click="ConfirmDeleteCourse(slotProps.data)" title="Editar" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="visible" modal header="Lista de cursos de moodle" :style="{ width: '100rem', }">
            <DataTable :reorderableColumns="true" @rowReorder="onRowReorder" :value="courseMoodle" dataKey="id"
                responsiveLayout="scroll" v-model:expandedRows="expandedRows" :paginator="true" :rows="20"
                :filters="filters">

                <template #header>
                    <div class="pb-2 d-flex gap-2 justify-content-between">
                        <div class="block p-input-icon-left w-90">
                            <i class="pi pi-search"></i>
                            <InputText class="fuente w-100" placeholder="Buscar..." v-model="filters['global'].value" />
                        </div>
                    </div>
                </template>

                <Column field="id" class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:5%;">
                    <template #body="slotProps">
                        {{ slotProps.data.id }}
                    </template>
                </Column>

                <Column field="name" class="fuente" header="Nombre" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:50%;">
                    <template #body="slotProps">
                        {{ slotProps.data.name }}
                    </template>
                </Column>

                <Column class="fuente" header="Visible" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:10%;">
                    <template #body="slotProps">
                        {{ slotProps.data.visible ? 'Visible' : 'Oculto' }}
                    </template>
                </Column>

                <Column class="fuente" header="Fecha de creación" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:15%;">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.created_at).format('DD/MM/YYYY') }}
                    </template>
                </Column>

                <Column class="fuente" header="Fecha de actualización" headerClass="column-header"
                    bodyClass="column-body" headerStyle="width:15%;">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.updated_at).format('DD/MM/YYYY') }}
                    </template>
                </Column>

                <Column class="fuente" header="Acciones" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:5%;">
                    <template #body="slotProps">
                        <div style="display: flex; gap: 10px;">
                            <Button icon="pi pi-plus"
                                style="color: white; background-color: #611232; border-color: #611232;"
                                class="p-button-md p-button-rounded p-button custom-icon"
                                @click="ConfirmAddCurse(slotProps.data)" title="Agregar como curso prioritario" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </Dialog>


    </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import moment from 'moment';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import { MannagerError } from '@/errors/MannagerErros';
import InputText from 'primevue/inputtext';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;
const course = ref(null);
const courseMoodle = ref(null);
const expandedRows = ref([]);
const visible = ref(false);
const filters = ref({});

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}
onMounted(async () => {
    await getCourses();
    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const getCourses = async () => {
    try {
        const response = await axios.get(`${url}/api/course/all`, config);
        course.value = response.data.results;
    }
    catch (error) {
        if (error.status == 401) {
            router.push('/login');
        }
    }
};

const getCoursesMoodle = async () =>{
    try {
        const response = await axios.get(`${url}/api/course/from-moodle?limit=1000`, config);
        courseMoodle.value = response.data.results;
        visible.value = true;
    }
    catch (error) {
        if (error.status == 401) {
            router.push('/login');
        }
    }
};

const ConfirmAddCurse = async (data) =>{
    const userConfirmation = await swal({
        title: "Agregar este curso como prioritario",
        text: "¿Seguro deseas agregar este curso como prioritario?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        AddCourse(data);
    }
    else{
        visible.value = false
    }
};

const AddCourse  = async (data) =>{
    try {
        const response = await axios.post(`${url}/api/course/${data.id}/create`, {} ,config);
        visible.value = false;
        toast.add({ severity: 'success', summary: `${response.data.message}`, life: 3000 });
        await getCourses();
    }
    catch (error) {
        if(error.status == 409){
            toast.add({ severity: 'error', summary: `Este curso ya es prioritario`, life: 3000 });
        }
    }
};

const ViewCourse = async (curso) =>{
    try{
        if(curso.is_enabled === 1){
            const disable = await axios.put(`${url}/api/course/${curso.id}/disable`, {}, config);
            toast.add({ severity: 'success', summary: `${disable.data.message}`, life: 3000 });
            getCourses();
        }
        else{
            const enable = await axios.put(`${url}/api/course/${curso.id}/enable`, {}, config);
            toast.add({ severity: 'success', summary: `${enable.data.message}`, life: 3000 });
            getCourses();
        }
    }
    catch(error){
        MannagerError(error, router, authStore, toast);
    }
};

const ConfirmDeleteCourse = async (data) =>{
    const userConfirmation = await swal({
        title: "Eliminar este curso como prioritario",
        text: "¿Seguro deseas eliminar este curso como prioritario?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        DeleteCourse(data);
    }
};

const DeleteCourse = async (curso) =>{
    try{
        const response = await axios.delete(`${url}/api/course/${curso.id}`, config);
        toast.add({ severity: 'success', summary: `${response.data.message}`, life: 3000 });
        getCourses();
    }
    catch(error){
        MannagerError(error, router, authStore, toast);
    }
};

const onRowReorder = (event) => {
    course.value = event.value.map((item, index) => ({
        ...item,
        order: index + 1
    }));

    updateOrderInBackend(course.value);
};

const updateOrderInBackend = async (reorderedFaqs) => {
    try {

        const faqs = reorderedFaqs.map(faq => ({
            id: faq.id,
            order: faq.order
        }));

        await axios.put(`${url}/api/course/order`, { faqs }, config);

        toast.add({ severity: 'success', summary: 'Orden guardado', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error al guardar el orden', detail: error.message, life: 5000 });
        console.log(error)
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
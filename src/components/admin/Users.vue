<template>
    <div class="card col-12 col-lg-12 col-xl-12 usuarios" style="background-color: #f8f9fa;">
        <div style="margin-top:25px" class="row align-items-center">
            <!-- Título (h5) -->
            <div class="col-12 col-md-6 text-center text-md-left">
                <h5 class="fuente" style="font-weight: bold;">Buscar usuario de SiESABI </h5>
            </div>

            <!-- Contenedor del Input y el Botón -->
            <div class="col-12 col-md-6 mt-3 mt-md-0">
                <div
                    class="d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center gap-2">
                    <!-- Input (span) -->
                    <input type="email" v-model="email" class="col-md-5 col-sm-12 input-search fuente"
                        placeholder="Buscar por email" required>

                    <input type="text" v-model="curp" class="col-md-5 col-sm-12 input-search fuente"
                        placeholder="Buscar por curp" required>

                    <input type="text" v-model="name" class="col-md-5 col-sm-12 input-search fuente"
                        placeholder="Buscar por nombre" required>

                    <!-- Botón -->
                    <Button style="height: 44px; color: white; background-color: #611232;"
                        class="col-md-2 col-sm-12  Button-manager custom-icon" @click="searchUser()" label="Buscar"
                        icon="pi pi-search" />
                </div>
            </div>
        </div>
    </div>

    <div id="datatable" style="margin-top:20px; display: none;" class="card">
        <DataTable ref="dt" :value="usersSiesabi" dataKey="id" :filters="filters" responsiveLayout="scroll" :rows="25"
            showGridlines paginator>
            <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>
            <Column class="fuente" header="Nombre" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:16%;">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>

            <Column class="fuente" header="Email" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.email }}
                </template>
            </Column>

            <Column class="fuente" header="CURP" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.curp }}
                </template>
            </Column>

            <Column class="fuente" header="Datos personales" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.hasUserProfile ? 'Completados' : 'Incompletos' }}
                </template>
            </Column>

            <Column class="fuente" header="Datos laborales" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.hasLaboralProfile ? 'Completados' : 'Incompletos' }}
                </template>
            </Column>

            <Column class="fuente" header="Cuenta moodle" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <tag :class="{
                        'Existe': slotProps.data.hasAccountMoodle,
                        'No-existe': !slotProps.data.hasAccountMoodle
                    }">
                        {{ slotProps.data.hasAccountMoodle ? 'Existe' : 'No existe' }}
                    </tag>
                </template>
            </Column>

            <Column class="fuente" header="Estatus" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <tag :class="{
                        'Existe': !slotProps.data.hasAccountBanned,
                        'No-existe': slotProps.data.hasAccountBanned
                    }">
                        {{ slotProps.data.hasAccountBanned ? 'Baneado' : 'Activo' }}
                    </tag>
                </template>
            </Column>

            <Column class="fuente" header="Fecha de registro" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.createdAt).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Correo verificado" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.emailVerifiedAt ? moment(slotProps.data.emailVerifiedAt).format('DD/MM/YYYY')
                    : 'No verificado' }}
                </template>
            </Column>

            <Column class="fuente" header="Ultima actualización" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.updatedAt).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Opciones" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <Button icon="pi pi-cog" style="color: white; background-color: #611232; 
                    border-color: #611232;" class=" p-button p-button-rounded p-button"
                        @click="ViewBard(slotProps.data)" title="Ver modificaciones a este usuario" />
                </template>
            </Column>
        </DataTable>
    </div>

    <loading v-model:active="isLoading" :loader="null" :can-cancel="false" :on-cancel="onCancel"
        :is-full-page="fullPage">
        <div style="text-align: center;">
            <span class="loader"></span>
            <br>
            <br>
            <label class="fuente" for="" style="text-align: center;">Cargando...</label>
        </div>
    </loading>

    <br>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth';
import { handleGeneralError } from "@/errors/GeneralErrors";
import { useRouter } from 'vue-router';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import moment from 'moment';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();

const url = import.meta.env.VITE_URL_HOST;
const authStore = useAuthStore();

const isLoading = ref(false);
const usersSiesabi = ref(null);

const email = ref('');
const curp = ref('');
const name = ref('');


const searchUser = () => {
    if (email.value === '' && curp.value === '' && name.value === '') {
        showToast();
    }
    else{
        SearchUserSiesabi();
    }

};

const showToast = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingresa email, curp o nombre del usuario',
        life: 2000
    });
};

const showToastInfo = () => {
    toast.add({
        severity: 'info',
        summary: 'Información',
        detail: 'No se encontraron coincidencias',
        life: 2000
    });
};

const SearchUserSiesabi = async () => {
    try {
        
        isLoading.value = true;
        const response = await axios.get(`${url}/api/user/all?curp=${curp.value}&email=${email.value}&name=${name.value}&limit=3000`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            if (response.data.total === 0) {
                showToastInfo();
                isLoading.value = false;
            }
            else {
                toggleDataTableVisibility();
                usersSiesabi.value = response.data.results;
                isLoading.value = false;
                authStore.refreshTokenStore();
            }
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

const toggleDataTableVisibility = () => {
    const div = document.getElementById("datatable");
    if (div) {
        div.style.display = "block";
    }
};

</script>


<style>
.usuarios {
    height: 100px
}

.input-search {
    height: 45px;
    border-radius: 20px;
    border: 2px solid gray;
    background-color: #f8f9fa;
}



@media (min-width: 300px) and (max-width: 900px) {
    .usuarios {
        height: 280px;
    }
}
</style>
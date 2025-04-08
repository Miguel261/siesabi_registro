<template>
    <loading v-model:active="isLoading" :loader="null" :can-cancel="false" :on-cancel="onCancel"
        :is-full-page="fullPage">
        <div style="text-align: center;">
            <span class="loader"></span>
            <br>
            <br>
            <label class="fuente" for="" style="text-align: center;">Cargando...</label>
        </div>
    </loading>

    <div style="margin-top: 100px;" v-if="userData" class="container-fluid">
        <div class="grid">
            <div class="row justify-content-center">
                <div class="row col-md-8 col-sm-12 d-flex justify-content-between">
                    <Card style="background-color: #f9f9f9;" class="row col-5">
                        <template #content>
                            <div class="col-12 d-flex justify-content-center align-items-center">
                                <div class="col-12 text-left">
                                    <label style="font-size: 25px; font-weight: bold; color: gray;"
                                        class="fuente-titulo">
                                        Datos Personales
                                    </label>
                                </div>
                            </div>

                            <!-- Labels con iconos, cada uno en col-12 -->
                            <div class="col-12 mt-3">
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-user icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.curp }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-envelope icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.email }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-phone icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.profile.phone }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-info-circle icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.profile.genderName }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-verified icon-user"></i>
                                    <label class="label-user">
                                        Correo: {{ userData.emailVerifiedAt ? 'Verificado' : 'No verificado' }}
                                    </label>
                                </div>

                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-calendar icon-user"></i>
                                    <label class="label-user">
                                        Cuenta creada el: {{ moment(userData.createdAt).format('DD/MM/YYYY') }}
                                    </label>
                                </div>
                            </div>
                        </template>
                    </Card>

                    <!-- Cuarta Card (ocupa 7 columnas) -->
                    <Card style="background-color: #f9f9f9;" class="row col-7">
                        <template #content>
                            <!-- Contenedor para el título y el botón -->
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <div class="text-left">
                                    <label style="font-size: 25px; font-weight: bold; color: gray;"
                                        class="fuente-titulo">
                                        Datos Laborales
                                    </label>
                                </div>
                            </div>

                            <!-- Labels con iconos, cada uno en col-12 -->
                            <div class="col-12 mt-3">
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-id-card icon-user"></i>
                                    <label class="label-user">
                                        Cédula Profesional: {{ userData.laboral.cedule }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-key icon-user"></i>
                                    <label class="label-user">
                                        CLUES: {{ userData.laboral.clues || userData.laboral.otherClues }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-heart icon-user"></i>
                                    <label class="label-user">
                                        Unidad: {{ userData.laboral.unityName || 'Sin unidad' }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-sitemap icon-user"></i>
                                    <label class="label-user">
                                        Nivel de Atención: {{ userData.laboral.attentionLevelName || 'No aplica' }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-info-circle icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.laboral.institutionName || userData.laboral.otherInstitution }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-thumbtack icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.laboral.stateName }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-building icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.laboral.municipalityName }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-tag icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.laboral.laboralAreaName }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-building-columns icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.laboral.laboralCategoryName }}
                                    </label>
                                </div>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { userStore } from "@/stores/user";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import moment from 'moment';

const isLoading = ref(false);

onMounted(() => {
    isLoading.value = true;
    getInformationUser();
});

const url = import.meta.env.VITE_URL_HOST;

const authStore = useAuthStore();
const userDataStore = userStore();
const router = useRouter();

const userData = ref(null);

const getInformationUser = async () => {
    try {
        const response = await axios.get(`${url}/api/user/${userDataStore.getID}`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        isLoading.value = false;
        userData.value = response.data;
    }
    catch (error) {
        isLoading.value = false;
        console.log(error);
        if (error.status === 403) {
            router.push(error.response.data.section);
        }

        if (error.status === 401) {
            router.push('/login')
        }
    }
};

</script>

<style></style>
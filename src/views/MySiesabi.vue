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

    <div style="margin-top: 50px;" v-if="userData" class="container-fluid">
        <div class="grid">
            <div class="row justify-content-center">
                <!-- Primera Card (ocupa 8 columnas) -->
                <Card class="col-md-8 col-sm-12 carta justify-content-center">
                    <template #content>
                        <div class="col-12 d-flex justify-content-center align-items-center">
                            <div class="col-10 d-flex justify-content-between align-items-center">
                                <!-- Contenedor para la imagen y los labels -->
                                <div class="d-flex align-items-center">
                                    <!-- Imagen en forma de círculo -->
                                    <img class="avatar"
                                        src="https://educacion.imssbienestar.gob.mx/images/logos/mi_siesabi.png?id=4e901e4be2631289ad87d17c063293bf"
                                        alt="Imagen de bienvenida">

                                    <hr style="border: none; border-left: 2.5px solid hsla(200, 10%, 50%,100);
                                    height: 150px; width: 20px;">


                                    <!-- Contenedor para los labels (uno debajo del otro) -->
                                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                                        <label style="color: gray; font-size: 43px;" class="fuente-titulo">
                                            {{ genero }}
                                        </label>
                                        <label style="color: black; font-size: 20px; font-weight: bold;" class="fuente">
                                            {{ userData.name }}
                                        </label>
                                    </div>
                                </div>

                                <!-- Contenedor para los botones (alineados a la parte inferior de la imagen) -->
                                <div class="d-flex align-self: flex-end;">
                                    <Button class="col-5 fuente Button-manager custom-icon" v-on:click="ViewManager"
                                        label="Manager" icon="pi pi-crown" />
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <Button class="col-7 fuente Button-courses custom-icon" label="Ir a los cursos"
                                        icon="pi pi-sign-in" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>

                <td><br></td>

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
                                <!-- Botón pegado a la derecha -->
                                <Button label="Editar mi información" icon="pi pi-cog"
                                    class="Button-config custom-icon .pi" />
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

    <br><br>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { handleGeneralError } from "@/errors/GeneralErrors";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import moment from 'moment';

const isLoading = ref(false);

onMounted(() => {
    isLoading.value = true;
    getInformationUser();
    authStore.refreshTokenStore();
});

const url = import.meta.env.VITE_URL_HOST;

const authStore = useAuthStore();
const router = useRouter();

const userData = ref(null);
const genero = ref(null);

const getInformationUser = async () => {
    try {
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            userData.value = response.data;
            if (response.data.profile.genderName == "Hombre") {
                genero.value = "Bienvenido"
            }

            else if (response.data.profile.genderName == 'Mujer') {
                genero.value = "Bienvenida"
            }
            else {
                genero.value = "Bienvenid@"
            }



            isLoading.value = false;
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

const ViewManager = () => {
    router.push('/manager');
}


</script>

<style>
.carta {
    margin-top: 50px;
    text-align: center;
    background-image: url('/images/Mesa de trabajo 3.svg');
    background-position: center;
    width: 100%;
    background-size: cover;
}

.avatar {
    width: 180px;
    height: 40px;
    margin-right: 20px;
}

.mi-siesabi {
    width: 130px;
}

.Button-manager {
    height: 50px;
    border-radius: 15px;
    font-size: 14px;
    font-family: 'Noto Sans';
    font-weight: bold;
    color: #611232 !important;
    border: 2px solid #611232 !important;
    background-color: white !important;
    transition: all 0.3s ease;
}

.Button-manager:hover {
    color: white !important;
    background-color: #611232 !important;
    border: 2px solid #611232 !important;
}

.Button-courses {
    height: 50px;
    border-radius: 15px;
    background-color: white !important;
    font-size: 15px;
    color: #a57f2c;
    font-family: 'Noto Sans';
    transition: all 0.3s ease;
    font-weight: bold;
    border: 2px solid #a57f2c !important;
}

.Button-courses:hover {
    color: white !important;
    background-color: #a57f2c !important;
    border: 2px solid #a57f2c !important;
}

.background-container {
    background-image: url('/images/Flores degradado.png');
    background-position: center;
    background-size: cover;
    height: 80px;
}

.custom-icon .pi {
    font-size: 1.6rem;
}

.Button-config {
    height: 50px;
    border-radius: 15px;
    font-size: 14px;
    font-family: 'Noto Sans';
    font-weight: bold;
    color: #98989A !important;
    border: 2px solid #98989A !important;
    background-color: white !important;
    transition: all 0.3s ease;
}

.Button-config:hover {
    color: white !important;
    background-color: #98989A !important;
    border: 2px solid #98989A !important;
}

.label-user {
    font-size: 14px;
    color: black;
    margin-left: 0.5rem;
}

.icon-user {
    font-size: 1.6rem;
    color: black;
}

/* Media query para pantallas pequeñas */
@media (min-width: 300px) and (max-width: 900px) {
    .img-siesabi {
        display: none;
    }

    .contenedor-home {
        height: 100px;
    }
}
</style>
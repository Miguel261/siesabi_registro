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
                <!-- Primera Card (ocupa 8 columnas) -->

                <div class="row col-md-11 col-sm-12 d-flex justify-content-between">
                    <Card style="background-color: #f9f9f9;" class="row col-5">
                        <template #content>
                            <div class="col-12 d-flex justify-content-center align-items-center">
                                <div class="col-12 text-left">
                                    <label style="font-size: 25px; font-weight: bold; color: gray;"
                                        class="fuente-titulo">
                                        Perfil del usuario
                                    </label>
                                </div>
                            </div>

                            <!-- Labels con iconos, cada uno en col-12 -->
                            <div class="col-12 mt-3">
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-user icon-user"></i>
                                    <label class="label-user">
                                        {{ userData.name }}
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-hashtag icon-user"></i>
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

                    <!-- Cuarta Card (ocupa 7 columnas) -->
                    <Card style="background-color: #f9f9f9;" class="row col-7">
                        <template #content>
                            <!-- Contenedor para el título y el botón -->
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <div class="text-left">
                                    <label style="font-size: 25px; font-weight: bold; color: gray;"
                                        class="fuente-titulo">
                                        Permisos del usuario
                                    </label>
                                </div>
                            </div>

                            <div class="col-12 mt-3">

                                <label class="fuente" for="size_normal">CIFRAS</label>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.cifras" :binary="true" class="mr-4" />
                                    <label for="size_normal">Aceso a CIFRAS</label>
                                </div>

                                <hr style="background-color: black;">

                                <label class="fuente" for="size_normal">Manager</label>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.userMagger" :binary="true" class="mr-4" />
                                    <label for="size_normal">Usuarios</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.crateUser" :binary="true" class="mr-4" />
                                    <label for="size_normal">Crear usuarios</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.video" :binary="true" class="mr-4" />
                                    <label for="size_normal">Video en vivo</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.banners" :binary="true" class="mr-4" />
                                    <label for="size_normal">Banners</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editFaq" :binary="true" class="mr-4" />
                                    <label for="size_normal">Editar preguntas frecuentes (FAQ)</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editOferta" :binary="true" class="mr-4" />
                                    <label for="size_normal">Editar oferta educativa</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editAviso" :binary="true" class="mr-4" />
                                    <label for="size_normal">Editar aviso de privacidad</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editClues" :binary="true" class="mr-4" />
                                    <label for="size_normal">Editar CLUES</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.apiKey" :binary="true" class="mr-4" />
                                    <label for="size_normal">Generar/Editar API KEY</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editDirectorio  " :binary="true" class="mr-4" />
                                    <label for="size_normal">Editar directorio</label>
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
import { userStore } from "@/stores/user";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Checkbox from 'primevue/checkbox'

const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await getPermissions();
    await getInformationUser();
    authStore.refreshTokenStore();
});

const url = import.meta.env.VITE_URL_HOST;

const authStore = useAuthStore();
const userDataStore = userStore();
const router = useRouter();

const userData = ref(null);
const permissions = ref([]);

const userPermissions = ref({
    cifras: false,
    userMagger: false,
    crateUser: false,
    video: false,
    banners: false,
    editFaq: false,
    editOferta: false,
    editAviso: false,
    editClues: false,
    apiKey: false,
    editDirectorio: false,
});

const getPermissions = async () => {
    try {
        const response = await axios.get(`${url}/api/common/roles-and-permissions`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        permissions.value = response.data.permissions;
    }
    catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            router.push('/login')
        }
    }
};

const getInformationUser = async () => {
    try {
        const response = await axios.get(`${url}/api/user/${userDataStore.getID}`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        isLoading.value = false;
        userData.value = response.data;
        const userPermisos = userData.value.permissions;

        // Comparar permisos del usuario con los permisos disponibles
        permissions.value.forEach(permission => {
            if (userPermisos.includes(permission.name)) {
                switch (permission.name) {
                    case 'access-to-cifras':
                        userPermissions.value.cifras = true;
                        break;
                    case 'manager-users':
                        userPermissions.value.userMagger = true;
                        break;
                    case 'manager-users-create':
                        userPermissions.value.crateUser = true;
                        break;
                    case 'manager-live-video':
                        userPermissions.value.video = true;
                        break;
                    case 'manager-banners':
                        userPermissions.value.banners = true;
                        break;
                    case 'faq-edit':
                        userPermissions.value.editFaq = true;
                        break;
                    case 'manager-educatival-offer':
                        userPermissions.value.editOferta = true;
                        break;
                    case 'manager-private-notice':
                        userPermissions.value.editAviso = true;
                        break;
                    case 'manager-clues':
                        userPermissions.value.editClues = true;
                        break;
                    case 'manager-api-key':
                        userPermissions.value.apiKey = true;
                        break;
                    case 'manager-directory':
                        userPermissions.value.editDirectorio = true;
                        break;
                    default:
                        break;
                }
            }
        });
    }
    catch (error) {
        isLoading.value = false;
        console.log(error);
        if (error.response && error.response.status === 403) {
            router.push(error.response.data.section);
        }

        if (error.response && error.response.status === 401) {
            router.push('/login')
        }
    }
};

</script>

<style></style>
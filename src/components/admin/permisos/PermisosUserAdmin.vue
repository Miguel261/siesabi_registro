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
                                    <Checkbox v-model="userPermissions.cifras" :binary="true" class="mr-4"
                                        v-on:change="UpdatePermission(2, userPermissions.cifras)" />
                                    <label for="size_normal">Aceso a CIFRAS</label>
                                </div>

                                <hr style="background-color: black;">

                                <label class="fuente" for="size_normal">Manager</label>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.userMagger"
                                        v-on:change="UpdatePermission(8, userPermissions.userMagger)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Usuarios</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.crateUser"
                                        v-on:change="UpdatePermission(9, userPermissions.crateUser)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Crear usuarios</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.video"
                                        v-on:change="UpdatePermission(11, userPermissions.video)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Video en vivo</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.banners"
                                        v-on:change="UpdatePermission(12, userPermissions.banners)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Banners</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editFaq"
                                        v-on:change="UpdatePermission(7, userPermissions.editFaq)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Editar preguntas frecuentes (FAQ)</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editOferta"
                                        v-on:change="UpdatePermission(25, userPermissions.editOferta)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Editar oferta educativa</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editAviso"
                                        v-on:change="UpdatePermission(26, userPermissions.editAviso)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Editar aviso de privacidad</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editClues"
                                        v-on:change="UpdatePermission(28, userPermissions.editClues)" :binary="true"
                                        class="mr-4" />
                                    <label for="size_normal">Editar CLUES</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.editDirectorio"
                                        v-on:change="UpdatePermission(30, userPermissions.editDirectorio)"
                                        :binary="true" class="mr-4" />
                                    <label for="size_normal">Editar directorio</label>
                                </div>

                                <div class="fuente justify-content-center">
                                    <Checkbox v-model="userPermissions.coursesPriority"
                                        v-on:change="UpdatePermission(27, userPermissions.coursesPriority)"
                                        :binary="true" class="mr-4" />
                                    <label for="size_normal">Cursos prioritarios</label>
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
import { useToast } from "primevue/usetoast";
import { MannagerError } from '@/errors/MannagerErros';

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
const toast = useToast();

const userData = ref(null);
const permissions = ref([]);

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

const UpdatePermission = async (id, value) => {
    try {
        if (value == true) {
            const give = await axios.post(`${url}/api/user/give-permission-to`, {
                user_id: parseInt(userData.value.id),
                permission_id: parseInt(id)
            }, config);

            toast.add({ severity: 'success', summary: `${give.data.message}`, life: 3000 });

        }
        else {
            const revoke = await axios.post(`${url}/api/user/revoke-permission`, {
                user_id: parseInt(userData.value.id),
                permission_id: parseInt(id)
            }, config);

            toast.add({ severity: 'success', summary: `${revoke.data.message}`, life: 3000 });

        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
}


const userPermissions = ref({
    cifras: null,
    userMagger: null,
    crateUser: null,
    video: null,
    banners: null,
    editFaq: null,
    editOferta: null,
    editAviso: null,
    editClues: null,
    editDirectorio: null,
    coursesPriority: null
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
                    case 'manager-priority-course':
                        userPermissions.value.coursesPriority = true;
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
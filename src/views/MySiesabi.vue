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
                            <div
                                class="col-11 d-flex justify-content-between align-items-center flex-column flex-sm-row">
                                <!-- Contenedor para la imagen y los labels -->
                                <div class="d-flex align-items-center">
                                    <!-- Imagen en forma de círculo -->
                                    <img class="avatar d-none d-sm-block"
                                        src="https://educacion.imssbienestar.gob.mx/images/logos/mi_siesabi.png?id=4e901e4be2631289ad87d17c063293bf"
                                        alt="Imagen de bienvenida">

                                    <hr class="linea d-none d-sm-block" style="border: none; border-left: 2.5px solid hsla(200, 10%, 50%,100);
                    height: 150px; width: 20px;">

                                    <!-- Contenedor para los labels (uno debajo del otro) -->
                                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                                        <label style="color: gray; font-size: 43px;" class="fuente-titulo">
                                            {{ genero }}
                                        </label>
                                        <label style="color: black; font-size: 19px; font-weight: bold;" class="fuente">
                                            {{ userData.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="d-flex flex-wrap justify-content-center justify-content-md-end align-items-center 
                            w-100 mt-3 gap-2">
                            <div v-if="manager == true">
                                <Button class="fuente Button-manager custom-icon flex-grow-0 w-sm-100 w-md-auto"
                                    v-on:click="ViewManager" label="Manager" icon="pi pi-crown" />
                            </div>

                            <div>
                                <Button class="fuente Button-courses custom-icon flex-grow-0 w-sm-100 w-md-auto"
                                    label="Ir a los cursos" icon="pi pi-sign-in" v-on:click="visible = true" />
                            </div>
                        </div>
                    </template>
                </Card>
                <td><br></td>

                <div class="row col-md-12 col-sm-12 col-lg-8 d-flex user-information">
                    <Card style="background-color: #f9f9f9;" class="row col-sm-12  col-lg-5">
                        <template #content>
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <div class="text-left">
                                    <label style="font-size: 25px; font-weight: bold; color: #10312b;"
                                        class="fuente-titulo">
                                        Datos Personales
                                    </label>
                                </div>
                                <!-- Botón pegado a la derecha -->
                                <Button v-on:click="ViewOptions" icon="pi pi-cog"
                                    class="Button-config custom-icon1" />
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
                                    <i class="pi pi-envelope icon-user correo-i"></i>
                                    <label class="label-user correo">
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
                                        Correo:
                                        <span :class="userData.emailVerifiedAt ? 'text-success' : 'text-danger'">
                                            {{ userData.emailVerifiedAt ? 'Verificado ✔' : 'No verificado ❌' }}
                                        </span>
                                        <span v-if="!userData.emailVerifiedAt">
                                            - <a v-on:click="Verificar()" class="text-primary text-decoration-underline"
                                                style="cursor: pointer;">
                                                verifica aquí</a>
                                        </span>
                                    </label>
                                </div>
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-calendar icon-user"></i>
                                    <label class="label-user">
                                        Cuenta creada el: {{ moment(userData.createdAt).format('DD/MM/YYYY') }}
                                    </label>
                                </div>

                                <div class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-download icon-user"></i>
                                    <label class="label-user">
                                        <span>
                                            <a v-on:click="DownloadCosntancia()"
                                                style="color: blue; text-decoration: underline; cursor: pointer;">
                                                Descarga tu constancia de registro aquí</a>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </template>
                    </Card>

                    <td class="separacion"><br></td>

                    <!-- Cuarta Card (ocupa 7 columnas) -->
                    <Card style="background-color: #f9f9f9;" class="row col-sm-12 col-lg-7">
                        <template #content>
                            <!-- Contenedor para el título y el botón -->
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <div class="text-left">
                                    <label style="font-size: 25px; font-weight: bold; color: #10312b;"
                                        class="fuente-titulo">
                                        Datos Laborales
                                    </label>
                                </div>
                                <!-- Botón pegado a la derecha -->
                                <Button v-on:click="ViewLaboralProfiles" icon="pi pi-cog"
                                    class="Button-config custom-icon1" />
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


    <Dialog v-model:visible="visible" modal header="Iniciar sesión a los cursos" :style="{ width: '40rem' }">
        <form :action="moodle" method="POST">
            <div class="flex align-items-center gap-3 mb-3">
                <input type="hidden" v-model="email" name="username" class="col-md-12 col-sm-12 input-search fuente"
                    required>
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label class="fuente w-6rem">Contraseña:</label>
                <br>
                <input type="password" name="password" class="col-md-12 col-sm-12 input-search fuente" required>
            </div>

            <br>
            <div class="d-flex justify-content-center">
                <div class="row g-sm-3 g-md-0 col-12">
                    <div class="col-md-6 col-sm-6">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"
                            class="Button-courses w-100"></Button>
                    </div>
                    <td class="td"><br></td>
                    <div class="col-md-6 col-sm-6">
                        <Button type="submit" label="Iniciar Sesión" class="Button-manager w-100"></Button>
                    </div>
                </div>
            </div>
        </form>
        <br>
    </Dialog>

    <br><br>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import moment from 'moment';
import swal from 'sweetalert';
import { useToast } from "primevue/usetoast";

const isLoading = ref(false);
const toast = useToast();

onMounted(async () => {
    await getPermissions();
    await authStore.refreshTokenStore();
    isLoading.value = true;
    await getInformationUser();

    if (route.query.errorcode) {
        showErrorAlert(route.query.errorcode);
    }
});

const showErrorAlert = (errorCode) => {
    let errorMessage = '';

    switch (errorCode) {
        case '3':
            errorMessage = 'Contraseña incorrecta.';
            break;
        case '4':
            errorMessage = 'Tiempo expirado, vuelve a ingresar tu usuario y contraseña en el botón de Ir a cursos.';
            break;
        default:
            errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    }

    swal({
        icon: 'error',
        title: 'Error al acceder a los cursos',
        text: errorMessage,
        confirmButtonText: 'Entendido'
    });
    
    router.replace({ query: {} });
}

const url = import.meta.env.VITE_URL_HOST;
const moodle = import.meta.env.VITE_URL_MOODLE;

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const userData = ref(null);
const genero = ref(null);
const permissions = ref(null);
const manager = ref(false);
const email = ref(null);
const visible = ref(false);

const Verificar = async () =>{
    try{
        isLoading.value = true;
        const response = await axios.put(`${url}/api/user/verify-email`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if(response.status === 200){
            swal("Se envio correctamente un correo con la verificación, revisa tu bandeja de entrada!", {
                icon: "success",
                title: "Éxito!",
                buttons: "Ok"
            });
        }

        isLoading.value = false;
    }
    catch(error){
        isLoading.value = false;
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al mandar el correo de verificación`,
            life: 2000
        });
    }
};

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
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            userData.value = response.data;
            email.value = response.data.email;
            const userPermisos = userData.value.permissions;

            permissions.value.forEach(permission => {
                if (userPermisos.includes(permission.name)) {
                    switch (permission.name) {
                        case 'manager-users':
                            manager.value = true;
                            break;
                        case 'manager-users-create':
                            manager.value = true;
                            break;
                        case 'manager-live-video':
                            manager.value = true;
                            break;
                        case 'manager-banners':
                            manager.value = true;
                            break;
                        case 'faq-edit':
                            manager.value = true;
                            break;
                        case 'manager-educatival-offer':
                            manager.value = true;
                            break;
                        case 'manager-private-notice':
                            manager.value = true;
                            break;
                        case 'manager-clues':
                            manager.value = true;
                            break;
                        case 'manager-api-key':
                            manager.value = true;
                            break;
                        case 'manager-directory':
                            manager.value = true;
                            break;
                        case 'manager-priority-course':
                            manager.value = true;
                            break;
                    }
                }
            });

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
        console.log(error);
        if (error.status === 403) {
            router.push(error.response.data.section);
        }

        if (error.status === 401) {
            router.push('/login')
        }
    }
};

const ViewManager = () => {
    router.push('/manager');
};

const ViewOptions = () => {
    router.push('/user/ajustes');
};

const ViewLaboralProfiles = () => {
    router.push('/user/laboral-profiles');
};

const DownloadCosntancia = async () =>{
    try{
        const response = await axios.post(`${url}/api/register/success`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            },
            responseType: 'blob'
        });

        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', 'constancia_de_registro.pdf'); 
        document.body.appendChild(link);
        link.click();

   
        document.body.removeChild(link);
        window.URL.revokeObjectURL(urlBlob)
    }
    catch(error){
        if (
            error.response &&
            error.response.data instanceof Blob &&
            error.response.data.type === 'application/json'
        ) {
            const text = await error.response.data.text();
            const json = JSON.parse(text);
            console.error('Mensaje del servidor:', json.message);

            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `${json.message}`,
                life: 2000
            });

        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `${error}`,
                life: 2000
            });

        }
    }
};

</script>

<style>
.user-information {
    justify-content: space-between;
}

.separacion {
    display: none;
}

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
    color: #a57f2c !important;
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
    font-size: 1.5rem;
}

.custom-icon1 .pi {
    font-size: 1.6rem;
    position: relative;
    left: 1.5px;
}

.Button-config {
    height: 30px;
    border-radius: 15px;
    color: #98989A !important;
    border: 2px solid #98989A !important;
    background-color: white !important;
    transition: all 0.3s ease;
}

.Button-config.custom-icon1 {
    display: flex;
    justify-content: center;
    align-items: center;
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

    .avatar {
        display: none;
    }

    .linea {
        display: none;
    }

    .user-information {
        justify-content: center;
    }

    .separacion {
        display: block;
    }
}

@media (min-width: 900px) and (max-width: 1200px) {
    .correo {
        display: none !important;
    }

    /* Opcional: si quieres que el icono también ocupe menos espacio */
    .correo-i {
        display: none !important;
    }
}
</style>
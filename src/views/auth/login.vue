<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="contenedor-login col-sm-11 col-md-9">
                <div class="row h-100">
                    <!-- Columna izquierda para la imagen -->
                    <div class="col-md-6 justify-content-center align-items-center img-gif">
                        <img src="/images/Compu Inicio SiESABI Plus.svg" alt="Imagen" class="img-fluid">
                    </div>
                    <!-- Columna derecha para los inputs -->
                    <div
                        class="col-md-6 col-sm-12 d-flex justify-content-center align-items-center contenedor-componentes">
                        <form id="demo-form" @submit.prevent="validateForm" class="w-75">
                            <label class="fuente-titulo" for="">Iniciar Sesión</label>

                            <br><br>

                            <label class="fuente-label" for="">Correo electrónico</label>
                            <input v-model="formData.username" type="email" class="col-12 input-log fuente"
                                placeholder="Ingresa tu correo electrónico" required>

                            <br><br>

                            <label class="fuente-label" for="">Contraseña</label>
                            <Password v-model="formData.password" placeholder="Password" :toggle-mask="true"
                                class="w-full mb-3" inputClass="w-full" :feedback="false">
                            </Password>

                            <br><br><br>

                            <button type="submit" class="button-log col-12">Acceder</button>

                            <br><br>

                            <div class="text-right">
                                <a style="font-size: 14px;" href="">
                                    <label for="">¿Olvidaste tu contraseña?</label>
                                </a>
                            </div>

                            <div class="text-center">
                                <label class="fuente-label" for="">¿Nuevo en la plataforma?</label>

                                <button v-on:click="Registerview" class="button-sin-color col-8">Crear cuenta
                                    aquí</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
    </div>
    <br><br>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useToast } from "primevue/usetoast";
import swal from 'sweetalert';
import Password from 'primevue/password';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;
const isLoading = ref(false);

const formData = ref({
    username: '',
    password: '',
});

const Registerview = () => {
    router.push('/register');
};

const recaptchaToken = ref('');

function validateForm() {
    grecaptcha.ready(() => {
        grecaptcha
            .execute('6Lf8ENMqAAAAABXACnyT-f2lsh2Go_EuXkjNwLCf', { action: 'submit' })
            .then((token) => {
                recaptchaToken.value = token;
                submitForm();
            });
    });
}

function submitForm() {
    isLoading.value = true
    axios.post(`${url}/api/auth/sign_in`, {
        username: formData.value.username,
        password: formData.value.password
        //recaptchaToken: recaptchaToken.value,
    })
        .then((response) => {
            authStore.setTokens(response.data.accessToken, response.data.refreshToken, response.data.roles[0], 
            response.data.permissions);
            isLoading.value = false;

            if (response.data.roles[0] === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        })
        .catch((error) => {
            isLoading.value = false;
            if (error.status === 401){
                showErrorEmail();
                return;
            }

            if (error.status === 404) {
                showErrorCredentials();
                return;
            }

            swal("Error!", "Error del servidor! Intenta nuevamente más tarde.", "error");
        });
}

onMounted(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_URL_RECAPCHA;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
});

const showErrorEmail = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Credenciales incorrectas`,
        life: 3000
    });
};

const showErrorCredentials = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Las credenciales no existen en nuestros registros`,
        life: 3000
    });
};
</script>

<style>
.contenedor-login {
    margin-top: 100px;
    background-color: #f1f1f1;
    height: 650px;
    border-radius: 20px;
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
}

.img-fluid {
    width: 650px;
    height: auto;
    position: relative;
    top: 40px;
}

.img-gif {
    background-image: url('/images/rojos pt2.svg');
    background-size: 100%;
    background-position: cover;
    background-repeat: repeat;
    animation: moverFondo 30s linear infinite;
    box-shadow: 5px 7px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08);
}

@keyframes moverFondo {
    100% {
        background-position: center top;
    }

    0% {
        background-position: center bottom;
    }
}

.fuente-titulo {
    font-size: clamp(60px, 2vw, 10px);
    font-family: 'Patria';
    font-weight: bold;
    margin-top: 3px;
}

.fuente-label {
    color: black;
    font-size: 20px;
    font-family: 'Noto Sans';
    margin-top: 3px;
    font-weight: bold;
}

.input-log {
    height: 50px;
    border-radius: 20px;
    border: 2px solid black;
}

.button-log {
    height: 50px;
    border-radius: 15px;
    background-color: #611232;
    color: white;
    border: 2px solid black;
    font-family: 'Noto Sans';
    font-size: 20px;
}

.button-sin-color {
    height: 50px;
    border-radius: 15px;
    border-color: #611232;
    font-size: 20px;
    color: black;
    transition: background-color 0.5s ease, color 0.5s ease;
}

.button-sin-color:hover {
    background-color: #611232;
    color: white;
}

.fuente {
    color: black;
    font-size: 16px;
    margin-top: 0;
    font-family: 'Noto Sans';
}

.p-password {
    position: relative;
    width: 100%;
}

.p-password .p-inputtext {
    padding-right: 40px !important;
    width: 100%;
}

.p-password .p-input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: black;
    width: 18px;
    height: 18px;
}

.p-password .p-input-icon:hover {
    color: red;
}

.loader {
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    border: 4px solid #0000;
    border-radius: 50%;
    border-color: #ccc #0000;
    animation: l16 1s infinite linear;
}

.loader::before,
.loader::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
}

.loader::before {
    border-color: #f03355 #0000;
    animation: inherit;
    animation-duration: .5s;
    animation-direction: reverse;
}

.loader::after {
    margin: 8px;
}

@keyframes l16 {
    100% {
        transform: rotate(1turn)
    }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes animloader {
    50% {
        transform: scale(1) translate(-50%, -50%);
    }
}

/* Media query para pantallas pequeñas */
@media (min-width: 300px) and (max-width: 900px) {
    .img-gif {
        display: none !important;
    }

    .fuente-titulo {
        font-size: 35px;
    }

    .button-sin-color {
        height: 70px;
    }
}
</style>
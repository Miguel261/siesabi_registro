<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="contenedor-login col-sm-12 col-md-4">
                <div class="row h-100">
                    <div
                        class="col-md-12 col-sm-12 d-flex justify-content-center align-items-center contenedor-componentes">
                        <form id="demo-form" @submit.prevent="validateForm" class="w-75" autocomplete="off">
                            <div class="col-12 text-center">
                                <br>
                                <img src="/images/LOGO SIESABI Plus Rojo.png" alt="" width="270">
                                <label class="fuente-titulo" for="">Crear Cuenta</label>
                            </div>

                            <br>

                            <label class="fuente-label" for="">CURP</label>
                            <input v-model="formData.curp" type="text" class="col-12 input-log fuente"
                                @input="formData.curp = $event.target.value.toUpperCase()" placeholder="Ingresa tu CURP"
                                required>

                            <br><br>

                            <label class="fuente-label" for="email">Correo electrónico</label>
                            <input v-model="formData.email" type="email" class="col-12 input-log fuente"
                                @input="formData.email = $event.target.value.toLowerCase()"
                                placeholder="Ingresa tu correo electrónico" required autocomplete="off">

                            <br><br>

                            <!-- Campo oculto para evitar el autocompletado en Chrome -->
                            <input type="text" style="display:none;" autocomplete="new-password">

                            <label class="fuente-label" for="password">Contraseña</label>
                            <Password v-model="formData.password" placeholder="Ingresa tu contraseña"
                                :toggle-mask="true" class="w-full mb-3" inputClass="w-full"
                                :inputProps="{ autocomplete: 'new-password', name: 'password-' + Math.random() }"
                                required>
                            </Password>

                            <br><br>

                            <label class="fuente-label" for="">Confirmar contraseña</label>
                            <Password v-model="formData.confirmPassword" placeholder="Confirma tu contraseña"
                                :toggle-mask="true" class="w-full mb-3" inputClass="w-full" required>
                            </Password>

                            <br><br>

                            <div class="flex flex-wrap justify-center gap-4">
                                <div class="text-center items-center fuente">
                                    <Checkbox v-model="size" name="size" :binary="true" class="mr-3" />
                                    <label for="size_normal">Acepto el
                                        <a rel="stylesheet"
                                            href="https://educacion.imssbienestar.gob.mx/privacy-notice">Aviso de
                                            privacidad</a>
                                    </label>
                                </div>
                            </div>

                            <br>

                            <button type="submit" class="button-log col-12">Crear cuenta</button>

                            <br>

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
import Checkbox from 'primevue/checkbox';
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const size = ref(false);
const url = import.meta.env.VITE_URL_HOST;
const isLoading = ref(false);

const formData = ref({
    curp: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const recaptchaToken = ref('');

function validateForm() {
    grecaptcha.ready(() => {
        grecaptcha
            .execute('6Lf8ENMqAAAAABXACnyT-f2lsh2Go_EuXkjNwLCf', { action: 'submit' })
            .then((token) => {
                recaptchaToken.value = token;
                console.log(size.value)
                if(size.value == true){
                    submitForm();
                }
                else{
                    showErrorAvise();
                }
            });
    });
}

async function submitForm() {
    const curp = formData.value.curp.trim().toUpperCase();
    const curpRegex = /^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/;

    if (!curpRegex.test(curp)) {
        showErrorCurp();
        return false;
    }

    // Extraer la fecha de nacimiento (6 dígitos después de las primeras 4 letras)
    const fechaNacimientoStr = curp.substr(4, 6);
    const año = parseInt(fechaNacimientoStr.substr(0, 2), 10);
    const mes = parseInt(fechaNacimientoStr.substr(2, 2), 10) - 1; // Los meses en JS son 0-indexados
    const dia = parseInt(fechaNacimientoStr.substr(4, 2), 10);

    const siglo = año < 30 ? 2000 : 1900;
    const fechaNacimiento = new Date(siglo + año, mes, dia);

    // Validar que la fecha sea válida
    if (isNaN(fechaNacimiento.getTime())) {
        showErrorCurp();
        return false;
    }

    // Calcular la edad
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    if (mesActual < mes || (mesActual === mes && diaActual < dia)) {
        edad--;
    }

    if (edad < 18) {
        showErrorCurpDate()
        return false;
    }

    if (validateEmail(formData.value.email)) {
        if (formData.value.password != '' && formData.value.confirmPassword != '') {
            regiserUser();
        }
        else{
            showErrorPassword();
        }
    } else {
        showErrorEmail();
    }
    return true;
};

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const regiserUser = async () => {
    isLoading.value = true
    try {
        if (formData.value.password === formData.value.confirmPassword) {
            const response = await axios.post(`${url}/api/auth/sign_up`, {
                term: 1,
                curp: formData.value.curp,
                email: formData.value.email,
                password: formData.value.password,
                password_confirmed: formData.value.confirmPassword
                //recaptchaToken: recaptchaToken.value,
            });

            authStore.setTokens(response.data.accessToken, response.data.refreshToken, response.data.roles[0]);
            isLoading.value = false;
            router.push('/register/user-profiles');
        }
        else {
            showErrorCredentials()
            isLoading.value = false;
        }
    } catch (error) {
        console.log(error)
        isLoading.value = false;
        if (error.status === 409) {
            showErrorRegister(error.response.data.message);
        }

        if (error.status === 400) {
            showError400();
        }

        if (error.status === 500) {
            console.log(error)
            swal("Error!", "Error del servidor! Intenta nuevamente más tarde.", "error");
        }

    }
};

const showErrorCredentials = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Las contraseñas no coinciden. Por favor, verifica que ambos campos sean iguales.`,
        life: 3000
    });
};

const showError400 = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `La contraseña debe ser de 8 o mas caracteres.`,
        life: 3000
    });
};

const showErrorAvise = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Revisa y acepta los terminos y condiciones en nuestro aviso de privacidad.`,
        life: 3000
    });
};

const showErrorPassword = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Ingresa tu contraseña.`,
        life: 3000
    });
};

const showErrorCurp = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `El formato de la CURP es invalido.`,
        life: 3000
    });
};

const showErrorEmail = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `El formato del correo electrónico es invalido.`,
        life: 3000
    });
};

const showErrorCurpDate = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `La CURP de la persona debe tener 18 años o mas`,
        life: 3000
    });
};

const showErrorRegister = (message) => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `${message}`,
        life: 3000
    });
};

onMounted(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_URL_RECAPCHA;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
});
</script>

<style>
.contenedor-login {
    margin-top: 100px;
    background-color: #f1f1f1;
    height: 800px;
    border-radius: 20px;
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
}

.img-fluid {
    width: 650px;
    height: auto;
}

.img-gif {
    background-image: url('/public/images/rojos pt2.svg');
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
    width: 100%;
    height: 50px;
}

.p-password input {
    width: 100%;
    height: 50px;
    border-radius: 20px;
    border: 2px solid black;
    background-color: white;
    color: black;
    font-size: 16px;
    margin-top: 0;
    font-family: 'Noto Sans';
    padding: 15px;
}

.p-password input::placeholder {
    color: gray;
    opacity: 1;
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
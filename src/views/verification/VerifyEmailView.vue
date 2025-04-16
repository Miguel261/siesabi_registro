<template>
    <div style="margin-top: 120px;" class="container-fluid">
        <div class="grid">
            <div class="row justify-content-center">
                <Card class="col-md-8 col-sm-12 carta justify-content-center">
                    <template #content>
                        <div class="col-12 d-flex justify-content-center align-items-center">
                            <div
                                class="col-11 d-flex justify-content-between align-items-center flex-column flex-sm-row">
                                <div class="d-flex align-items-center">
                                    <img class="avatar d-none d-sm-block"
                                        src="https://educacion.imssbienestar.gob.mx/images/logos/mi_siesabi.png?id=4e901e4be2631289ad87d17c063293bf"
                                        alt="Imagen de bienvenida">

                                    <hr class="linea d-none d-sm-block" style="border: none; border-left: 2.5px solid hsla(200, 10%, 50%,100);
                    height: 150px; width: 20px;">

                                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                                        <label style="color: gray; font-size: 43px;" class="fuente-titulo">
                                            {{ messageTitle }}
                                        </label>
                                        <label style="color: black; font-size: 19px; font-weight: bold;" class="fuente">
                                            {{ messageSubtitle }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="d-flex flex-column flex-sm-row justify-content-end align-items-center w-100 mt-3 mt-sm-0">
                            <div v-if="!tokenExpired"
                                class="col-sm-12 col-md-6 col-lg-2 d-flex justify-content-center mt-2 mt-sm-0">
                                <Button class="fuente Button-courses custom-icon w-100" label="Ir a mi cuenta"
                                    icon="pi pi-sign-in" v-on:click="Account()" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();
const tokenExpired = ref(false);
const messageTitle = ref('Verificando token...');
const messageSubtitle = ref('Por favor espera un momento');
const token = ref(null);
const expires = ref(null);
const signature = ref(null);

const url = import.meta.env.VITE_URL_HOST;

const extractParamsFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    token.value = urlParams.get('token')?.trim();
    expires.value = urlParams.get('expires')?.replace(/%20/g, '').trim();
    signature.value = urlParams.get('signature')?.trim();

    if (!token.value || !expires.value || !signature.value) {
        tokenExpired.value = true;
        messageTitle.value = 'Error en la verificación ❌';
        messageSubtitle.value = 'El enlace de verificación no es válido';
        return false;
    }

    const expiresTimestamp = parseInt(expires.value) * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > expiresTimestamp) {
        tokenExpired.value = true;
        messageTitle.value = 'Token expirado ❌';
        messageSubtitle.value = 'El enlace de verificación ha expirado, por favor solicita uno nuevo';
        return false;
    }

    return true;
};

const confirmTokenWithBackend = async () => {
    try {
        const response = await axios.post
        (`${url}/api/access-token?token=${token.value}&expires=${expires.value}&signature=${signature.value}`);

        if (response.status == 201) {
            messageTitle.value = 'Correo Verificado ✔';
            messageSubtitle.value = 'Tu correo ha sido verificado correctamente';

            authStore.setTokens(response.data.accessToken, response.data.refreshToken, response.data.roles[0],
                response.data.permissions);
            
        } else {
            throw new Error(response.data.message || 'La verificación falló');
        }
    } catch (error) {
        tokenExpired.value = true;
        messageTitle.value = 'Error en la verificación ❌';
        messageSubtitle.value = error.response?.data?.message ||
            error.message ||
            'Ocurrió un error al verificar tu correo';
    }
};

const Account = async () => {
    router.push('/dashboard');
};

onMounted(async () => {
    if (extractParamsFromUrl() && !tokenExpired.value) {
        await confirmTokenWithBackend();
    }
});
</script>
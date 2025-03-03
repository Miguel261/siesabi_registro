<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <nav class="navbar navbar-expand-lg navbar-dark navbar-secondary fixed-top" role="navigation" style="top: 56px;">
        <div class="container">
            <span class="navbar-brand text-white">
                <img src="/images/Logo_Blanco_IMSSB.png" alt="Logo IMSS-Bienestar" width="155">
            </span>
            <div class="collapse navbar-collapse justify-content-end" id="navbar_2">
                <ul class="navbar-nav ml-auto">
                    <li v-if="authStore.getAccessToken == null" class="nav-item">
                        <a href="/#/home" class="nav-link text-white hover-list letra">Inicio</a>
                    </li>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <li v-if="authStore.getAccessToken == null" class="nav-item">
                        <a href="/login" class="nav-link text-white hover-list letra">Iniciar Sesión</a>
                    </li>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <li v-if="authStore.getAccessToken == null" class="nav-item dropdown">
                        <a href="/register" class="nav-link text-white hover-list letra">Crear Cuenta</a>
                    </li>


                    <li style="cursor: pointer;" v-if="authStore.getAccessToken != null" class="nav-item dropdown">
                        <a href="/dashboard" class="nav-link text-white hover-list letra">Inicio</a>
                    </li>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <li style="cursor: pointer;" v-if="authStore.getAccessToken != null" class="nav-item dropdown">
                        <a v-on:click="getPrivateNotice" class="nav-link text-white hover-list letra">
                            Aviso de privacidad
                        </a>
                    </li>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <li style="cursor: pointer;" v-if="authStore.getAccessToken != null" class="nav-item dropdown">
                        <a href="/directory" class="nav-link text-white hover-list letra">Directorio</a>
                    </li>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <li style="cursor: pointer;" v-if="authStore.getAccessToken != null" class="nav-item dropdown">
                        <a v-on:click="getEducationalOffer" class="nav-link text-white hover-list letra">
                            Oferta educativa
                        </a>
                    </li>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <li style="cursor: pointer;" v-if="authStore.getAccessToken != null" class="nav-item dropdown">
                        <a href="/questions" class="nav-link text-white hover-list letra">Preguntas frecuentes</a>
                    </li>

                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <li style="cursor: pointer;" v-if="authStore.getAccessToken != null" class="nav-item dropdown">
                        <a v-on:click="logout" class="nav-link text-white hover-list letra">Cerrar Sesión</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { handleGeneralError } from "@/errors/GeneralErrors";
import { pdfView } from '@/components/resources/pdfView';

const authStore = useAuthStore();

const url = import.meta.env.VITE_URL_HOST;
const router = useRouter();

const getPrivateNotice = async () => {
    try {
        const response = await axios.get(`${url}/api/private-notice`);
        if (response.data.link) {
            pdfView(response.data.link);
        }
    } catch (error) {
        console.log(error);
    }
};

const getEducationalOffer = async () => {
    try {
        const response = await axios.get(`${url}/api/educational-offer`);
        if (response.data.link) {
            pdfView(response.data.link);
        }
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    try {
        const response = await axios.post(`${url}/api/auth/logout`, null,{
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            authStore.clearTokens();
            router.push('/login');
        }

    } catch (error) {
        handleGeneralError(error, router, authStore);
    }
};

</script>

<style>
.navbar-secondary {
    z-index: 100;
    margin-top: 7px;
}

.navbar-main .bg-verde-claro,
.navbar-secondary {
    background-color: #a57f2c;
}

.fixed-bottom,
.fixed-top {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 1030;
}

.letra {
    font-family: 'Patria';
}

.fixed-top {
    top: 0;
}

.navbar-toggler-icon {
    display: block;
    width: 24px;
    height: 24px;
    background-color: #fff;
}

#contenedorButtonActivate {
    position: relative;
    top: 4px;
    color: white;
    transition: transform 0.3s ease;
}


#contenedorButtonActivate:hover {
    text-decoration: none;
    background-color: transparent;
    transform: scale(1.2);
}
</style>

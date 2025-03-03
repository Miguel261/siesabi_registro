<template>
    <div class="card col-12 col-lg-12 col-xl-12 video" style="background-color: #f8f9fa;">
        <div style="margin-top:25px" class="row align-items-center">
            <!-- Título (h5) -->
            <div class="col-12 col-md-12 text-center text-md-left">
                <h5 class="fuente" style="font-weight: bold;">Administración de video en vivo</h5>
            </div>

            <div class="col-12 col-md-12 text-center text-md-left">
                <h5 class="fuente-puesto">Ventana de video que se muestra en la sección inicial de la página</h5>
            </div>

            <td><br></td>

            <!-- Contenedor del iframe y los inputs/botones -->
            <div class="col-12 d-flex flex-column flex-md-row align-items-start gap-3">
                <!-- iframe -->
                <div class="col-12 col-md-6">
                    <iframe src="https://www.youtube.com/embed/ejemplo"
                        style="width: 100%; height: 300px; border: none;" allowfullscreen>
                    </iframe>
                </div>

                <!-- Contenedor de Inputs y Botones -->
                <div class="col-12 col-md-6 d-flex flex-column gap-3">
                    <!-- Input 1 -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <input type="text" class="col-md-12 col-sm-12 input-search fuente" placeholder="Título"
                            required>
                    </div>

                    <!-- Input 2 -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <input type="text" class="col-md-12 col-sm-12 input-search fuente"
                            placeholder="Link (a donde será dirigido al dar clic en el título)" required>
                    </div>

                    <!-- Input 3 -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <input type="text" class="col-md-12 col-sm-12 input-search fuente"
                            placeholder="SRC (fuente del video)" required>
                    </div>

                    <!-- Botones -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <Button style="height: 44px;" class="col-md-2 col-sm-12 Button-manager custom-icon"
                            label="Actualizar" icon="pi pi-sync" />
                        <Button style="height: 44px;" class="col-md-2 col-sm-12 Button-secundary custom-icon"
                            label="Activar" icon="pi pi-power-off" />
                    </div>
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

    <br>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
import { handleGeneralError } from "@/errors/GeneralErrors";
import { useRouter } from 'vue-router';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const router = useRouter();
const url = import.meta.env.VITE_URL_HOST;
const authStore = useAuthStore();

const isLoading = ref(false);
const usersSiesabi = ref(null);

const SearchUserSiesabi = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            usersSiesabi.value = [
                {
                    'name': 'Miguel Angel Figueroa Fajardo',
                    'curp': 'FIFM961026HGRGJG04',
                    'email': 'miguel.angel.figueroa.fajardo@gmail.com',
                    'data_personal': 'Completados',
                    'data_laboral': 'Completados',
                    'cuenta_moodle': 'Existe',
                    'date': '03/06/2024',
                    'verify': '15/01/2025',
                    'old_update': 'hace 4 semanas',
                }
            ]
            isLoading.value = false;
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

</script>


<style>
.video {
    height: 420px
}

.input-search {
    height: 45px;
    border-radius: 20px;
    border: 2px solid gray;
    background-color: #f8f9fa;
}
.Button-secundary {
    height: 50px;
    border-radius: 15px;
    font-size: 14px;
    font-family: 'Noto Sans';
    font-weight: bold;
    color: #a57f2c !important;
    border: 2px solid #a57f2c !important;
    background-color: white !important;
    transition: all 0.3s ease;
}

.Button-secundary:hover {
    color: white !important;
    background-color: #a57f2c !important;
}

.Button-secundary .p-button-icon {
    margin-right: 10px;
}

@media (min-width: 300px) and (max-width: 900px) {
    .video {
        height: 730px;
    }
}
</style>
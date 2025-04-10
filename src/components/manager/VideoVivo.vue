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
                    <iframe :src="src" style=" width: 100%; height: 300px; border: none;" allowfullscreen>
                    </iframe>
                </div>

                <!-- Contenedor de Inputs y Botones -->
                <div class="col-12 col-md-6 d-flex flex-column gap-3">
                    <!-- Input 1 -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <input type="text" class="col-md-12 col-sm-12 input-search fuente" placeholder="Título"
                            v-model="title" required>
                    </div>

                    <!-- Input 2 -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <input type="text" class="col-md-12 col-sm-12 input-search fuente" v-model="link"
                            placeholder="Link (a donde será dirigido al dar clic en el título)" required>
                    </div>

                    <!-- Input 3 -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <input type="text" class="col-md-12 col-sm-12 input-search fuente" v-model="src"
                            placeholder="SRC (fuente del video)" required>
                    </div>

                    <!-- Botones -->
                    <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                        <Button style="height: 44px;" class="col-md-2 col-sm-12 Button-manager custom-icon"
                            label="Actualizar" v-on:click="SaveVideo" icon="pi pi-sync" />
                        <Button style="height: 44px;" class="col-md-2 col-sm-12 Button-secundary custom-icon"
                            :label="label" v-on:click="ButtonActivateOpc" icon="pi pi-power-off" />
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
import { useRouter } from 'vue-router';
import axios from 'axios';
import swal from 'sweetalert';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { MannagerError } from '@/errors/MannagerErros';
import { useToast } from "primevue/usetoast";

onMounted(async () => {
    await getVideo();
});

const router = useRouter();
const url = import.meta.env.VITE_URL_HOST;
const authStore = useAuthStore();
const toast = useToast();

const isLoading = ref(false);

const id = ref(null);
const title = ref(null);
const link = ref(null);
const src = ref(null);
const activate = ref(null);
const label = ref('');

const getVideo = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get(`${url}/api/live/default`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        title.value = response.data.title;
        link.value = response.data.link;
        src.value = response.data.src;
        id.value = response.data.id;
        activate.value = response.data.is_enabled;

        label.value = response.data.is_enabled === 0 ? 'Activar' : 'Desactivar';
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
    finally {
        isLoading.value = false;
    }
};

const SaveVideo = async () => {
    try {
        isLoading.value = true;
        const response = await axios.post(`${url}/api/live/create`, {
            title: title.value,
            src: src.value,
            link: link.value,
            is_enabled: 0
        }, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status === 201) {
            swal("Se actualizo el video con exito!", {
                icon: "success",
                title: "Atención!",
                buttons: "OK"
            })
                .then(async (Ok) => {
                    if (Ok) {
                        await getVideo();
                    }
                });

        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
    finally {
        isLoading.value = false;
    }
};

const ButtonActivateOpc = () => {
    if (label.value === 'Activar') {
        ActiveVideo();
    }
    else {
        DesactiveVideo();
    }
};

const ActiveVideo = async () => {
    try {
        isLoading.value = true;
        await axios.put(`${url}/api/live/${id.value}/enable`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });
        await getVideo(); // Vuelve a cargar los datos
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
    finally {
        isLoading.value = false;
    }
}

const DesactiveVideo = async () => {
    try {
        isLoading.value = true;
        await axios.put(`${url}/api/live/${id.value}/disable`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });
        await getVideo(); // Vuelve a cargar los datos
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
    finally {
        isLoading.value = false;
    }
}
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
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

    <div class="row justify-content-center">
        <Fieldset class="fuente" legend="Prepara el archivo para cargar las clues">
            <div class="grid">
                <div style="margin-top:25px" class="row align-items-center">
                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Favor de seleccionar el archivo de excel a cargar.</p>
                    </div>

                    <div class="col-12 text-center text-md-left">
                        <FileUpload mode="basic" name="excelFile" accept=".xls, .xlsx, application/vnd.ms-excel, 
                            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :auto="true"
                            :multiple="false" @select="onFileSelected" chooseLabel="Seleccionar archivo"
                            class="Button-courses" style="height: 45px;" />
                    </div>

                    <td><br></td>
                    <hr style="background-color: black;">
                    <td><br></td>

                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Esta opción se debe de tomar con mucha importancia, ya que actualizara CLUES y
                            creara nuevas en caso de que estas no existan.
                            {{ uploadMessage }}</p>
                    </div>

                    <div class="col-12 text-center text-md-left">
                        <Button style="height: 44px;" class="Button-manager custom-icon" label="Cargar"
                            icon="pi pi-refresh" @click="uploadFile" :disabled="!selectedFile" />
                    </div>
                </div>
            </div>
        </Fieldset>
    </div>
    <br><br>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const authStore = useAuthStore();
const toast = useToast();
const url = import.meta.env.VITE_URL_HOST;
const isLoading = ref(false);

const selectedFile = ref(null);
const uploadMessage = ref('No se ha cargado ningún archivo.');

const config = {
    headers: {
        'Authorization': `Bearer ${authStore.getAccessToken}`,
        'Content-Type': 'multipart/form-data'
    }
};

const onFileSelected = (event) => {
    if (event.files && event.files.length > 0) {
        selectedFile.value = event.files[0];
        uploadMessage.value = `Archivo seleccionado: ${selectedFile.value.name}`;
    }
};

const uploadFile = async () => {
    if (!selectedFile.value) {
        toast.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: 'Por favor selecciona un archivo primero.',
            life: 3000
        });
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', selectedFile.value);
        isLoading.value = true;
        const response = await axios.post(`${url}/api/clue/upload`, formData, config);

        // Resetear el estado después de subir
        selectedFile.value = null;
        uploadMessage.value = 'No se ha cargado ningún archivo.';
        isLoading.value = false;

        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `${response.data.message}`,
            life: 3000
        });

    } catch (error) {
        console.error('Error al cargar el archivo:', error);

        let errorMessage = 'Error al cargar el archivo';
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        }

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000
        });

        isLoading.value = false;
    }
};
</script>

<style></style>
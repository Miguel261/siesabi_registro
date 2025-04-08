<template>
    <div class="row justify-content-center">
        <Fieldset class="fuente" legend="Prepara el archivo para cargar las clues">
            <div class="grid">

                <div style="margin-top:25px" class="row align-items-center">

                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Favor de seleccionar el achivo de excel a cargar.</p>
                    </div>


                    <div class="col-12 text-center text-md-left">
                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept=".xls, .xlsx, application/vnd.ms-excel, 
                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @upload="onUpload"
                            chooseLabel="Subir archivo" class="Button-courses" style="height: 45px;" />
                    </div>

                    <td><br></td>

                    <hr style="background-color: black;">

                    <td><br></td>

                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Esta opción se debe de tomar con mucha importancia, ya que actualizara CLUES y
                            creara nuevas en caso de que estas no existan. Favor de cargar maximo por 8,000 registros
                            por archivos.
                            No se ha cargado ningun archivo.</p>
                    </div>

                    <div class="col-12 text-center text-md-left">
                        <Button style="height: 44px;" class="Button-manager custom-icon" label="Cargar"
                            icon="pi pi-refresh" @click="SaveClues()" />
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
import { useRouter } from 'vue-router';
import Fieldset from 'primevue/fieldset';
import swal from 'sweetalert';
import FileUpload from 'primevue/fileupload';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;



const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

</script>

<style></style>
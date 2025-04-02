<template>
    <div class="card col-12 col-lg-12 col-xl-12 cubanos" style="background-color: #f8f9fa;">
        <div style="margin-top:25px" class="row align-items-center">
            <!-- Título (h5) -->
            <div class="col-12 col-md-12 text-center text-md-left">
                <h5 class="fuente" style="font-weight: bold;">Crear cuenta para personas extranjeras </h5>
            </div>

            <div class="col-12 col-md-12 text-center text-md-left">
                <h5 class="fuente-puesto">Se creará una cuenta con la posibilidad de no
                    registrar el
                    campo de CURP y se enviará un mensaje con las credenciales de acceso al
                    correo electrónico indicado.
                </h5>
            </div>

            <td><br></td>
            <!-- Contenedor del Input y el Botón -->
            <div class="col-12 col-md-12 mt-3 mt-md-0">
                <div class="d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                    <!-- Input (span) -->
                    <input type="email" v-model="email" class="col-md-3 col-sm-12 input-search fuente" placeholder="Correo electrónico"
                        required>

                    <!-- Botón -->
                    <Button style="height: 44px; color: white; background-color: #611232;"
                        class="col-md-2 col-sm-12 Button-manager custom-icon" @click="SearchUserSiesabi()"
                        icon="pi pi-user-plus" label="Agregar usuario">
                    </Button>
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
import { handleGeneralError } from "@/errors/GeneralErrors";
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import swal from 'sweetalert';
import { ref } from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useRouter } from 'vue-router';

const router = useRouter();
const url = import.meta.env.VITE_URL_HOST;
const authStore = useAuthStore();

const email = ref('');
const isLoading = ref(false);

const SearchUserSiesabi = async () => {
    try {
        isLoading.value = true;
        const response = await axios.post(`${url}/api/user/create-account-foreign`, {email: email.value}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 201) {
            swal({
                title: `Cuenta creada correctamente`,
                text: `
                    Correo: ${response.data.email}
                    Contraseña: ${response.data.password}`,
                icon: 'success'
            })
            email.value = ""
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
.cubanos {
    height: 150px
}

.input-search {
    height: 45px;
    border-radius: 20px;
    border: 2px solid gray;
    background-color: #f8f9fa;
}


@media (min-width: 300px) and (max-width: 900px) {
    .cubanos {
        height: 270px;
    }
}
</style>
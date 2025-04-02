<template>
    <div style="margin-top: 100px;" class="container col-11 justify-content-center align-items-center text-center">

        <Card class="col-12 cartaV2 justify-content-center">
            <template #content>
                <div class="col-12 d-flex justify-content-center align-items-center" style="top: -30px;">
                    <div class="col-11 d-flex justify-content-between align-items-center flex-column flex-sm-row">
                        <!-- Contenedor para la imagen y los labels -->
                        <div class="d-flex align-items-center flex-grow-1">
                            <!-- Imagen en forma de círculo -->
                            <img class="avatar d-none d-sm-block"
                                src="https://educacion.imssbienestar.gob.mx/images/logos/mi_siesabi.png?id=4e901e4be2631289ad87d17c063293bf"
                                alt="Imagen de bienvenida">

                            <hr class="linea d-none d-sm-block"
                                style="border: none; border-left: 2.5px solid hsla(200, 10%, 50%,100); height: 90px; width: 20px;">

                            <!-- Contenedor para los labels (uno debajo del otro) -->
                            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                                <label style="color: gray; font-size: 25px; white-space: nowrap;" class="fuente-titulo">
                                    Configuración de la cuenta
                                </label>
                            </div>
                        </div>

                        <!-- Contenedor para los botones (alineados a la parte inferior de la imagen) -->
                        <div
                            class="d-flex flex-column flex-sm-row justify-content-center align-items-center mt-3 mt-sm-0">
                            <div class="col-sm-12 col-md-12 d-flex justify-content-center">
                                <Button class="fuente Button-manager custom-icon w-100" v-on:click="ReturnPage"
                                    label="Regresar" icon="pi pi-arrow-left" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <br>

        <div class="container col-12">
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active fuente" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                        type="button" role="tab" aria-controls="users" aria-selected="true">Ajustes de cuenta</button>
                </li>
                <li class=" nav-item" role="presentation">
                    <button class="nav-link fuente" id="create-user-tab" data-bs-toggle="tab"
                        data-bs-target="#create-user" type="button" role="tab" aria-controls="create-user"
                        aria-selected="false">Actualizar información
                        personal</button>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <br><br>
                    <AccountSettings></AccountSettings>
                </div>
                <div class="tab-pane fade" id="create-user" role="tabpanel" aria-labelledby="create-user-tab">
                    <br><br>
                    <UpdateInformationPersonal></UpdateInformationPersonal>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AccountSettings from "@/components/users/AccountSettings.vue";
import UpdateInformationPersonal from "@/components/users/UpdateInformationPersonal.vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
    authStore.refreshTokenStore();
});

const ReturnPage = () =>{
    router.push('/dashboard');
};

</script>

<style scoped>
.cartaV2 {
    text-align: center;
    background-image: url('/images/Mesa de trabajo 3.svg');
    background-position: center;
    width: 100%;
    background-size: cover;
    height: 100px;
}

.avatar {
    width: 180px;
    height: 40px;
    margin-right: 20px;
}

@media (min-width: 300px) and (max-width: 900px) {
    .cartaV2{
        display: none;
    }
}
</style>
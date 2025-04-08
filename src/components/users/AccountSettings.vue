<template>
    <div class="row justify-content-center">
        <div class="card col-md-12 col-sm-12">
            <Fieldset class="fuente" legend="Actualizar las credenciales de acceso">
                <div class="grid">
                    <div class="col-12 md:col-12">
                        <div class="card p-fluid" style="background-color: #f8f9fa;">
                          
                            <br>

                            <div class="email-user">
                                <div v-if="userData" class="col-12 d-flex align-items-center mb-3">
                                    <i class="pi pi-envelope icon-update"></i>
                                    <label class="ms-2 fuente">Correo actual:
                                        {{ userData.email }}
                                    </label>
                                </div>
                            </div>

                            <div class="col-12 d-flex align-items-center mb-3">
                                <label class="fuente">Actualizar Correo</label>
                            </div>

                            <div class="col-12 d-flex align-items-center mb-3">
                                <input v-model="email" class="col-md-7 col-sm-12 input-update"
                                    @input="email = $event.target.value.toLowerCase()"
                                    placeholder="Ingresa el correo electrónico nuevo" required
                                    autocomplete="new-password">
                            </div>

                            <div class="col-12 d-flex align-items-center mb-3">
                                <label class="fuente">¿Desea actualizar su contraseña?</label>

                            </div>

                            <div class="col-12 d-flex align-items-center mb-3">
                                <InputSwitch v-model="checked" />
                            </div>

                            <div v-if="checked">
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <h4 class="fuente">Actualizar contraseña</h4>
                                </div>

                                <div class="col-12 d-flex align-items-center mb-3">
                                    <label class="fuente" for="name1">Contraseña</label>

                                </div>

                                <div class="col-md-7 col-sm-12 d-flex align-items-center mb-3">
                                    <Password v-model="password" placeholder="Ingresa tu contraseña nueva"
                                        :toggle-mask="true" class="w-full mb-3" inputClass="w-full"
                                        autocomplete="new-password">
                                    </Password>
                                </div>

                                <div class="col-12 d-flex align-items-center mb-3">
                                    <label class="fuente" for="email1">Confirmar contraseña</label>
                                </div>


                                <div class="col-md-7 col-sm-12 d-flex align-items-center mb-3">
                                    <Password v-model="confirmPassword" placeholder="Confirma tu contraseña"
                                        :toggle-mask="true" class="w-full mb-3" inputClass="w-full"
                                        autocomplete="new-password">
                                    </Password>
                                </div>
                            </div>

                            <div class="col-12 d-flex align-items-center mb-3">
                                <Button style="height: 35px; color: white; background-color: #611232;"
                                    class="col-md-2  col-sm-12 Button-manager custom-icon" @click="confirmUpdate()"
                                    label="Actualizar " icon="pi pi-refresh" />
                            </div>
                        </div>
                    </div>
                </div>
            </Fieldset>
        </div>
    </div>

    <br><br>

    <loading v-model:active="isLoading" :loader="null" :can-cancel="false" :on-cancel="onCancel"
        :is-full-page="fullPage">
        <div style="text-align: center;">
            <span class="loader"></span>
            <br>
            <br>
            <label class="fuente" for="" style="text-align: center;">Cargando...</label>
        </div>
    </loading>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Fieldset from 'primevue/fieldset';
import { useRouter } from 'vue-router';
import InputSwitch from 'primevue/inputswitch';
import { useAuthStore } from '@/stores/auth';
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { handleGeneralError } from '@/errors/GeneralErrors';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const isLoading = ref(false);
const userData = ref(null);

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const url = import.meta.env.VITE_URL_HOST;

const checked = ref(false);

onMounted(() => {
    isLoading.value = true;
    getInformationUser();
});

const getInformationUser = async () => {
    try {
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            userData.value = response.data;
            isLoading.value = false;
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

const confirmUpdate = async () => {
    if (checked.value == false) {
        if (email.value == null) {
            showToast();
        } else {
            if (email.value == userData.value.email) {
                showErrorEmailRepit();
            }
            else {
                const userConfirmation = await swal({
                    title: "Actualización de email",
                    text: "¿Seguro que deseas cambiar tu correo electrónico?",
                    icon: "warning",
                    buttons: {
                        cancel: "No",
                        confirm: "Sí",
                    },
                    dangerMode: true,
                });

                if (userConfirmation) {
                    if (validateEmail(email.value)) {
                        updateEmailUser();
                    }
                    else {
                        showErrorEmail();
                    }
                }
            }
        }
    }
    else {
        if (password.value == null && confirmPassword.value == null) {
            showToast();
        }

        if (password.value != confirmPassword.value) {
            showPassword();
        } else {
            if (email.value == null) {
                const userConfirmation = await swal({
                    title: "Actualización de contraseña",
                    text: "¿Seguro que deseas cambiar tu contraseña?",
                    icon: "warning",
                    buttons: {
                        cancel: "No",
                        confirm: "Sí",
                    },
                    dangerMode: true,
                });
                if (userConfirmation) {
                    await updatePassword();
                }

            } 
            else {
                if (email.value == userData.value.email) {
                    showErrorEmailRepit();
                }
                else{
                    const userConfirmation = await swal({
                        title: "Actualización de email y contraseña",
                        text: "¿Seguro que deseas actualizar tus credenciales?",
                        icon: "warning",
                        buttons: {
                            cancel: "No",
                            confirm: "Sí",
                        },
                        dangerMode: true,
                    });

                    if (userConfirmation) {

                        if (validateEmail(email.value)) {
                            await updateEmailUser();
                            await updatePassword();
                        }
                        else {
                            showErrorEmail();
                        }
                    }
                }
            }
        }
    }
};

const updatePassword = async () => {
    try {
        const response = await axios.put(`${url}/api/user/update-password`, {
            password: password.value,
            password_confirmed: confirmPassword.value
        }, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            isLoading.value = false;
            swal("Se actualizo la contraseña correctamente!", {
                icon: "success",
                title: "Éxito!",
                buttons: "Ok"
            })
                .then(async (Ok) => {
                    if (Ok) {
                        window.location.reload();
                    }
                })
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

const updateEmailUser = async () => {
    try {
        const response = await axios.put(`${url}/api/user/update-email`, {
            email: email.value
        }, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            isLoading.value = false;
            swal("Se actualizo el correo electrónico correctamente!", {
                icon: "success",
                title: "Éxito!",
                buttons: "Ok"
            })
                .then(async (Ok) => {
                    if (Ok) {
                        window.location.reload();
                    }
                })
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const showToast = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingresa los datos que se te solicitan',
        life: 2000
    });
};

const showPassword = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Las contraseñas no coinciden',
        life: 2000
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

const showErrorEmailRepit = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `El correo electrónico ya esta registrado.`,
        life: 3000
    });
};

</script>

<style scoped>
.input-update {
    height: 50px;
    border-radius: 20px;
    border: 2px solid black;
}

.icon-update {
    font-size: 1.8rem;
    color: black;
}


@media (min-width: 300px) and (max-width: 900px) {
    .email-user {
        display: none;
    }
}
</style>
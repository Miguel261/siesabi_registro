<template>
    <div class="card col-12 col-lg-12 col-xl-12 tarjeta" style="background-color: #f8f9fa;">
        <div style="margin-top:25px" class="row align-items-center">
            <!-- Título (h5) -->
            <div class="col-12 col-md-6 text-center text-md-left">
                <h5 class="fuente" style="font-weight: bold;">Buscar usuario de SiESABI </h5>
            </div>

            <!-- Contenedor del Input y el Botón -->
            <div class="col-12 col-md-6 mt-3 mt-md-0">
                <div class="d-flex flex-column flex-md-row 
                    justify-content-center justify-content-md-end align-items-center gap-2">
                    <!-- Input (span) -->
                    <input type="email" v-model="email" class="col-md-6 col-sm-12 input-search fuente"
                        placeholder="Buscar por email" required>

                    <input type="text" v-model="curp" class="col-md-6 col-sm-12 input-search fuente"
                        placeholder="Buscar por curp" required>

                    <!-- Botón -->
                    <Button style="height: 44px; color: white; background-color: #611232;"
                        class="col-md-3 col-sm-12  Button-manager custom-icon" @click="getUser()" label="Buscar"
                        icon="pi pi-search" />
                </div>
            </div>
        </div>
    </div>


    <div id="datatable" style="margin-top:20px; display: none;" class="card">
        <DataTable ref="dt" :value="usersSiesabi" dataKey="id" :filters="filters" responsiveLayout="scroll"
            showGridlines>
            <Column class="fuente" header="Nombre" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:16%;">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>

            <Column class="fuente" header="Email" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.email }}
                </template>
            </Column>

            <Column class="fuente" header="CURP" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.curp }}
                </template>
            </Column>

            <Column class="fuente" header="Datos personales" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.hasUserProfile ? 'Completados' : 'Incompletos' }}
                </template>
            </Column>

            <Column class="fuente" header="Datos laborales" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.hasLaboralProfile ? 'Completados' : 'Incompletos' }}
                </template>
            </Column>

            <Column class="fuente" header="Cuenta moodle" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <tag :class="{
                        'Existe': slotProps.data.hasAccountMoodle,
                        'No-existe': !slotProps.data.hasAccountMoodle
                    }">
                        {{ slotProps.data.hasAccountMoodle ? 'Existe' : 'No existe' }}
                    </tag>
                </template>
            </Column>

            <Column class="fuente" header="Estatus" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    <tag :class="{
                        'Existe': !slotProps.data.hasAccountBanned,
                        'No-existe': slotProps.data.hasAccountBanned
                    }">
                        {{ slotProps.data.hasAccountBanned ? 'Baneado' : 'Activo' }}
                    </tag>
                </template>
            </Column>

            <Column class="fuente" header="Fecha de registro" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.createdAt).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Correo verificado" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.emailVerifiedAt ? moment(slotProps.data.emailVerifiedAt).format('DD/MM/YYYY')
                    : 'No verificado' }}
                </template>
            </Column>

            <Column class="fuente" header="Ultima actualización" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.updatedAt).format('DD/MM/YYYY') }}
                </template>
            </Column>

            <Column class="fuente" header="Ver" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    <Button v-if="slotProps.data.changes.length > 0" icon="pi pi-eye" style="color: white; font-size: 15px; background-color: #611232;
                    border-color: #611232;" class=" p-button-md p-button-rounded p-button mr-3 custom-icon"
                        @click="ViewChange(slotProps.data)" title="Ver modificaciones a este usuario" />
                </template>
            </Column>
            <Column class="fuente" header="Opc" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    <Button icon="pi pi-cog" style="color: white; background-color: #a57f2c;
                    border-color: #a57f2c;" class="p-button-md p-button-rounded p-button custom-icon"
                        @click="viewOptions($event, slotProps.data)" title="Opciones" />

                    <OverlayPanel ref="overlayPanel" :dismissable="false">
                        <span class="fuente" style="color: black; font-weight: bold;">Opciones</span>
                        <Menu style="font-size: 13px;" class="fuente" ref="menuRef" :model="items" />
                    </OverlayPanel>
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="visible" modal header="Edit Profile" style="width: 55rem;">
        <template #header>
            <div class="text-left ">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span style="font-size: 33px;" class="fuente-titulo white-space-nowrap">Historial de cambios</span>
                <br>
                <span class="fuente white-space-nowrap">{{ emailChange }}</span>
            </div>
        </template>
        <DataTable ref="dt" :value="changes" dataKey="id" :filters="filters" responsiveLayout="scroll">
            <Column class="fuente" header="Acciones" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    {{ slotProps.data.action }}
                </template>
            </Column>

            <Column class="fuente" header="Usuario" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:5%;">
                <template #body="slotProps">
                    {{ slotProps.data.user_modified }}
                </template>
            </Column>

            <Column class="fuente" header="Fecha" headerClass="column-header" bodyClass="column-body"
                headerStyle="width:1%;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.created_at).format('DD/MM/YYYY') }}
                </template>
            </Column>
        </DataTable>
    </Dialog>

    <Dialog v-model:visible="changeEmailDialog" modal style="width: 60rem;">
        <template #header>
            <div class="container">
                <div class="text-center ">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    <span style="font-size: 32px;" class="fuente-titulo white-space-nowrap">Actualizar correo
                        electrónico</span>
                </div>
            </div>
        </template>
        <span style="color: red; font-size: 15px;" class="fuente white-space-nowrap">
            <i class="pi pi-exclamation-triangle" style="margin-right: 10px;"></i>
            <label for="">El usuario tendrá que volver a validar su correo</label>
        </span>
        <br>
        <span style="color: black; font-size: 15px;" class="fuente white-space-nowrap">
            <i class="pi pi-envelope" style="margin-right: 10px;"></i>
            <label for="">{{ userData.email }}</label>
        </span>

        <input type="email" v-model="newEmail" class="col-12 input-search fuente"
            placeholder="Ingresa el correo electrónico" required>

        <br><br>

        <Button style="height: 44px; color: white; background-color: #611232;" class="col-4  
        Button-manager custom-icon" @click="changeEmail()" label="Actualizar" icon="pi pi-refresh" />
    </Dialog>

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
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth';
import { handleGeneralError } from "@/errors/GeneralErrors";
import { useRouter } from 'vue-router';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useToast } from "primevue/usetoast";
import moment from 'moment';
import OverlayPanel from 'primevue/overlaypanel';
import Menu from 'primevue/menu';
import { MannagerError } from '@/errors/MannagerErros';

const toast = useToast();
const router = useRouter();

const url = import.meta.env.VITE_URL_HOST;
const authStore = useAuthStore();

const isLoading = ref(false);
const usersSiesabi = ref(null);
const visible = ref(false);
const overlayPanel = ref(null);
const userData = ref(null);

const curp = ref('');
const email = ref('');

const getUser = () => {
    if (curp.value === '' && email.value === '') {
        showToast();
    }
    else {
        SearchUserSiesabi();
    }
};

const showToast = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingresa email o curp del usuario',
        life: 2000
    });
};

const showToastInfo = () => {
    toast.add({
        severity: 'info',
        summary: 'Información',
        detail: 'No se encontraron coincidencias',
        life: 2000
    });
};

const showEmail = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El correo proporcionado no es correcto',
        life: 2000
    });
};

const showMoodle = () => {
    toast.add({
        severity: 'warn',
        summary: 'Información',
        detail: `Ya existe cuenta de moodle`,
        life: 2000
    });
};

const showLowerCase = () => {
    toast.add({
        severity: 'warn',
        summary: 'Información',
        detail: `El correo ya esta en minúsculas`,
        life: 2000
    });
};

const showSuccess = (message) => {
    toast.add({
        severity: 'success',
        summary: 'Exito',
        detail: `${message}`,
        life: 2000
    });
};

const SearchUserSiesabi = async () => {
    try {

        isLoading.value = true;
        const response = await axios.get(`${url}/api/user/all?curp=${curp.value}&email=${email.value}`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            if (response.data.total === 0) {
                showToastInfo();
                isLoading.value = false;
            }
            else {
                toggleDataTableVisibility();
                usersSiesabi.value = response.data.results;
                isLoading.value = false;
                authStore.refreshTokenStore();
            }
        }
    }
    catch (error) {
        isLoading.value = false;
        handleGeneralError(error, router, authStore);
    }
};

const toggleDataTableVisibility = () => {
    const div = document.getElementById("datatable");
    if (div) {
        div.style.display = "block";
    }
};

const emailChange = ref('');
const changes = ref(null);

const changeEmailDialog = ref(false);
const newEmail = ref('');

const ViewChange = (data) => {
    emailChange.value = data.email;
    changes.value = data.changes;
    visible.value = true;
};

const viewOptions = (event, data) => {
    overlayPanel.value.toggle(event);
    userData.value = data;
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const changeEmail = async () => {
    if (isValidEmail(newEmail.value)) {
        try {
            isLoading.value = true;
            const response = await axios.put(`${url}/api/user/${userData.value.id}/update-email`, { email: newEmail.value }, {
                headers: {
                    'Authorization': `Bearer ${authStore.getAccessToken}`
                }
            });

            if (response.status == 200) {
                showSuccess(response.data.message);
                changeEmailDialog.value = false;
                email.value = newEmail.value;
                SearchUserSiesabi();
            }
        } catch (error) {
            isLoading.value = false;
            MannagerError(error, router, authStore, toast);
        }
    } else {
        showEmail();
        isLoading.value = false;
    }
};

const confirmUpdatePassword = async () => {
    const userConfirmation = await swal({
        title: "Generación de Contraseña Temporal",
        text: "¿Seguro que deseas actualizar la contraseña por una temporal?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        isLoading.value = true;
        updatePAssword();
    }
}

const updatePAssword = async () => {
    try {
        const response = await axios.put(`${url}/api/user/${userData.value.id}/refresh-password`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            swal("Se actualizo la contraseña correctamente!", {
                icon: "success",
                title: "Éxito!",
                buttons: "Copiar",
                text: "La Contraseña es: " + response.data.password,
                closeOnClickOutside: false,
                closeOnEsc: false,

            })
                .then(async (Copiar) => {
                    if (Copiar) {
                        await navigator.clipboard.writeText(response.data.password);
                    }
                });

            isLoading.value = false;
        }
    }
    catch (error) {
        isLoading.value = false;
        MannagerError(error, router, authStore, toast);
    }
}

const confirmGenerateMoodle = async () => {
    const userConfirmation = await swal({
        title: "Generación de Cuentea de moodle",
        text: "¿Seguro deseas generar cuenta de moodle a este usuario?",
        icon: "warning",
        buttons: {
            cancel: "No",
            confirm: "Sí",
        },
        dangerMode: true,
    });

    if (userConfirmation) {
        isLoading.value = true;
        generateMoodle();
    }
}

const updateEmailToLowerCase = async () => {
    isLoading.value = true;
    try {
        const response = await axios.put(`${url}/api/user/${userData.value.id}/update-email-to-lower-case`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            isLoading.value = false;
            swal("Se actualizo el correo correctamente!", {
                icon: "success",
                title: "Éxito!",
                buttons: "Ok",
                text: "La Contraseña es: " + response.data.password,
                closeOnClickOutside: false,
                closeOnEsc: false,

            })
                .then(() => {
                    SearchUserSiesabi();
                });
        }
    }
    catch (error) {
        isLoading.value = false;
        
        if(error.status === 412){
            showLowerCase();
            return;
        }

        MannagerError(error, router, authStore, toast);
    }
}

const generateMoodle = async () => {
    try {
        const response = await axios.put(`${url}/api/user/${userData.value.id}/generate-moodle-account`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        if (response.status == 200) {
            showSuccess(response.data.message);
            SearchUserSiesabi();
            isLoading.value = false;
        }

    }
    catch (error) {
        if (error.status == 409) {
            showMoodle();
            isLoading.value = false;
            return;
        }
        isLoading.value = false;
        MannagerError(error, router, authStore, toast);
    }
};

const items = [
    {
        label: 'Cambiar email',
        icon: 'pi pi-at',
        command: () => {
            changeEmailDialog.value = true;
        }
    },
    {
        label: 'Cambiar contraseña',
        icon: 'pi pi-key',
        command: () => {
            confirmUpdatePassword();
        }
    },
    {
        label: 'Generar cuenta de moodle',
        icon: 'pi pi-check-square',
        command: () => {
            confirmGenerateMoodle()
        }
    },
    {
        label: 'Enviar enlace de acceso',
        icon: 'pi pi-link',
        command: () => {

        }
    },
    {
        label: 'Correo a minúsculas',
        icon: 'pi pi-pencil',
        command: () => {
            updateEmailToLowerCase()
        }
    },
    {
        label: 'Desbaneo de cuenta',
        icon: 'pi pi-ban',
        command: () => {

        }
    }
];

</script>

<style>
.tarjeta {
    height: 100px
}

.input-search {
    height: 45px;
    border-radius: 20px;
    border: 2px solid gray;
    background-color: #f8f9fa;
}

.Existe {
    background-color: #d4edda;
    color: #28a745;
    border-color: #c3e6cb;
    font-size: 15px;
    font-family: 'Noto Sans';
}

.No-existe {
    background-color: #f8d7da;
    color: #dc3545;
    border-color: #f5c6cb;
    font-size: 15px;
    font-family: 'Noto Sans';
}


@media (min-width: 300px) and (max-width: 900px) {
    .tarjeta {
        height: 250px;
    }
}
</style>

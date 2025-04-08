<template>
    <div class="col-12" style="top: 100px;">
        <div class="stepper-decorativo">
            <div class="step-decorativo active">
                <div class="step-circle-decorativo fuente">Paso 1</div>
                <div class="step-label-decorativo fuente">Registrar datos personales</div>
            </div>
            <div class="step-decorativo">
                <div class="step-circle-decorativo fuente">Paso 2</div>
                <div class="step-label-decorativo fuente">Registrar datos laborales</div>
            </div>
        </div>

        <div class="d-flex justify-content-center">

            <div class="card col-12" style="background-color: #f8f9fa;">
                <div style="margin-top:25px" class="row align-items-center">

                    <div class="col-12 col-md-6 text-center text-md-left">
                        <h5 class="fuente" style="font-weight: bold; font-size: 25px;">Datos personales</h5>
                        <p class="fuente">Tenga cuidado con los datos que registra ya que servirán para su seguimiento
                            individual y colectivo.</p>
                    </div>

                    <td><br></td>

                    <div class="row col-12">


                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Nombre(s):</label>
                            <br>
                            <input type="text" v-model="name" class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Apellido paterno:</label>
                            <br>
                            <input type="text" v-model="first_name" class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Apellido materno:</label>
                            <br>
                            <input type="text" v-model="last_name" class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Genero:</label>
                            <br>
                            <Dropdown v-model="genero" :options="generoOptions" optionLabel="name"
                                class="col-12 custom-calendar fuente" required />
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Fecha de nacimiento:</label>
                            <br>
                            <Calendar v-model="date" placeholder="Ingrese fecha de nacimiento"
                                class="custom-calendar col-12" :minDate="today" required />
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Teléfono:</label>
                            <br>
                            <input type="text" @input="validateNumber" v-model="phone"
                                class="col-12 input-search fuente" maxlength="10" required>
                        </div>

                        <td><br><br></td>

                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                            <Button style="height: 44px;" class="col-sm-12 col-md-5 Button-manager custom-icon"
                                label="Guardar datos" icon="pi pi-save" @click="saveUserProfiles" />
                        </div>

                    </div>
                </div>
                <br><br>
            </div>
        </div>
    </div>
    <br><br><br><br><br><br><br><br><br>

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
import { ref, onMounted } from "vue";
import moment from 'moment';
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useAuthStore } from '@/stores/auth';
import router from "@/router";
import swal from 'sweetalert';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const toast = useToast();
const authStore = useAuthStore();


const name = ref('');
const first_name = ref('');
const last_name = ref('');
const phone = ref('');
const date = ref(null);
const genero = ref('');

onMounted(async () => {
    await getInformationUser();
});

const isLoading = ref(false);

const url = import.meta.env.VITE_URL_HOST;

const generoOptions = [
    { name: 'Hombre', code: 1 },
    { name: 'Mujer', code: 2 },
    { name: 'Otro', code: 3 }
];

const validateNumber = (event) => {
    phone.value = event.target.value.replace(/\D/g, '');
    event.target.value = phone.value;
};

const saveUserProfiles = async () => {

    const today = moment();

    const dateNacimiento = moment(date.value, 'DD/MM/YYYY');
    const edad = today.diff(dateNacimiento, 'years');

    if (name.value === '' || first_name.value === '' || last_name.value === '' || phone.value === '' ||
        date.value === null || genero.value === '') {
        showToastData();
    }
    else {
        if (edad < 18) {
            showToast();
        }
        else {
            const formData = {
                name: name.value,
                first_name: first_name.value,
                last_name: last_name.value,
                date_of_birth: date.value,
                phone: phone.value,
                gender_id: genero.value.code
            }

            try {
                const response = await axios.post(`${url}/api/register/user-profile`, {
                    "name": formData.name.toUpperCase(),
                    "first_name": formData.first_name.toUpperCase(),
                    "last_name": formData.last_name.toUpperCase(),
                    "date_of_birth": date.value,
                    "phone": phone.value,
                    "gender_id": genero.value.code
                }, {
                    headers: {
                        'Authorization': `Bearer ${authStore.getAccessToken}`
                    }
                });


                swal("Se registro con exito la información!", {
                    icon: "success",
                    title: "Atención!",
                    buttons: "OK"
                })
                    .then((Ok) => {
                        if (Ok) {
                            router.push('/register/laboral-profiles');
                        }
                    });

            }
            catch (error) {
                console.log(error)
                if (error.status === 409) {
                    showToastAdv()
                    router.push('/register/laboral-profiles');
                }

                if (error.status === 401) {
                    router.push('/login');
                }
            }
        }
    }

};

const getInformationUser = async () => {
    try {
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        isLoading.value = false;
        router.push('/dashboard');
    }
    catch (error) {
        isLoading.value = false;
        console.log(error);
        if (error.status === 403) {
            router.push(error.response.data.section);
        }

        if (error.status === 401) {
            router.push('/login')
        }
    }
};

const showToast = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingresaste una fecha de nacimiento invalida',
        life: 2000
    });
};

const showToastAdv = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ya registraste esta información',
        life: 2000
    });
};

const showToastData = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingresa los datos que se solicitan',
        life: 2000
    });
};

</script>

<style>
.custom-calendar {
    height: 45px;
    border-radius: 20px;
    border: 2px solid gray !important;
    background-color: #f8f9fa !important;
}

.custom-calendar .p-inputtext {
    height: 41px;
    border-radius: 20px;
    border: none;
    background-color: transparent !important;
    font-size: 15px;
}

.custom-calendar .p-inputtext:focus {
    outline: none;
    box-shadow: none;
    border-color: gray;
}

@media (max-width: 768px) {
    .contenedor-profiles {
        height: 900px
    }
}

.stepper-decorativo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.step-decorativo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
}

.step-circle-decorativo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    margin-bottom: 5px;
}

.step-decorativo.active .step-circle-decorativo {
    background-color: #611232;
}

.step-label-decorativo {
    font-size: 14px;
    color: #333;
}
</style>
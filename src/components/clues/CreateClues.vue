<template>
    <div class="row justify-content-center">
        <Fieldset class="fuente" legend="Crear nueva unidad">
            <div class="grid">

                <div style="margin-top:25px" class="row align-items-center">

                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Información de ubicación.</p>
                    </div>

                    <div class="row col-12">
                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                            <label class="fuente">Entidad federativa:</label>
                            <br>
                            <Dropdown v-model="state" v-on:change="getMunicipio()" :options="states" optionLabel="name"
                                :panelStyle="{
                                    'font-size': '1.4rem'
                                }" class="col-12 custom-calendar fuente" required />
                        </div>

                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                            <label class="fuente">Municipio:</label>
                            <br>
                            <Dropdown v-model="municipality" v-on:change="getLocality()" :options="municipalitys"
                                optionLabel="name" :panelStyle="{
                                    'font-size': '1.4rem'
                                }" class="col-12 custom-calendar fuente" required />
                        </div>

                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                            <label class="fuente">Localidad:</label>
                            <br>
                            <Dropdown v-model="locality" :options="localitys" optionLabel="name" :panelStyle="{
                                'font-size': '1.4rem'
                            }" class="col-12 custom-calendar fuente" required />
                        </div>

                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                            <label class="fuente">Instituciones:</label>
                            <br>
                            <Dropdown v-model="institucion" :options="instituciones" optionLabel="name" :panelStyle="{
                                'font-size': '1.4rem'
                            }" class="col-12 custom-calendar fuente" required />
                        </div>
                    </div>

                    <td><br></td>

                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Información del establecimiento.</p>
                    </div>

                    <div class="row col-12">
                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                            <label class="fuente">CLUES:</label>
                            <br>
                            <input type="text" v-model="clues" class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-9 text-center text-md-left">
                            <label class="fuente">
                                Nombre del establecimiento:</label>
                            <br>
                            <input type="text" v-model="nombreUnidad" class="col-12 input-search fuente" required>
                        </div>
                    </div>

                    <td><br></td>

                    <div class="col-12 text-center text-md-left">
                        <p class="fuente">Información adicional.</p>
                    </div>

                    <div class="row col-12">
                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Jurisdicción:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.jurisdictionName" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Nivel de atención:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.attentionLevelName" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Estrato:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.strato" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Código Postal:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.postalCode" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">RFC:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.rfc" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Estatus:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.status" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <td><br></td>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Dirección:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.direction" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Latitud:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.latitud" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Longitud:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.longitud" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Ultimo movimiento:</label>
                            <br>
                            <input type="text" v-model="formDataAditional.lastMove" 
                            class="col-12 input-search fuente" required>
                        </div>

                        <div class="col-sm-12 col-md-2 text-center text-md-left">
                            <label class="fuente">Fecha del ultimo movimiento:</label>
                            <br>
                            <Calendar v-model="formDataAditional.dateLastMove" 
                            class="custom-calendar col-12" :minDate="today" required />
                        </div>

                        <td><br></td>

                        <div class="col-sm-12 col-md-6 text-center text-md-left">
                            <Button style="height: 44px;" class="Button-manager custom-icon" label="Guardar"
                                icon="pi pi-save" @click="SaveClues()" />
                        </div>

                    </div>
                </div>
            </div>
        </Fieldset>
    </div>
    <br><br>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import Fieldset from 'primevue/fieldset';
import swal from 'sweetalert';
import { MannagerError } from '@/errors/MannagerErros';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;

const states = ref(null);
const state = ref(null);
const municipalitys = ref(null);
const municipality = ref(null);
const localitys = ref(null);
const locality = ref(null);
const instituciones = ref(null);
const institucion = ref(null);
const clues = ref(null);
const nombreUnidad = ref(null);
const formDataAditional = ref({
    jurisdictionName: '',
    attentionLevelName: '',
    strato: '',
    postalCode: '',
    rfc: '',
    status: '',
    direction: '',
    latitud: '',
    longitud: '',
    lastMove: '',
    dateLastMove: ''
});

const config = {
    headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

onMounted(async () => {
    getState();
    const response = await axios.post(`${url}/api/common/institutions`);
    instituciones.value = response.data;
});

const getState = async () => {
    try {
        const response = await axios.get(`${url}/api/location/with-id/state`, config);
        states.value = response.data;
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const getMunicipio = async () => {
    try {
        const response = await axios.get(`${url}/api/location/with-id/municipality/${state.value.id}`, config);
        municipalitys.value = response.data;
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const getLocality = async () => {
    try {
        const response = await axios.get(`${url}/api/location/with-id/locality/${municipality.value.id}`, config);
        localitys.value = response.data;
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

const SaveClues = async () => {
    try {
        if (state.value == null || municipality.value == null || locality.value == null ||
            institucion.value == null || clues.value == null || nombreUnidad.value == null) {
            toast.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Ingresa los datos que se solicitan',
                life: 2000
            });
        }
        else {
            const response = await axios.post(`${url}/api/clue/create`, {
                stateId: state.value.id,
                municipalityId: municipality.value.id,
                localityId: locality.value.id,
                institutionId: institucion.value.id,
                value: clues.value,
                unityName: nombreUnidad.value,
                jurisdictionName: formDataAditional.jurisdictionName,
                attentionLevelName: formDataAditional.attentionLevelName,
                strato: formDataAditional.strato,
                postalCode: formDataAditional.postalCode,
                rfc: formDataAditional.rfc,
                status: formDataAditional.status,
                direction: formDataAditional.direction,
                latitud: formDataAditional.latitud,
                longitud: formDataAditional.longitud,
                lastMove: formDataAditional.lastMove,
                dateLastMove: formDataAditional.dateLastMove
            }, config);

            if (response.status === 201) {
                swal("Se registro con exito la unidad (Clues)!", {
                    icon: "success",
                    title: "Atención!",
                    buttons: "OK"
                })
                    .then((Ok) => {
                        if (Ok) {
                            window.location.reload();
                        }
                    });
            }
        }
    }
    catch (error) {
        MannagerError(error, router, authStore, toast);
    }
};

</script>

<style></style>
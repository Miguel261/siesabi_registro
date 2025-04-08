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
                            <Dropdown v-model="state" v-on:change="getMunicipio()" :options="states"
                                optionLabel="name" :panelStyle="{
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
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al hacer la petición al servidor Codigo: ${error.status}`,
            life: 2000
        });
        console.log(error);
    }
};

const getMunicipio = async () => {
    try {
        const response = await axios.get(`${url}/api/location/with-id/municipality/${state.value.id}`, config);

        municipalitys.value = response.data;
    }
    catch (error) {
        console.log(error);
    }
};

const getLocality = async () => {
    try {
        const response = await axios.get(`${url}/api/location/with-id/locality/${municipality.value.id}`, config);

        localitys.value = response.data;
    }
    catch (error) {
        console.log(error);
    }
};

const SaveClues = async () =>{
    try{
        if(state.value == null || municipality.value == null || locality.value == null ||
            institucion.value == null || clues.value == null || nombreUnidad.value == null){
            toast.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Ingresa los datos que se solicitan',
                life: 2000
            });
        }
        else{
            const response = await axios.post(`${url}/api/clue/create`, {
                state_id: state.value.id,
                municipality_id: municipality.value.id,
                locality_id: locality.value.id,
                institution_id: institucion.value.id,
                value: clues.value,
                unity_name: nombreUnidad.value
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
    catch(error){
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al hacer la petición al servidor Codigo: ${error.status}`,
            life: 2000
        });
        console.log(error);
    }
};

</script>

<style></style>
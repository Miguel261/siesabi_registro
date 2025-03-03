<template>
    <div class="procesando" v-if="hasUserInfo">
        <div class="container-fluid contendor-img">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-12 d-flex justify-content-center align-items-center">
                    <img src="/public/images/gobierno-mexico.png" alt="imss-bienestar logo" class="img-fluid col-4 me-2">
                    <img src="/public/images/IMSS-BIENESTAR H Color.png" alt="imss-bienestar logo"
                        class="img-fluid col-4 ms-2">
                </div>
            </div>
        </div>

        <br>

        <div class="container-fluid col-12">
            <div class="row">
                <div class="barra-titulo col-12 justify-content-center text-center align-items-center">
                    <label class="fuente-titulos" for="">CORDINACIÓN DE EDUCACIÓN E INVESTIGACIÓN</label>
                </div>
                <div class="barra-titulo col-4 justify-content-center text-center align-items-center">
                    <label class="fuente" for="">Nombre</label>
                </div>
                <div class="barra-titulo col-4 justify-content-center text-center align-items-center">
                    <label class="fuente" for="">Cargo</label>
                </div>
                <div class="barra-titulo col-4 justify-content-center text-center align-items-center">
                    <label class="fuente" for="">Correo Institucional</label>
                </div>
                <div class="barra-puesto col-12 justify-content-center text-center align-items-center">
                    <label class="fuente-puesto" for="">Coordinación de Educación e Investigación</label>
                </div>

                <!-- Iterar sobre cada coordinador -->
                <template v-for="(coordinadorItem, index) in coordinador" :key="index">
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'person-' + index">{{ coordinadorItem.person }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'position-' + index">{{ coordinadorItem.position
                            }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'email-' + index">{{ coordinadorItem.email }}</label>
                    </div>
                </template>

                <div class="barra-puesto col-12 justify-content-center text-center align-items-center">
                    <label class="fuente-puesto" for="">División de Educación y Formación en Salud</label>
                </div>

                <!-- Iterar sobre def -->
                <template v-for="(defItem, index) in def" :key="index">
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'person-' + index">{{ defItem.person }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'position-' + index">{{ defItem.position
                            }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'email-' + index">{{ defItem.email }}</label>
                    </div>
                </template>

                <div class="barra-puesto col-12 justify-content-center text-center align-items-center">
                    <label class="fuente-puesto" for="">División de Investigación Médica</label>
                </div>

                <!-- Iterar sobre dim -->
                <template v-for="(dimItem, index) in dim" :key="index">
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'person-' + index">{{ dimItem.person }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'position-' + index">{{ dimItem.position
                            }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'email-' + index">{{ dimItem.email }}</label>
                    </div>
                </template>

                <div class="barra-puesto col-12 justify-content-center text-center align-items-center">
                    <label class="fuente-puesto" for="">División de Calidad y Certificación Médica</label>
                </div>

                <!-- Iterar sobre dim -->
                <template v-for="(dccmtem, index) in dccm" :key="index">
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'person-' + index">{{ dccmtem.person }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'position-' + index">{{ dccmtem.position
                            }}</label>
                    </div>
                    <div class="barra-persona col-4 justify-content-center align-items-center">
                        <label class="fuente-persona" :for="'email-' + index">{{ dccmtem.email }}</label>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <br><br>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';

const url = import.meta.env.VITE_URL_HOST;

onMounted(() => {
    getDirectory()
});

const directory = ref(null);
const coordinador = ref(null);
const def = ref(null);
const dim = ref(null);
const dccm = ref(null);

const hasUserInfo = computed(() => directory.value !== null);


const getDirectory = async () => {
    try {
        const response = await axios.get(`${url}/api/directory`);
        directory.value = response.data;
        coordinador.value = response.data['Coordinación de Educación e Investigación'];
        def.value = response.data['División de Educación y Formación en Salud'];
        dim.value = response.data['División de Investigación Médica'];
        dccm.value = response.data['División de Calidad y Certificación Médica'];
        console.log(response.data);

    } catch (error) {
        console.error(error);
    }
};

</script>

<style scoped>

.procesando{
    padding: 30px;
}
.contendor-img {
    margin-top: 80px;
}

.barra-titulo {
    background-color: maroon;
    color: white;
    border-width: 1px;
    border-bottom-color: #9ebdc2;
    border-style: solid;
}

.barra-puesto {
    background-color: #e0cca4;
}

.barra-persona {
    border-color: #9ebdc2;
    border-width: 1px;
    border-style: solid;
    display: flex;
    /* Asegura que el contenedor use Flexbox */
    justify-content: center;
    /* Centra horizontalmente */
    align-items: center;
    /* Centra verticalmente */
    padding: 10px;
    /* Añade un padding para evitar que el texto toque los bordes */
    box-sizing: border-box;
    /* Incluye el padding en el ancho total */
}

.fuente-titulos {
    color: white;
    font-size: clamp(14px, 2vw, 20px);
    cursor: pointer;
    font-family: 'Noto Sans';
    font-weight: bold;
    margin-top: 3px;
}

.fuente {
    color: white;
    font-size: clamp(14px, 2vw, 20px);
    cursor: pointer;
    font-family: 'Noto Sans';
    margin-top: 3px;
}

.fuente-puesto {
    color: black;
    font-size: clamp(14px, 2vw, 20px);
    cursor: pointer;
    font-family: 'Noto Sans';
    margin-top: 3px;
}


.fuente-persona {
    color: black;
    font-size: clamp(10px, 2vw, 15px);
    cursor: pointer;
    font-family: 'Noto Sans';
    margin-top: 3px;
    text-align: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

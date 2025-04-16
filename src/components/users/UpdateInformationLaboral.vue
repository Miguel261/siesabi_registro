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
                                    Configuración de datos laborales
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

        <br><br>

        <div v-if="name" class="row justify-content-center">
            <div class="card col-md-12 col-sm-12">
                <div class="row">
                    <div class="col-md-6">
                        <Fieldset class="fuente" legend="Actualizar información laboral de la unidad">
                            <div class="grid">

                                <div style="margin-top:25px" class="row align-items-center">

                                    <div class="col-12 text-center text-md-left">
                                        <p class="fuente">Tenga cuidado con los datos que registra ya que servirán para
                                            su
                                            seguimiento
                                            individual y colectivo.</p>
                                    </div>

                                    <td><br></td>

                                    <div class="row col-12">

                                        <div class="col-sm-12 col-md-6 text-center text-md-left">
                                            <label class="fuente">País:</label>
                                            <br>
                                            <Dropdown v-on:change="paisChange" v-model="formData.pais"
                                                :options="paisOptions" optionLabel="name" :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="countriesDiv" class="col-sm-12 col-md-6 text-center text-md-left"
                                            style="display: none;">
                                            <label class="fuente">¿Otro país?:</label>
                                            <br>
                                            <Dropdown v-model="formData.otroPais" :options="countries" :panelStyle="{
                                                'font-size': '1.4rem'
                                            }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <td></td>

                                        <div ref="estadoDiv" class="col-sm-12 col-md-4 text-center text-md-left">
                                            <label class="fuente">Estado donde labora:</label>
                                            <br>
                                            <Dropdown filter v-on:change="getMunicipio" v-model="formData.state"
                                                :options="states" optionLabel="stateName" :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="municipioDiv"
                                            class=" col-sm-12 col-md-4 text-center text-md-left mb-3 mb-md-0">
                                            <label class="fuente">Municipio donde labora:</label>
                                            <br>
                                            <Dropdown filter v-on:change="getLocality" id="municipio"
                                                v-model="formData.municipality" :options="municipalitys" :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" optionLabel="municipalityName" class="col-12 custom-calendar fuente"
                                                required />
                                        </div>

                                        <div ref="localidadDiv" class="col-sm-12 col-md-4 text-center text-md-left">
                                            <label class="fuente">Localidad donde labora:</label>
                                            <br>
                                            <Dropdown filter v-on:change="activateDrpdown" v-model="formData.locality"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" :options="localitys" optionLabel="localityName"
                                                class="col-12 custom-calendar fuente" required />
                                        </div>



                                        <div ref="institucionDiv" class="col-sm-12 col-md-5 text-center text-md-left">
                                            <label class="fuente">Institución que lo contrata (nómina):</label>
                                            <br>
                                            <Dropdown filter v-on:change="getClues" v-model="formData.institution"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" :options="institutions" optionLabel="name"
                                                class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="otraInstitutionDiv"
                                            class="col-sm-12 col-md-3 text-center text-md-left" style="display: none;">
                                            <label class="fuente">Otra institución:</label>
                                            <br>
                                            <input type="text" v-model="formData.otraInstitution"
                                                class="col-12 input-search fuente" required>
                                        </div>


                                        <div ref="cluesDiv" class="col-sm-12 col-md-6 text-center text-md-left">
                                            <label class="fuente">Clave Única de Establecimientos de Salud
                                                (CLUES):</label>
                                            <br>
                                            <Dropdown v-on:change="changeClues" v-model="formData.clues" :panelStyle="{
                                                'font-size': '1.4rem'
                                            }" :options="clues" optionLabel="value"
                                                class="col-12 custom-calendar fuente" required />
                                        </div>


                                        <div ref="otroCluesDiv" class="col-sm-12 col-md-4 text-center text-md-left"
                                            style="display: none;">
                                            <label class="fuente">Otro CLUES:</label>
                                            <br>
                                            <input type="text" v-model="formData.otroClues"
                                                class="col-12 input-search fuente" required>
                                        </div>

                                        <div class="col-sm-12 col-md-3 text-center text-md-left">
                                            <label class="fuente">Nivel de atención:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.levelAtention" :options="level"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>



                                    </div>
                                </div>
                            </div>

                        </Fieldset>
                    </div>
                    <br>
                    <div class="col-md-6">
                        <Fieldset class="fuente" legend="Actualizar información laboral">
                            <div class="grid">

                                <div style="margin-top:25px" class="row align-items-center">

                                    <div class="col-12 text-center text-md-left">
                                        <p class="fuente">Tenga cuidado con los datos que registra ya que servirán para
                                            su
                                            seguimiento
                                            individual y colectivo.</p>
                                    </div>

                                    <td><br></td>

                                    <div class="row col-12">
                                        <div class="col-sm-12 col-md-6 text-center text-md-left">
                                            <label class="fuente">Cédula profesional de la licenciatura:</label>
                                            <br>
                                            <input type="text" v-model="formData.cedula"
                                                class="col-12 input-search fuente" maxlength="10" required>
                                        </div>


                                        <div class="col-sm-12 col-md-6 text-center text-md-left">
                                            <label class="fuente">Matricula o número de empleado:</label>
                                            <br>
                                            <input type="text" @input="validateNumber" v-model="formData.matricula"
                                                class="col-12 input-search fuente" maxlength="10" required>
                                        </div>

                                        <div class="col-sm-12 col-md-4 text-center text-md-left">
                                            <label class="fuente">Grado Máximo de estudios:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.grado" :options="grades" :panelStyle="{
                                                'font-size': '1.4rem'
                                            }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>


                                        <div class="col-sm-12 col-md-4 text-center text-md-left">
                                            <label class="fuente">Categoría laboral:</label>
                                            <br>
                                            <Dropdown v-on:change="changeCategorie" filter :panelStyle="{
                                                'font-size': '1.4rem'
                                            }" v-model="formData.categorieLaboral" :options="categorieLaboral"
                                                optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="otroCategoriasDiv" class="col-sm-12 col-md-4 text-center text-md-left"
                                            style="display: none;">
                                            <label class="fuente">Otra Categoría laboral:</label>
                                            <br>
                                            <input type="text" v-model="formData.otraCategorieLaboral"
                                                class="col-12 input-search fuente" required>
                                        </div>

                                        <div class="col-sm-12 col-md-4 text-center text-md-left">
                                            <label class="fuente">Área laboral principal:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.area" :options="areas" optionLabel="name"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="categoriaMedicaDiv"
                                            class="col-sm-12 col-md-4 text-center text-md-left" style="display: none;">
                                            <label class="fuente">Categoría médica:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.medicalCategories"
                                                :options="medicalCategories" v-on:change="changeCategorieMedica"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="gradoResidenteDiv" class="col-sm-12 col-md-4 text-center text-md-left"
                                            style="display: none;">
                                            <label class="fuente">Grado de residente:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.residente" :options="residentes"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="especialidadesMedDiv"
                                            class="col-sm-12 col-md-4 text-center text-md-left" style="display: none;">
                                            <label class="fuente">Especialidad Médica:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.especialidadesMed" :options="specialties"
                                                :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="especialidadesEnfDiv"
                                            class="col-sm-12 col-md-4 text-center text-md-left" style="display: none;">
                                            <label class="fuente">Especialidades de enfermería:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.especialidadesEnf"
                                                :options="specialtiesEnf" optionLabel="name" :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div ref="especialidadesOdontoDiv"
                                            class="col-sm-12 col-md-4 text-center text-md-left" style="display: none;">
                                            <label class="fuente">Especialidad odontológicas:</label>
                                            <br>
                                            <Dropdown filter v-model="formData.especialidadesOdonto"
                                                :options="specialtiesOdonto" optionLabel="name" :panelStyle="{
                                                    'font-size': '1.4rem'
                                                }" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <div class="col-sm-12 col-md-12 text-center text-md-left">
                                            <label class="fuente">Cargo (En caso de ser Directivo seleccione su cargo
                                                más
                                                equivalente,
                                                si no
                                                es directivo seleccione No aplica):</label>
                                            <br>
                                            <Dropdown filter v-model="formData.cargo" :options="cargos" :panelStyle="{
                                                'font-size': '1.4rem'
                                            }" optionLabel="name" class="col-12 custom-calendar fuente" required />
                                        </div>

                                        <td><br></td>

                                        <div class="col-sm-12 col-md-8 text-center text-md-left">
                                            <Button style="height: 44px;"
                                                class="col-sm-12 col-md-5 Button-manager custom-icon"
                                                label="Actualizar datos" icon="pi pi-refresh"
                                                @click="updateUserProfiles" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <br>
                        </Fieldset>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Fieldset from 'primevue/fieldset';
import axios from "axios";
import { useAuthStore } from '@/stores/auth';
import router from "@/router";
import swal from 'sweetalert';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { handleGeneralError } from "@/errors/GeneralErrors";

const toast = useToast();
const authStore = useAuthStore();
const isLoading = ref(false);
const name = ref(null);

const url = import.meta.env.VITE_URL_HOST;

onMounted(async () => {
    await getData();
    await getInformationUser();
    authStore.refreshTokenStore();
});

const formData = ref({
    pais: '',
    otroPais: '',
    state: '',
    municipality: '',
    locality: '',
    institution: '',
    otraInstitution: '',
    clues: '',
    otroClues: '',
    levelAtention: '',
    cedula: '',
    matricula: '',
    grado: '',
    categorieLaboral: '',
    otraCategorieLaboral: '',
    medicalCategories: '',
    residente: '',
    especialidadesMed: '',
    especialidadesEnf: '',
    especialidadesOdonto: '',
    area: '',
    cargo: '',
});

const countries = ref(null);
const states = ref([]);
const municipalitys = ref(null);
const localitys = ref(null);
const institutions = ref(null);
const clues = ref(null);
const level = ref(null);
const grades = ref(null);
const categorieLaboral = ref(null);
const areas = ref(null);
const cargos = ref(null);
const medicalCategories = ref(null);
const residentes = ref(null);
const specialties = ref(null);
const specialtiesEnf = ref(null);
const specialtiesOdonto = ref(null);

const getInformationUser = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${url}/api/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        isLoading.value = false;
        name.value = response.data.name;

        if (response.data.laboral.countryId == 42) {
            formData.value.pais = paisOptions.find(g => g.code === 42);
        }
        else {
            formData.value.pais = paisOptions.find(g => g.name === 'Otro');
        }


        if (response.data.laboral.stateName != null) {
            formData.value.state = Array.isArray(states.value)
                ? states.value.find(g => g.stateName === response.data.laboral.stateName)
                : null;
            await getMunicipio();
        }

        if (response.data.laboral.municipalityName != null) {
            formData.value.municipality = Array.isArray(municipalitys.value)
                ? municipalitys.value.find(g => g.municipalityName === response.data.laboral.municipalityName)
                : null;

            await getLocality();
        }

        formData.value.locality = Array.isArray(localitys.value)
            ? localitys.value.find(g => g.localityName === response.data.laboral.localityName)
            : null;


        if (response.data.laboral.institutionName != null) {
            formData.value.institution = Array.isArray(institutions.value)
                ? institutions.value.find(g => g.name === response.data.laboral.institutionName)
                : null;

            await getClues();
        } else {
            formData.value.institution = Array.isArray(institutions.value)
                ? institutions.value.find(g => g.name === 'OTRA')
                : null;

            clues.value = [{ id: 0, value: 'Otro' }];

            otraInstitutionDiv.value.style.display = 'block';
            formData.value.otraInstitution = response.data.laboral.otherInstitution;
        }

        if (response.data.laboral.clues === null) {
            formData.value.clues = Array.isArray(clues.value)
                ? clues.value.find(g => g.value === 'Otro')
                : null;

            formData.value.otroClues = response.data.laboral.otherClues;

            otroCluesDiv.value.style.display = 'block';
        }
        else {

            formData.value.clues = Array.isArray(clues.value)
                ? clues.value.find(g => g.value === response.data.laboral.clues)
                : null;
        }

        if (response.data.laboral.attentionLevelName === null) {
            formData.value.levelAtention = Array.isArray(level.value)
                ? level.value.find(g => g.name === 'No aplica')
                : null;
        }
        else {
            formData.value.levelAtention = Array.isArray(level.value)
                ? level.value.find(g => g.name === response.data.laboral.attentionLevelName)
                : null;
        }

        formData.value.cedula = response.data.laboral.cedule;
        formData.value.matricula = response.data.laboral.employeeNumber;

        formData.value.grado = Array.isArray(grades.value)
            ? grades.value.find(g => g.name === response.data.laboral.gradeName)
            : null;

        if (response.data.laboral.laboralCategoryId > 0) {
            formData.value.categorieLaboral = Array.isArray(categorieLaboral.value)
                ? categorieLaboral.value.find(g => g.name === response.data.laboral.laboralCategoryName)
                : null;

            if (response.data.laboral.laboralCategoryName === 'Enfermería') {
                especialidadesEnfDiv.value.style.display = 'block';

                formData.value.especialidadesEnf = Array.isArray(specialtiesEnf.value)
                    ? specialtiesEnf.value.find(g => g.name === response.data.laboral.specialtyName)
                    : null;
            }

            if (response.data.laboral.laboralCategoryName === 'Odontología') {
                especialidadesOdontoDiv.value.style.display = 'block';

                formData.value.especialidadesOdonto = Array.isArray(specialtiesOdonto.value)
                    ? specialtiesOdonto.value.find(g => g.name === response.data.laboral.specialtyName)
                    : null;
            }

            if (response.data.laboral.laboralCategoryName === 'Medico') {
                categoriaMedicaDiv.value.style.display = 'block';

                formData.value.medicalCategories = Array.isArray(medicalCategories.value)
                    ? medicalCategories.value.find(g => g.name === response.data.laboral.medicalCategoryName)
                    : null;


                if (response.data.laboral.gradeName === 'Estudiante de especialidad (en curso)' ||
                    response.data.laboral.medicalCategoryName === 'Médico Residente') {
                    gradoResidenteDiv.value.style.display = 'block';

                    formData.value.residente = Array.isArray(residentes.value)
                        ? residentes.value.find(g => g.name === response.data.laboral.residentGradeName)
                        : null;
                }

                if (response.data.laboral.medicalCategoryName === 'Médico Especialista'){
                    especialidadesMedDiv.value.style.display = 'block';
                }

                if (response.data.laboral.specialtyName != null) {
                    especialidadesMedDiv.value.style.display = 'block';
                    formData.value.especialidadesMed = Array.isArray(specialties.value)
                        ? specialties.value.find(g => g.name === response.data.laboral.specialtyName)
                        : null;
                }
            }
        }
        else {
            otroCategoriasDiv.value.style.display = 'block';
            formData.value.otraCategorieLaboral = response.data.laboral.otherLaboralCategory;
        }

        formData.value.area = Array.isArray(areas.value)
            ? areas.value.find(g => g.name === response.data.laboral.laboralAreaName)
            : null;

        formData.value.cargo = Array.isArray(cargos.value)
            ? cargos.value.find(g => g.name === response.data.laboral.positionName)
            : null;
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

const getData = async () => {
    try {
        const responseCountries = await axios.post(`${url}/api/location/countries`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        const responseStates = await axios.post(`${url}/api/location/state`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.getAccessToken}`
            }
        });

        const responseInstitutions = await axios.post(`${url}/api/common/institutions`);
        const responseLevelAtention = await axios.post(`${url}/api/common/atention-levels`);
        const responseGrade = await axios.post(`${url}/api/common/grades`);
        const responseCategorieLaboral = await axios.post(`${url}/api/common/laboral_categories`);
        const responseArea = await axios.post(`${url}/api/common/laboral_areas`);
        const responseCargos = await axios.post(`${url}/api/common/positions`);
        const responseMedicalCategories = await axios.post(`${url}/api/common/medical_categories`);
        const responseResidentes = await axios.post(`${url}/api/common/resident_grades`);
        const responseEspecialidades = await axios.post(`${url}/api/common/specialties`, { laboral_category_id: 1 });
        const responseEspsEnf = await axios.post(`${url}/api/common/specialties`, { laboral_category_id: 2 });
        const responseEspsOdont = await axios.post(`${url}/api/common/specialties`, { laboral_category_id: 3 });

        let categorias = [];
        let instituciones = [];

        countries.value = responseCountries.data;
        states.value = responseStates.data;
        level.value = responseLevelAtention.data;
        grades.value = responseGrade.data;
        areas.value = responseArea.data;
        cargos.value = responseCargos.data;
        medicalCategories.value = responseMedicalCategories.data;
        residentes.value = responseResidentes.data;
        specialties.value = responseEspecialidades.data;
        specialtiesEnf.value = responseEspsEnf.data;
        specialtiesOdonto.value = responseEspsOdont.data;

        categorias = responseCategorieLaboral.data;
        categorias.push({ id: 0, name: 'Otra' });
        categorieLaboral.value = categorias;
        instituciones = responseInstitutions.data;
        instituciones.push({ id: 0, name: 'OTRA' });
        institutions.value = instituciones;
    }
    catch (error) {
        handleGeneralError(error, router, authStore);
    }
};

/*OPTIONS*/

const paisOptions = [
    { name: 'México', code: 42 },
    { name: 'Otro', code: null },
];

const countriesDiv = ref(null);
const estadoDiv = ref(null);
const municipioDiv = ref(null);
const localidadDiv = ref(null);
const institucionDiv = ref(null);
const cluesDiv = ref(null);
const otroCluesDiv = ref(null);
const otroCategoriasDiv = ref(null);
const otraInstitutionDiv = ref(null);
const categoriaMedicaDiv = ref(null);
const gradoResidenteDiv = ref(null);
const especialidadesEnfDiv = ref(null);
const especialidadesOdontoDiv = ref(null);
const especialidadesMedDiv = ref(null);


const validateNumber = (event) => {
    formData.value.matricula = event.target.value.replace(/\D/g, '');
    event.target.value = formData.value.matricula;
};


const paisChange = () => {
    if (formData.value.pais.code == 42) {
        countriesDiv.value.style.display = 'none';
        estadoDiv.value.style.display = 'block';
        municipioDiv.value.style.display = 'block';
        localidadDiv.value.style.display = 'block';
        institucionDiv.value.style.display = 'block';
        cluesDiv.value.style.display = 'block';
    }
    else {
        countriesDiv.value.style.display = 'block';
        estadoDiv.value.style.display = 'none';
        municipioDiv.value.style.display = 'none';
        localidadDiv.value.style.display = 'none';
        institucionDiv.value.style.display = 'none';
        cluesDiv.value.style.display = 'none';
    }
};

const getMunicipio = async () => {
    try {
        const response = await axios.post(`${url}/api/location/municipality`,
            { stateName: formData.value.state.stateName },
            {
                headers: {
                    'Authorization': `Bearer ${authStore.getAccessToken}`
                }
            });

        municipalitys.value = response.data;
    }
    catch (error) {
        console.log(error);
    }
};

const getLocality = async () => {
    try {
        const response = await axios.post(`${url}/api/location/locality`,
            {
                stateName: formData.value.state.stateName,
                municipalityName: formData.value.municipality.municipalityName
            },
            {
                headers: {
                    'Authorization': `Bearer ${authStore.getAccessToken}`
                }
            });

        localitys.value = response.data;
    }
    catch (error) {
        console.log(error);
    }
};

const ReturnPage = () => {
    router.push('/dashboard');
};

const getClues = async () => {
    try {

        if (formData.value.institution.name === 'OTRA') {
            otraInstitutionDiv.value.style.display = 'block';
            otroCluesDiv.value.style.display = 'block';
            cluesDiv.value.style.display = 'none';
        }
        else {
            otraInstitutionDiv.value.style.display = 'none';
            cluesDiv.value.style.display = 'block';
            const response = await axios.post(`${url}/api/location/clues`,
                {
                    stateName: formData.value.state.stateName,
                    municipalityName: formData.value.municipality.municipalityName,
                    localityName: formData.value.locality.localityName,
                    institution_id: parseInt(formData.value.institution.id)
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authStore.getAccessToken}`
                    }
                });

            if (response.data.length === 0) {
                clues.value = [{ id: 0, value: 'Otro' }];
            } else {
                const cluesArray = response.data;
                cluesArray.push({ id: 0, value: 'Otro' });
                clues.value = cluesArray;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

const changeClues = () => {
    if (formData.value.clues.value === 'Otro') {
        otroCluesDiv.value.style.display = 'block';
    }
    else {
        otroCluesDiv.value.style.display = 'none';
    }
};

const changeCategorieMedica = () => {
    let categorie = formData.value.medicalCategories.name;
    switch (categorie) {
        case 'Médico Especialista':
            especialidadesMedDiv.value.style.display = 'block';
            break;
        case 'Médico Residente':
            gradoResidenteDiv.value.style.display = 'block';
            especialidadesMedDiv.value.style.display = 'block';
            break;
        default:
            gradoResidenteDiv.value.style.display = 'none';
            especialidadesMedDiv.value.style.display = 'none';
            formData.value.residente = null;
            formData.value.especialidadesMed = null;
            break;
    }
};

const changeCategorie = () => {
    let categorie = formData.value.categorieLaboral.name;
    switch (categorie) {
        case 'Otra':
            otroCategoriasDiv.value.style.display = 'block';
            categoriaMedicaDiv.value.style.display = 'none';
            gradoResidenteDiv.value.style.display = 'none';
            especialidadesEnfDiv.value.style.display = 'none';
            especialidadesOdontoDiv.value.style.display = 'none';
            break;
        case 'Medico':
            categoriaMedicaDiv.value.style.display = 'block';
            especialidadesEnfDiv.value.style.display = 'none';
            especialidadesOdontoDiv.value.style.display = 'none';
            if (formData.value.grado.name === 'Estudiante de especialidad (en curso)' ||
                formData.value.medicalCategories.name === 'Médico Residente') {
                gradoResidenteDiv.value.style.display = 'block';
            }
            else {
                gradoResidenteDiv.value.style.display = 'none';
            }
            break;
        case 'Enfermería':
            especialidadesEnfDiv.value.style.display = 'block';
            categoriaMedicaDiv.value.style.display = 'none';
            gradoResidenteDiv.value.style.display = 'none';
            especialidadesOdontoDiv.value.style.display = 'none';
            especialidadesMedDiv.value.style.display = 'none';
            break;

        case 'Odontología':
            especialidadesOdontoDiv.value.style.display = 'block';
            especialidadesEnfDiv.value.style.display = 'none';
            categoriaMedicaDiv.value.style.display = 'none';
            gradoResidenteDiv.value.style.display = 'none';
            especialidadesMedDiv.value.style.display = 'none';
            break;

        default:
            otroCategoriasDiv.value.style.display = 'none';
            categoriaMedicaDiv.value.style.display = 'none';
            gradoResidenteDiv.value.style.display = 'none';
            especialidadesEnfDiv.value.style.display = 'none';
            especialidadesOdontoDiv.value.style.display = 'none';
            especialidadesMedDiv.value.style.display = 'none';
            break;
    }
};


const isFieldEmpty = (field) => {
  
    if (typeof field === 'object' && field !== null) {
        return !field.id && !field.code && !field.municipalityName && !field.localityName;
    }
   
    return field === '';
}


const updateUserProfiles = async () => {

    if (
        isFieldEmpty(formData.value.pais) ||
        isFieldEmpty(formData.value.categorieLaboral) ||
        isFieldEmpty(formData.value.municipality) ||
        isFieldEmpty(formData.value.locality) ||
        isFieldEmpty(formData.value.levelAtention) ||
        isFieldEmpty(formData.value.grado) ||
        formData.value.matricula === '' ||
        formData.value.cedula === ''
    ) {
        showToastRegister(); 
    }
    else {

        if (formData.value.matricula == 0) {
            showToastMatricula();
        } else {
            try {
                await axios.put(`${url}/api/update/laboral-profile`, {
                    country_id: parseInt(formData.value.pais.code),
                    other_country_id: parseInt(formData.value.otroPais.id),
                    state: formData.value.state.stateName,
                    municipality: formData.value.municipality.municipalityName,
                    locality: formData.value.locality.localityName,
                    clues_id: parseInt(formData.value.clues.id),
                    other_clues: formData.value.otroClues,
                    attention_level_id: parseInt(formData.value.levelAtention.id),
                    position_id: parseInt(formData.value.grado.id),
                    other_position: '',
                    institution_id: parseInt(formData.value.institution.id),
                    other_institution: formData.value.otraInstitution,
                    laboral_category_id: parseInt(formData.value.categorieLaboral.id),
                    other_laboral_category: formData.value.otraCategorieLaboral,
                    medical_category_id: parseInt(formData.value.medicalCategories?.id) || null,
                    laboral_area_id: parseInt(formData.value.area.id),
                    resident_grade_id: parseInt(formData.value.residente?.id) || null,
                    grade_id: parseInt(formData.value.grado.id),
                    specialty_id: parseInt(formData.value.especialidadesEnf?.id) ||
                        parseInt(formData.value.especialidadesOdonto?.id) ||
                        parseInt(formData.value.especialidadesMed?.id) || null,
                    number: formData.value.matricula,
                    professional_license: formData.value.cedula
                }, {
                    headers: {
                        'Authorization': `Bearer ${authStore.getAccessToken}`
                    }
                });

                swal("Se actualizo la información con exito!", {
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

            catch (error) {
                console.log(error);
                if (error.status === 409) {
                    showToastAdv()
                    router.push('/dashboard');
                }

                if (error.status === 401) {
                    router.push('/login');
                }
            }
        }
    }
};

const showToastAdv = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ya registraste esta información',
        life: 2000
    });
};

const showToastRegister = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingresa los datos que se solicitan',
        life: 2000
    });
};

const showToastMatricula = () => {
    toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La matricula es invalida',
        life: 2000
    });
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
    .cartaV2 {
        display: none;
    }
}
</style>
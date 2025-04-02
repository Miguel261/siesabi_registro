<template>
    <div class="col-12" style="top: 100px;">
        <div class="stepper-decorativo">
            <div class="step-decorativo active">
                <div class="step-circle-decorativo fuente">Paso 1</div>
                <div class="step-label-decorativo fuente">Registrar datos personales</div>
            </div>
            <div class="step-decorativo active">
                <div class="step-circle-decorativo fuente">Paso 2</div>
                <div class="step-label-decorativo fuente">Registrar datos laborales</div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="card col-md-12 col-sm-12">
                <div class="row">
                    <div class="col-md-6">
                        <Fieldset class="fuente" legend="Registrar información laboral de la unidad">
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
                        <Fieldset class="fuente" legend="Registrar información laboral">
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
                                                label="Registrar datos" icon="pi pi-save" @click="saveUserProfiles" />
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
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import axios from "axios";
import { useAuthStore } from '@/stores/auth';
import { handleGeneralError } from "@/errors/GeneralErrors";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Fieldset from 'primevue/fieldset';

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);

onMounted(async () => {
    await getInformationUser();
    getData();
    authStore.refreshTokenStore();
});

const url = import.meta.env.VITE_URL_HOST;

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

const countries = ref(null);
const states = ref(null);
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

const isDropdownState = ref(true);
const isDropdownMunicipio = ref(true);
const isDropdownLocality = ref(true);
const isDropdownInstitution = ref(true);
const isDropdownClues = ref(true);

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
        isDropdownState.value = false;
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
    isDropdownMunicipio.value = false;
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
    isDropdownLocality.value = false;
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

const activateDrpdown = () => {
    isDropdownInstitution.value = false;
};

const getClues = async () => {
    isDropdownClues.value = false;
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
                clues.value = response.data;
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

const saveUserProfiles = async () => {

    if (formData.value.pais.code === '' || formData.value.categorieLaboral.id === '' ||
        formData.value.levelAtention.id === '' || formData.value.grado.id === '' ||
        formData.value.matricula === '' || formData.value.cedula === '') {
        showToastRegister();
    }
    else {
        try {
            await axios.post(`${url}/api/register/laboral-profile`, {
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

            swal("Se registro con exito la información!", {
                icon: "success",
                title: "Atención!",
                buttons: "OK"
            })
                .then((Ok) => {
                    if (Ok) {
                        router.push('/dashboard');
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
</script>

<style></style>
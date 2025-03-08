<template>
     <div class="mb-5">
          <Dialog v-model:visible="visible" maximizable modal class="fs-4" header="Agregar un nuevo banner"
               :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
               <div class="d-flex flex-column gap-1 mb-4">
                    <label for="title" class="font-semibold">Titulo del pdf *</label>
                    <InputText id="title" v-model="formTitle" class="flex-auto fs-4" autocomplete="off" />
               </div>
               <div class="mt-4">
                    <FileUpload :auto="true" accept=".pdf" name="file" choose-label="Selecciona tu Archivo *"
                         :custom-upload="true" @select="onSelectFile" mode="basic" class="fs-4">
                    </FileUpload>
               </div>
               <div class="d-flex gap-2 my-4">
                    <Checkbox v-model="formVisible" inputId="visible" name="visible" value="Visible" />
                    <label for="visible">Visible</label>
               </div>
               <Button icon="pi pi-external-link" severity="danger" class="fs-4" @click="onSaveEducationalOffer"
                    label="Subir" />
               <p class="text-form text-secondary fs-5 mt-4">* Completa estos campos</p>
          </Dialog>

          <DataTable :value="educationalOffer" v-if="educationalOffer.length > 0"
               v-model:selection="educationalOfferSelected" class="fs-4" data-key="id" tableStyle="min-width: 50rem">
               <template #header>
                    <div class="pb-2 d-flex gap-2 justify-content-between">
                         <div class="fs-3">
                              Lista de archivos de Oferta Educativa
                         </div>
                         <div class="d-flex gap-2">
                              <Button icon="pi pi-external-link" class="fs-4" label="Agregar un nuevo archivo"
                                   @click="visible = true" />
                              <Button icon="pi pi-external-link" class="fs-4"
                                   :disabled="educationalOfferSelected.length < 1" severity="danger"
                                   label="Eliminar archivos selecconados" @click="deleteItems" />
                         </div>
                    </div>
               </template>
               <Column selectionMode="multiple" headerStyle="width: 3rem" style="width: 5%;"></Column>
               <Column field="id" header="ID" :sortable="true" style="width: 5%"></Column>
               <Column header="Publicado" style="width: 7%;">
                    <template #body="{ data }">
                         <button type="button" class="align-self-center fs-3 p-2 bg-transparent border-0"
                              @click="enableOrDisableFile(data.id, data.isEnabled)">
                              <i v-if="data.isEnabled" class="pi pi-eye fs-3"></i>
                              <i v-if="!data.isEnabled" class="pi pi-eye-slash fs-3"></i>
                         </button>
                    </template>
               </Column>
               <Column header="Titulo" style="width: 15%">
                    <template #body="{ data }">
                         <div class="d-flex justify-content-start gap-2 flex-wrap align-items-center">
                              <span>{{ data.name }}</span>
                              <span v-if="data.isEnabled" class="badge text-bg-primary">(Predeterminado)</span>
                         </div>
                    </template>
               </Column>
               <Column header="Enlace de descarga" style="width: 25%">
                    <template #body="{ data }">
                         <a :href="data.link" v-if="data.link" target="_blank">Descargar archivo</a>
                    </template>
               </Column>
          </DataTable>

          <div class="w-full bg-light p-5" v-if="educationalOffer.length < 1">
               <div class="pb-2 d-flex gap-5 flex-column align-items-center justify-content-center">
                    <div class="fs-3">
                         Sin Ofertas Educativas registrados, preciona el boton de abajo para agregar alguno
                    </div>
                    <div class="d-flex gap-2">
                         <Button icon="pi pi-external-link" class="fs-4" label="Agregar nuevo banner"
                              @click="visible = true" />
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import 'primeicons/primeicons.css';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import swal from 'sweetalert';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore()
const url = import.meta.env.VITE_URL_HOST;
const educationalOffer = ref([])
const educationalOfferSelected = ref([])
const rows = ref(0)
const visible = ref(false)

// Modal attr
const formTitle = ref('')
const formVisible = ref([])
const file = ref({})

onMounted(async () => {
     authStore.refreshToken
     await getAllFiles()
})

const config = {
     headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

const getAllFiles = async () => {
     const { status, data } = await axios.get(`${url}/api/educational-offer/all`, config)


     if (status == 200) {
          rows.value = data.size
          educationalOffer.value = []
          educationalOfferSelected.value = []
          Array.from(data.results).forEach(banner => educationalOffer.value.push(banner))
     }
}

const enableOrDisableFile = async (id, status) => {
     if (status) await disableBanner(id)
     else await enableBanner(id)

     await getAllFiles()
}

const enableBanner = async id => await axios.put(`${url}/api/educational-offer/${id}/enable`, null, config);
const disableBanner = async id => await axios.put(`${url}/api/educational-offer/${id}/disable`, null, config);

const deleteItem = async (id) => {
     await axios.delete(`${url}/api/educational-offer/${id}`, config)
          .catch(err => swal('Error!', 'Error al intentar eliminar el banner.' + err.message, 'error'))
}

const deleteItems = async () => {
     for (const banner of educationalOfferSelected.value) {
          await deleteItem(banner.id)
     }
     await getAllFiles()
     educationalOfferSelected.value = []
     swal({
          timer: 3000,
          title: 'Buenas noticias',
          text: 'Los archivos seleccionados se eliminaron correctamente',
          buttons: false,
          icon: 'success'
     })
}

const onSelectFile = event => {
     file.value = event.files[0]
}

const onSaveEducationalOffer = async () => {
     if (!validateForm()) {
          swal('Completa los campos', 'Debes de asignar un titulo y seleccionar una imagen almenos', 'info')
          return;
     }
     const body = new FormData()
     body.append('name', formTitle.value)
     body.append('is_enabled', formVisible.value.length > 0 ? 1 : 0)
     body.append('file', file.value)

     await axios.post(`${url}/api/educational-offer/create`, body, config)
          .then(async res => {
               if (res.status == 201) {
                    await getAllFiles()
               }
               return res;
          })
          .then(resetForm)
          .then((res) => onMessages(res))
          .catch(onMessages)
}

const validateForm = () => formTitle.value && file.value;

const resetForm = (res) => {
     formTitle.value = '';
     formVisible.value = [];
     file.value = {}
     visible.value = false
     return res;
}

const onMessages = (res) => {
     switch (res.status) {
          case 201:
               swal({
                    icon: 'success',
                    title: 'Excelente!',
                    text: 'Aviso de privacidad agregado correctamente',
                    timer: 3000,
                    buttons: false
               })
               break;
          case 409:
               swal({
                    icon: 'error',
                    title: 'Error',
                    text: res.response.data.message,
               })
               break;
          default:
               console.log(res.status)
               break;
     }
}
</script>

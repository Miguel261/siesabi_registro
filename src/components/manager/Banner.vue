<template>
     <Dialog v-model:visible="visible" maximizable modal class="fs-4" header="Agregar un nuevo banner"
          :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div class="d-flex flex-column gap-1 mb-4">
               <label for="title" class="font-semibold">Titulo de la imagen *</label>
               <InputText id="title" v-model="formTitle" class="flex-auto fs-4" autocomplete="off" />
          </div>
          <div class="d-flex flex-column gap-1">
               <label for="link" class="font-semibold">Enlace</label>
               <InputText id="link" v-model="formLink" class="mt-0 fs-4" autocomplete="off" />
          </div>
          <div class="mt-4">
               <FileUpload :auto="true" accept=".png, .jpg, .jpeg, .webp, .gif" name="file"
                    choose-label="Selecciona tu imagen *" :custom-upload="true" @select="onSelectFile" mode="basic"
                    class="fs-4">
               </FileUpload>
          </div>
          <div class="d-flex gap-2 my-4">
               <Checkbox v-model="formVisible" inputId="visible" name="visible" value="Visible" />
               <label for="visible">Visible</label>
          </div>
          <Button icon="pi pi-external-link" severity="danger" class="fs-4" @click="onSaveBanner" label="Subir" />
          <p class="text-form text-secondary fs-5 mt-4">* Completa estos campos</p>
     </Dialog>

     <DataTable :value="banners" v-if="banners.length > 0" v-model:selection="bannersSelected" class="fs-4"
          data-key="id" tableStyle="min-width: 50rem">
          <template #header>
               <div class="pb-2 d-flex gap-2 justify-content-between">
                    <div class="fs-3">
                         Lista de banners (solicitar banners con resolucion 1700x900)
                    </div>
                    <div class="d-flex gap-2">
                         <Button icon="pi pi-external-link" class="fs-4" label="Agregar nuevo banner"
                              @click="visible = true" />
                         <Button icon="pi pi-external-link" class="fs-4" :disabled="bannersSelected.length < 1"
                              severity="danger" label="Eliminar banners selecconados" @click="deleteItems" />
                    </div>
               </div>
          </template>
          <Column selectionMode="multiple" headerStyle="width: 3rem" style="width: 5%;"></Column>
          <Column field="order" header="Orden" :sortable="true" style="width: 5%"></Column>
          <Column v-if="banners.length > 1" header="Ajuste de orden" style="width: 7%;">
               <template #body="{ data }">
                    <div class="d-flex flex-column gap-1">
                         <button v-if="banners.at(0).id !== data.id" @click="itemUp(data.id)" type="button"
                              class="align-self-center pi pi-sort-up-fill fs-3 p-2 bg-transparent border-0"></button>
                         <button v-if="banners.at(banners.length - 1).id !== data.id" @click="itemDown(data.id)"
                              type=" button"
                              class="align-self-center pi pi-sort-down-fill fs-3 p-2 bg-transparent border-0"></button>
                    </div>
               </template>
          </Column>
          <Column header="Publicado" style="width: 7%;">
               <template #body="{ data }">
                    <button type="button" class="align-self-center fs-3 p-2 bg-transparent border-0"
                         @click="enableOrDisableBanner(data.id, data.is_enabled)">
                         <i v-if="data.is_enabled" class="pi pi-eye fs-3"></i>
                         <i v-if="!data.is_enabled" class="pi pi-eye-slash fs-3"></i>
                    </button>
               </template>
          </Column>
          <Column field="title" header="Titulo" style="width: 15%"></Column>
          <Column header="Imagen" style="width: 25%">
               <template #body="{ data }">
                    <Image :alt="data.image" class="w-24 rounded" width="50px" preview>
                         <template #image>
                              <p class="fs-4 p-2 text-primary">Ver imagen</p>
                         </template>
                         <template #preview="slotProps">
                              <img :src="data.image_name" :alt="data.title" :style="slotProps.style"
                                   @click="slotProps.onClick" />
                         </template>
                    </Image>
               </template>
          </Column>
          <Column header="Enlace" style="width: 25%">
               <template #body="{ data }">
                    <a :href="data.link" v-if="data.link" target="_blank">Seguir enlace</a>
                    <p v-if="!data.link">Enlace no configurado</p>
               </template>
          </Column>
     </DataTable>

     <div class="w-full bg-light p-5" v-if="banners.length < 1">
          <div class="pb-2 d-flex gap-5 flex-column align-items-center justify-content-center">
               <div class="fs-3">
                    Sin Banners registrados, preciona el boton de abajo para agregar alguno
               </div>
               <div class="d-flex gap-2">
                    <Button icon="pi pi-external-link" class="fs-4" label="Agregar nuevo banner"
                         @click="visible = true" />
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
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import swal from 'sweetalert';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore()
const url = import.meta.env.VITE_URL_HOST;
const banners = ref([])
const bannersSelected = ref([])
const rows = ref(0)
const visible = ref(false)
const formTitle = ref('')
const formLink = ref('')
const formVisible = ref([])
const file = ref({})

onMounted(async () => {
     authStore.refreshToken
     await getAllBanners()
})

const config = {
     headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

const getAllBanners = async () => {
     const { status, data } = await axios.get(`${url}/api/banner/all`, config)


     if (status == 200) {
          rows.value = data.size
          banners.value = []
          bannersSelected.value = []
          Array.from(data.results).forEach(banner => banners.value.push(banner))
     }
}

const itemUp = async (id) => {
     const { status } = await axios.put(`${url}/api/banner/${id}/up`, null, config);
     if (status == 200) await getAllBanners()
}

const itemDown = async (id) => {
     const { status } = await axios.put(`${url}/api/banner/${id}/down`, null, config);
     if (status == 200) await getAllBanners()
}

const enableOrDisableBanner = async (id, status) => {
     if (status) await disableBanner(id)
     else await enableBanner(id)

     await getAllBanners()
}

const enableBanner = async id => await axios.put(`${url}/api/banner/${id}/enable`, null, config);
const disableBanner = async id => await axios.put(`${url}/api/banner/${id}/disable`, null, config);

const deleteItem = async (id) => {
     await axios.delete(`${url}/api/banner/${id}`, config)
          .catch(err => swal('Error!', 'Error al intentar eliminar el banner.' + err.message, 'error'))
}

const deleteItems = async () => {
     for (const banner of bannersSelected.value) {
          await deleteItem(banner.id)
     }
     await getAllBanners()
     bannersSelected.value = []

     swal({
          timer: 3000,
          title: 'Buenas noticias',
          text: 'Los banners seleccionados se eliminaron correctamente',
          buttons: false,
          icon: 'success'
     })
}

const onSelectFile = event => {
     file.value = event.files[0]
}

const onSaveBanner = async () => {
     if (!validateForm()) {
          swal('Completa los campos', 'Debes de asignar un titulo y seleccionar una imagen almenos', 'info')
          return;
     }
     const body = new FormData()
     body.append('title', formTitle.value)
     body.append('link', formLink.value)
     body.append('is_enabled', formVisible.value.length > 0 ? 1 : 0)
     body.append('file', file.value)

     await axios.post(`${url}/api/banner/create`, body, config)
          .then(async res => {
               if (res.status == 201) {
                    await getAllBanners()
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
     formLink.value = '';
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
                    text: 'Banner agregado correctamente',
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
     }
}
</script>

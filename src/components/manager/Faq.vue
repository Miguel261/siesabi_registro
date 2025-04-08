<template>
     <div class="mb-5">

          <div class="row">
               <div class="col-12 justify-content-right text-right">
                    <Button style="height: 44px; color: white; background-color: #611232;"
                         class="col-md-2 col-sm-12  Button-manager custom-icon" @click="visible = true"
                         label="Agregar pregunta" icon="pi pi-plus" />
               </div>

          </div>

          <br><br>

          <DataTable :reorderableColumns="true" @columnReorder="onColReorder" @rowReorder="onRowReorder" :value="faqs"
               dataKey="id" responsiveLayout="scroll" showGridlines>
               <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="true" />
               <Column class="fuente" header="ID" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:1%;">
                    <template #body="slotProps">
                         {{ slotProps.data.id }}
                    </template>
               </Column>

               <Column class="fuente" header="Título" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:30%;">
                    <template #body="slotProps">
                         {{ slotProps.data.title }}
                    </template>
               </Column>

               <Column class="fuente" header="Orden" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:5%;">
                    <template #body="slotProps">
                         {{ slotProps.data.order }}
                    </template>
               </Column>

               <Column class="fuente" header="Contenido" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:50%;">
                    <template #body="slotProps">
                         {{ slotProps.data.content }}
                    </template>
               </Column>

               <Column class="fuente" header="Link" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:5%;">
                    <template #body="slotProps">
                         {{ slotProps.data.link }}
                    </template>
               </Column>

               <Column class="fuente" header="Fecha de creación" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:5%;">
                    <template #body="slotProps">
                         {{ moment(slotProps.data.created_at).format('DD/MM/YYYY') }}
                    </template>
               </Column>

               <Column class="fuente" header="Fecha de actualización" headerClass="column-header"
                    bodyClass="column-body" headerStyle="width:5%;">
                    <template #body="slotProps">
                         {{ moment(slotProps.data.updated_at).format('DD/MM/YYYY') }}
                    </template>
               </Column>

               <Column class="fuente" header="Visibilidad" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:5%;">
                    <template #body="slotProps">
                         {{ slotProps.data.is_public }}
                    </template>
               </Column>

               <Column class="fuente" header="Opciones" headerClass="column-header" bodyClass="column-body"
                    headerStyle="width:1%;">
                    <template #body="slotProps">
                         <Button icon="pi pi-cog" style="color: white; background-color: #611232;
                    border-color: #611232;" class="p-button-md p-button-rounded p-button custom-icon"
                              @click="viewOptions($event, slotProps.data)" title="Opciones" />

                         <OverlayPanel ref="overlayPanel" :dismissable="false">
                              <span class="fuente" style="color: black; font-weight: bold;">Opciones</span>
                              <Menu style="font-size: 13px;" class="fuente" ref="menuRef" :model="items" />
                         </OverlayPanel>
                    </template>
               </Column>

          </DataTable>

          <Dialog v-model:visible="visible" modal header="Agregar pregunta" :style="{ width: '50rem' }">
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Título</label>
                    <br>
                    <input type="text" v-model="formFaq.title" class="col-md-12 col-sm-12 input-search fuente" required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Subtítulo</label>
                    <br>
                    <input type="text" v-model="formFaq.sub_title" class="col-md-12 col-sm-12 input-search fuente"
                         required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Contenido</label>
                    <br>
                    <Textarea type="text" v-model="formFaq.content" class="col-md-12 col-sm-12 fuente" rows="6"
                         cols="30" required style="border-radius: 20px; border: 2px solid gray;" />
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Titulo Link</label>
                    <br>
                    <input type="text" v-model="formFaq.link_title" class="col-md-12 col-sm-12 input-search fuente"
                         required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Link</label>
                    <br>
                    <input type="text" v-model="formFaq.link" class="col-md-12 col-sm-12 input-search fuente" required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Visibilidad</label>
                    <br>
                    <Dropdown v-model="formFaq.is_public" :options="Options" optionLabel="name" :panelStyle="{
                         'font-size': '1.4rem'
                    }" class="col-12 custom-calendar fuente" required />
               </div>
               <br>
               <div class="d-flex justify-content-center">
                    <div class="row g-sm-3 g-md-0 col-12"> <!-- Gap solo en móvil (sm) -->
                         <div class="col-md-6 col-sm-6">
                              <Button type="button" label="Cancel" severity="secondary" @click="visible = false"
                                   class="Button-courses w-100"></Button>
                         </div>
                         <td class="td"><br></td>
                         <div class="col-md-6 col-sm-6">
                              <Button type="button" label="Guardar" @click="ConfirmSave"
                                   class="Button-manager w-100"></Button>
                         </div>
                    </div>
               </div>
               <br>
          </Dialog>


          <Dialog v-model:visible="visible2" modal header="Actualizar pregunta" :style="{ width: '50rem' }">
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Título</label>
                    <br>
                    <input type="text" v-model="faqData.title" class="col-md-12 col-sm-12 input-search fuente" required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Subtítulo</label>
                    <br>
                    <input type="text" v-model="faqData.slug_title" class="col-md-12 col-sm-12 input-search fuente"
                         required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Contenido</label>
                    <br>
                    <Textarea type="text" v-model="faqData.content" class="col-md-12 col-sm-12 fuente" rows="6"
                         cols="30" required style="border-radius: 20px; border: 2px solid gray;" />
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Titulo Link</label>
                    <br>
                    <input type="text" v-model="faqData.link_title" class="col-md-12 col-sm-12 input-search fuente"
                         required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Link</label>
                    <br>
                    <input type="text" v-model="faqData.link" class="col-md-12 col-sm-12 input-search fuente" required>
               </div>
               <div class="flex align-items-center gap-3 mb-3">
                    <label class="fuente w-6rem">Visibilidad</label>
                    <br>
                    <Dropdown v-model="faqData.is_public" :options="Options" optionLabel="name" :panelStyle="{
                         'font-size': '1.4rem' 
                    }" optionValue="code" class="col-12 custom-calendar fuente" required />
               </div>
               <br>
               <div class="d-flex justify-content-center">
                    <div class="row g-sm-3 g-md-0 col-12"> <!-- Gap solo en móvil (sm) -->
                         <div class="col-md-6 col-sm-6">
                              <Button type="button" label="Cancel" severity="secondary" @click="visible2 = false"
                                   class="Button-courses w-100"></Button>
                         </div>
                         <td class="td"><br></td>
                         <div class="col-md-6 col-sm-6">
                              <Button type="button" label="Actualizar" @click="ConfirmUpdate"
                                   class="Button-manager w-100"></Button>
                         </div>
                    </div>
               </div>
               <br>
          </Dialog>
     </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import moment from 'moment';
import OverlayPanel from 'primevue/overlaypanel';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();
const toast = useToast();

const url = import.meta.env.VITE_URL_HOST;
const faqs = ref([]);

const overlayPanel = ref(null);
const visible = ref(false);
const visible2 = ref(false);

const faqData = ref(null);

const viewOptions = (event, data) => {
     overlayPanel.value.toggle(event);
     faqData.value = data;
}

const formFaq = ref({
     title: '',
     sub_title: '',
     content: '',
     link: '',
     link_title: '',
     is_public: '',
})

const Options = [
     { name: 'Visible', code: 1 },
     { name: 'Oculto', code: 0 },
];

const items = [
     {
          label: 'Actualizar',
          icon: 'pi pi-sync',
          command: () => {
               visible2.value = true;
          }
     },
     {
          label: 'Eliminar',
          icon: 'pi pi-delete-left',
          command: () => {
               ConfirmDelete();
          }
     },

];

const onRowReorder = (event) => {
     faqs.value = event.value.map((item, index) => ({
          ...item,
          order: index + 1 
     }));

     updateOrderInBackend(faqs.value);

};

const updateOrderInBackend = async (reorderedFaqs) => {
     try {
        
          const faqs = reorderedFaqs.map(faq => ({
               id: faq.id,
               order: faq.order
          }));

          await axios.put(`${url}/api/faq/order`, { faqs }, config);

          toast.add({ severity: 'success', summary: 'Orden guardado', life: 3000 });
     } catch (error) {
          toast.add({ severity: 'error', summary: 'Error al guardar el orden', detail: error.message, life: 5000 });
          console.log(error)
     }
};

const onColReorder = () => {
     toast.add({ severity: 'success', summary: 'Orden cambiado', life: 3000 });
}

const config = {
     headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

onMounted(async () => {
     await getAllFaqs()
})

const getAllFaqs = async () => {
     try {
          const response = await axios.get(`${url}/api/faq/all`, config);
          faqs.value = response.data.results;
     }
     catch (error) {
          console.log(error);
     }
}

const ConfirmSave = async () =>{
     const userConfirmation = await swal({
          title: "Creación de pregunta nueva",
          text: "¿Seguro deseas agregar una nueva pregunta frecuente?",
          icon: "warning",
          buttons: {
               cancel: "No",
               confirm: "Sí",
          },
          dangerMode: true,
     });

     if (userConfirmation) {
          if (formFaq.value.title === '' || formFaq.value.sub_title === '' ||
               formFaq.value.content === '' || formFaq.value.is_public.code === ''
          ){
               showToast();
          }
          else{
               SaveFaq();
          }
     }
};

const ConfirmUpdate = async () =>{
     const userConfirmation = await swal({
          title: "Actualizar pregunta",
          text: "¿Seguro deseas actualizar está pregunta?",
          icon: "warning",
          buttons: {
               cancel: "No",
               confirm: "Sí",
          },
          dangerMode: true,
     });

     if (userConfirmation) {
          if (userConfirmation) {
               if (faqData.value.title === null || faqData.value.sub_title === null ||
                    faqData.value.content === null || faqData.value.is_public === null
               ) {
                    showToast();
                    console.log(faqData.value)
               }
               else {
                    UpdateFaq();
               }
          }
     }
};

const ConfirmDelete = async () => {
     const userConfirmation = await swal({
          title: "Eliminar pregunta",
          text: "¿Seguro deseas eliminar está pregunta?",
          icon: "warning",
          buttons: {
               cancel: "No",
               confirm: "Sí",
          },
          dangerMode: true,
     });

     if (userConfirmation) {
          DeleteFaq();
     }
};

const showToast = () => {
     toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'Ingresa los datos que se te estan solicitando',
          life: 2000
     });
};

const SaveFaq = async () =>{
     try {
    
          const response = await axios.post(`${url}/api/faq/create`, {
               title: formFaq.value.title,
               slug_title: formFaq.value.sub_title,
               content: formFaq.value.content,
               link: formFaq.value.link,
               link_title: formFaq.value.link_title,
               is_public: formFaq.value.is_public.code,

          }, config);
          
          if(response.status === 201){
               let message = `La pregunta fue creada con éxito`;
               showSuccess(message);
               visible.value = false;
               getAllFaqs();
          }
     }
     catch (error) {
          console.log(error);
     }
};

const DeleteFaq = async () =>{
     try {

          const response = await axios.delete(`${url}/api/faq/${faqData.value.id}`, config);

          if (response.status === 200) {
               showDeleteSuccess();
               getAllFaqs();
          }
     }
     catch (error) {
          console.log(error);
     }
};

const UpdateFaq = async () =>{
     try {
          console.log(faqData.value)
          const response = await axios.put(`${url}/api/faq/${faqData.value.id}/update`, {
               title: faqData.value.title,
               slug_title: faqData.value.slug_title,
               content: faqData.value.content,
               link: faqData.value.link,
               link_title: faqData.value.link_title,
               is_public: faqData.value.is_public,
          }, config);

          if (response.status === 200) {
               let message = `La pregunta fue actualizada con éxito`;
               visible2.value = false;
               showSuccess(message);
               getAllFaqs();
          }
     }
     catch (error) {
          console.log(error);
     }
};

const showSuccess = (message) => {
     toast.add({
          severity: 'success',
          summary: 'Exito',
          detail: `${message}`,
          life: 2000
     });
};

const showDeleteSuccess = () => {
     toast.add({
          severity: 'success',
          summary: 'Exito',
          detail: `La pregunta fue eliminada con éxito`,
          life: 2000
     });
};

</script>

<style>
.td {
     display: none;
}
@media (min-width: 200px) and (max-width: 900px) {
     .td {
          display: block;
     }
}
</style>
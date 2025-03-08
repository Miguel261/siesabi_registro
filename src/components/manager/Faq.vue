<template>
     <div class="mb-5">
          <div class="accordion" id="accordionPanelsStayOpenExample">
               <div class="accordion-item" v-for="(faq, index) in faqs">
                    <h2 class="accordion-header" id="{{ index }}-body">
                         <button class="accordion-button {{ index == 0 ? '' :'collapsed' }} fs-3" type="button"
                              data-bs-toggle="collapse" data-bs-target="#{{index}}"
                              aria-expanded="{{index == 0 ? 'true': 'false'}}" aria-controls="{{index}}">
                              {{ index + 1 }}. {{ faq.title }} {{ index == 0 }}
                         </button>
                    </h2>
                    <div id="{{index}}" class="accordion-collapse collapse {{index == 0 ? 'show': ''}}"
                         aria-labelledby="{{ index }}-body">
                         <div class="accordion-body">
                              <strong>This is the first item's accordion body.</strong> It is shown by default, until
                              the collapse plugin adds the appropriate classes that we use to style each element. These
                              classes control the overall appearance, as well as the showing and hiding via CSS
                              transitions. You can modify any of this with custom CSS or overriding our default
                              variables. It's also worth noting that just about any HTML can go within the
                              <code>.accordion-body</code>, though the transition does limit overflow.
                         </div>
                    </div>
               </div>
               <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                              data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseTwo">
                              Accordion Item #2
                         </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                         aria-labelledby="panelsStayOpen-headingTwo">
                         <div class="accordion-body">
                              <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                              the collapse plugin adds the appropriate classes that we use to style each element. These
                              classes control the overall appearance, as well as the showing and hiding via CSS
                              transitions. You can modify any of this with custom CSS or overriding our default
                              variables. It's also worth noting that just about any HTML can go within the
                              <code>.accordion-body</code>, though the transition does limit overflow.
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const url = import.meta.env.VITE_URL_HOST;
const faqs = ref([]);

const config = {
     headers: { 'Authorization': `Bearer ${authStore.getAccessToken}` }
}

onMounted(async () => {
     authStore.refreshToken
     await getAllFaqs()
})

const getAllFaqs = async () => {
     await axios.get(`${url}/api/faq/all`, config).then(res => {
          if (res.status != 200) {
               return;
          }
          faqs.value = []
          Array.from(res.data.results).forEach(faq => faqs.value.push(faq))
          console.log(faqs.value)
     }).catch(error => console.log(error.message))
}
</script>
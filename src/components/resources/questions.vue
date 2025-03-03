<template>
    <div v-if="hasUserInfo" style="margin-top: 100px;" class="container-fluid  col-sm-12 col-md-10">
        <label class="fuente-titulo">Preguntas más frecuentes</label>
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <template v-for="(questionItem, index) in questions" :key="index">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed fuente" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse' + index" aria-expanded="false"
                            :aria-controls="'collapse' + index">
                            {{ questionItem.title }}
                        </button>
                    </h2>
                    <div :id="'collapse' + index" class="accordion-collapse collapse fuente-interior">
                        <div class="accordion-body">
                            {{ questionItem.content }}
                            <a :href="questionItem.link">Más información</a>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <br><br>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';

const url = import.meta.env.VITE_URL_HOST;
const questions = ref(null);

onMounted(() => {
    getQuestions()
});

const hasUserInfo = computed(() => questions.value !== null);

const getQuestions = async () =>{
    try{
        const response = await axios.get(`${url}/api/faq`);
        questions.value = response.data.results;
    }
    catch (error) {
        console.error(error);
    }
};
 
</script>

<style scoped>
.fuente-titulo {
    color: black;
    font-size: 30px;
    cursor: pointer;
    font-family: 'Patria';
    margin-top: 3px;
    font-weight: bold;
}

.fuente {
    color: black;
    font-size: 20px;
    cursor: pointer;
    font-family: 'Noto Sans';
    margin-top: 3px;
    font-weight: bold;
}

.fuente-interior {
    color: black;
    font-size: 18px;
    cursor: pointer;
    font-family: 'Noto Sans';
    margin-top: 3px;
}
</style>

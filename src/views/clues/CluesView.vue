<template>
    <div style="margin-top: 100px;" class="container col-11 justify-content-center align-items-center text-center">
        <div class="container col-12">
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active fuente" id="list-clues-tab" data-bs-toggle="tab"
                        data-bs-target="#list-clues" type="button" role="tab" aria-controls="list-clues"
                        aria-selected="true">Lista de clues</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="create-clues-tab" data-bs-toggle="tab"
                        data-bs-target="#create-clues" type="button" role="tab" aria-controls="create-clues"
                        aria-selected="false">Crear clues</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="import-tab" data-bs-toggle="tab" data-bs-target="#import"
                        type="button" role="tab" aria-controls="import" aria-selected="false">Importar clues</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="institutions-tab" data-bs-toggle="tab"
                        data-bs-target="#institutions" type="button" role="tab" aria-controls="institutions"
                        aria-selected="false">Instituciones</button>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="list-clues" role="tabpanel" aria-labelledby="list-clues-tab">
                    <br><br>
                    <ListClues></ListClues>
                </div>
                <div class="tab-pane fade" id="create-clues" role="tabpanel" aria-labelledby="create-clues-tab">
                    <br><br>
                    <CreateClues></CreateClues>
                </div>
                <div class="tab-pane fade" id="import" role="tabpanel" aria-labelledby="import-tab">
                    <br><br>
                    <ImportClues></ImportClues>
                </div>
                <div class="tab-pane fade" id="institutions" role="tabpanel" aria-labelledby="institutions-tab">
                    <br><br>
                    <Institutions></Institutions>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ListClues from "@/components/clues/ListClues.vue";
import CreateClues from "@/components/clues/CreateClues.vue";
import ImportClues from "@/components/clues/ImportClues.vue";
import Institutions from "@/components/clues/Institutions.vue"
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

onMounted(async () => {
    await authStore.refreshTokenStore();
})

</script>

<style>
.tab-content .tab-pane {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.tab-content .tab-pane.active {
    opacity: 1;
}
</style>
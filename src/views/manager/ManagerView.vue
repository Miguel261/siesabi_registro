<template>
    <div style="margin-top: 100px;" class="container col-11 justify-content-center align-items-center text-center">
        <div class="container col-12">
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active fuente" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                        type="button" role="tab" aria-controls="users" aria-selected="true">Usuarios</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="create-user-tab" data-bs-toggle="tab"
                        data-bs-target="#create-user" type="button" role="tab" aria-controls="create-user"
                        aria-selected="false">Crear
                        usuario</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">Video en vivo</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">Banners</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">
                        Aviso de privacidad
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">
                        Faq
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">
                        Oferta educativa
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">Archivos</button>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <br><br>
                    <Users></Users>
                </div>
                <div class="tab-pane fade" id="create-user" role="tabpanel" aria-labelledby="create-user-tab">
                    <br><br>
                    <CretaUsersCuvanos></CretaUsersCuvanos>
                </div>
                <div class="tab-pane fade" id="video" role="tabpanel" aria-labelledby="video-tab">
                    <br><br>
                    <VideoVivo></VideoVivo>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Users from '@/components/manager/Users.vue';
import CretaUsersCuvanos from '@/components/manager/CreateUsersCubanos.vue';
import VideoVivo from '@/components/manager/VideoVivo.vue';

import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
    authStore.refreshTokenStore();
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
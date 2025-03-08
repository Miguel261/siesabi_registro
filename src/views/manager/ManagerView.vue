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
                    <button class="nav-link fuente" id="banner-tab" data-bs-toggle="tab" data-bs-target="#banner"
                        type="button" role="tab" aria-controls="banner" aria-selected="false">Banners</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="privacity-notice-tab" data-bs-toggle="tab"
                        data-bs-target="#privacity-notice" type="button" role="tab" aria-controls="privacity-notice"
                        aria-selected="false">
                        Aviso de privacidad
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="faq-tab" data-bs-toggle="tab" data-bs-target="#faq"
                        type="button" role="tab" aria-controls="faq" aria-selected="false">
                        Faq
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="educational-offer-tab" data-bs-toggle="tab"
                        data-bs-target="#educational-offer" type="button" role="tab" aria-controls="educational-offer"
                        aria-selected="false">
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
                <div class="tab-pane fade" id="banner" role="tabpanel" aria-labelledby="banner-tab">
                    <br><br>
                    <Banner></Banner>
                </div>
                <div class="tab-pane fade" id="privacity-notice" role="tabpanel" aria-labelledby="privacity-notice-tab">
                    <br><br>
                    <PrivacityNotice></PrivacityNotice>
                </div>
                <div class="tab-pane fade" id="educational-offer" role="tabpanel"
                    aria-labelledby="educational-offer-tab">
                    <br><br>
                    <EducationalOffer></EducationalOffer>
                </div>
                <div class="tab-pane fade" id="faq" role="tabpanel" aria-labelledby="faq-tab">
                    <br><br>
                    <Faq />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Banner from '@/components/manager/Banner.vue';
import CretaUsersCuvanos from '@/components/manager/CreateUsersCubanos.vue';
import EducationalOffer from '@/components/manager/EducationalOffer.vue';
import Faq from '@/components/manager/Faq.vue';
import PrivacityNotice from '@/components/manager/PrivacityNotice.vue';
import Users from '@/components/manager/Users.vue';
import VideoVivo from '@/components/manager/VideoVivo.vue';

import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

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
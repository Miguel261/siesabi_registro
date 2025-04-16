<template>
    <div style="margin-top: 100px;" class="container col-11 justify-content-center align-items-center text-center">
        <div class="container col-12">
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li v-if="havePermissions('manager-users') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                        type="button" role="tab" aria-controls="users" aria-selected="false">Usuarios</button>
                </li>
                <li v-if="havePermissions('manager-users-create') || authStore.getRol == 'admin'" class=" nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="create-user-tab" data-bs-toggle="tab"
                        data-bs-target="#create-user" type="button" role="tab" aria-controls="create-user"
                        aria-selected="false">Crear
                        usuario</button>
                </li>
                <li v-if="havePermissions('manager-live-video') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">Video en vivo</button>
                </li>
                <li v-if="havePermissions('manager-banners') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="banner-tab" data-bs-toggle="tab" data-bs-target="#banner"
                        type="button" role="tab" aria-controls="banner" aria-selected="false">Banners</button>
                </li>
                <li v-if="havePermissions('manager-private-notice') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="privacity-notice-tab" data-bs-toggle="tab"
                        data-bs-target="#privacity-notice" type="button" role="tab" aria-controls="privacity-notice"
                        aria-selected="false">
                        Aviso de privacidad
                    </button>
                </li>
                <li v-if="havePermissions('faq-edit') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="faq-tab" data-bs-toggle="tab" data-bs-target="#faq"
                        type="button" role="tab" aria-controls="faq" aria-selected="false">
                        Faq
                    </button>
                </li>
                <li v-if="havePermissions('manager-educatival-offer') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="educational-offer-tab" data-bs-toggle="tab"
                        data-bs-target="#educational-offer" type="button" role="tab" aria-controls="educational-offer"
                        aria-selected="false">
                        Oferta educativa
                    </button>
                </li>
                <li v-if="havePermissions('manager-directory') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="directory-tab" data-bs-toggle="tab" data-bs-target="#directory"
                        type="button" role="tab" aria-controls="directory" aria-selected="false">Directorio</button>
                </li>
                <li v-if="havePermissions('manager-priority-course') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="courses-tab" data-bs-toggle="tab" data-bs-target="#courses"
                        type="button" role="tab" aria-controls="courses" aria-selected="false">Cursos
                        prioritarios</button>
                </li>
                <li v-if="havePermissions('manager-clues') || authStore.getRol == 'admin'" class="nav-item"
                    role="presentation">
                    <button class="nav-link fuente" id="clues-tab" data-bs-toggle="tab" data-bs-target="#clues"
                        type="button" role="tab" aria-controls="video" aria-selected="false"
                        v-on:click="clues">Clues</button>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
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
                <div class="tab-pane fade" id="privacity-notice" role="tabpanel" 
                aria-labelledby="privacity-notice-tab">
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
                <div class="tab-pane fade" id="directory" role="tabpanel" aria-labelledby="directory-tab">
                    <br><br>
                    <DirectoryView></DirectoryView>
                </div>
                <div class="tab-pane fade" id="courses" role="tabpanel" aria-labelledby="courses-tab">
                    <br><br>
                    <Courses></Courses>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Banner from '@/components/manager/Banner.vue'
import CretaUsersCuvanos from '@/components/manager/CreateUsersCubanos.vue';
import EducationalOffer from '@/components/manager/EducationalOffer.vue';
import DirectoryView from '@/components/admin/Directory/DirectoryView.vue';
import Faq from '@/components/manager/Faq.vue';
import PrivacityNotice from '@/components/manager/PrivacityNotice.vue';
import Users from '@/components/manager/Users.vue';
import VideoVivo from '@/components/manager/VideoVivo.vue';
import Courses from '@/components/manager/Courses.vue';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const permissions = ref(null);

onMounted(async () => {
    await authStore.refreshTokenStore();
    permissions.value = authStore.getPermissions;
})

const havePermissions = (permiso) => {
    return Array.isArray(permissions.value) && permissions.value.includes(permiso);
};

const clues = () => {
    router.push('/clues');
};

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
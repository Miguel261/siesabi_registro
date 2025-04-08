<template>
    <div style="margin-top: 100px;" class="container col-11 justify-content-center align-items-center text-center">
        <div class="container col-12">
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active fuente" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                        type="button" role="tab" aria-controls="users" aria-selected="true">Usuarios
                        registrados</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="directory-tab" data-bs-toggle="tab" data-bs-target="#directory"
                        type="button" role="tab" aria-controls="directory" aria-selected="false">Directorio</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="video-tab" data-bs-toggle="tab" data-bs-target="#video"
                        type="button" role="tab" aria-controls="video" aria-selected="false">Pruebas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="manager-tab" data-bs-toggle="tab" type="button" role="tab"
                        v-on:click="manager" aria-selected="false">Manager</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="clues-tab" data-bs-toggle="tab" data-bs-target="#clues"
                        type="button" role="tab" aria-controls="video" aria-selected="false" 
                        v-on:click="clues">Clues</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fuente" id="credentials-tab" data-bs-toggle="tab"
                        data-bs-target="#credentials" type="button" role="tab" aria-controls="credentials"
                        aria-selected="false">
                        Credenciales</button>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <br><br>
                    <Users></Users>
                </div>
                <div class="tab-pane fade" id="directory" role="tabpanel" aria-labelledby="directory-tab">
                    <br><br>
                    <DirectoryView></DirectoryView>
                </div>
                <div class="tab-pane fade" id="create-user" role="tabpanel" aria-labelledby="create-user-tab">
                    <br><br>

                </div>
                
                <div class="tab-pane fade" id="credentials" role="tabpanel" aria-labelledby="credentials-tab">
                    <br><br>
                    <CredentialsView></CredentialsView>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Users from '@/components/admin/Users.vue';
import CredentialsView from '@/components/admin/CredentialsView.vue';
import DirectoryView from '@/components/admin/Directory/DirectoryView.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
    await authStore.refreshTokenStore();
})

const manager = () =>{
    router.push('/manager');
};

const clues = () =>{
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
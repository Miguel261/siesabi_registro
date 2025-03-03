<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/template/Footer.vue';
import Navbar from '@/components/template/Navbar.vue';
import NavbarSecundary from '@/components/template/NavbarSecundary.vue';
import Toast from 'primevue/toast'; 

</script>

<template>
  <header>
    <Toast class=" col-3 fuente" />
    <Navbar></Navbar>
    <NavbarSecundary></NavbarSecundary>
  </header>
  <main>
    <RouterView />
  </main>

  <Footer></Footer>
</template>

<style scoped>

</style>

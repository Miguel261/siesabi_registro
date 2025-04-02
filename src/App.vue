<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/template/Footer.vue';
import Navbar from '@/components/template/Navbar.vue';
import NavbarSecundary from '@/components/template/NavbarSecundary.vue';
import Toast from 'primevue/toast'; 

</script>

<template>
  <header>
    <Toast class=" col-md-3 col-sm-12 fuente" />
    <Navbar></Navbar>
    <NavbarSecundary></NavbarSecundary>
  </header>
  <main>
    <RouterView />
  </main>

  <Footer></Footer>
</template>

<style>

</style>

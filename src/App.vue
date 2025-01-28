<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/template/Footer.vue';
import Navbar from '@/components/template/Navbar.vue';
import NavbarSecundary from '@/components/template/NavbarSecundary.vue';
</script>

<template>
  <header>
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

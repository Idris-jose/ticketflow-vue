<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-1">
      <!-- This replaces <Routes> and <Route> in React -->
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

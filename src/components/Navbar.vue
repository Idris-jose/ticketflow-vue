<template>
  <nav class="bg-white shadow p-4">
    <div class="max-w-container mx-auto flex justify-between items-center">
      <router-link to="/" class="font-bold text-xl text-primary">TicketFlow</router-link>
      <div class="space-x-4">
        <router-link v-if="!user" to="/auth/login" class="text-gray-700">Login</router-link>
        <router-link v-if="!user" to="/auth/register" class="text-gray-700">Get Started</router-link>
        <router-link v-if="user" to="/dashboard" class="text-gray-700">Dashboard</router-link>
        <router-link v-if="user" to="/tickets" class="text-gray-700">Tickets</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
const { user } = useAuthStore();
</script>

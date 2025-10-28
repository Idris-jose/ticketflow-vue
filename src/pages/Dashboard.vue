<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Welcome, {{ authStore.user?.email }}</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-4 gap-6 mb-10">
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-gray-500">Total Tickets</h2>
        <p class="text-3xl font-bold">{{ total }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-gray-500">Open</h2>
        <p class="text-3xl font-bold text-green-500">{{ open }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-gray-500">In Progress</h2>
        <p class="text-3xl font-bold text-amber-500">{{ inProgress }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-gray-500">Closed</h2>
        <p class="text-3xl font-bold text-gray-500">{{ resolved }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white rounded-xl shadow p-6 mb-10">
      <h2 class="text-xl font-semibold mb-4">Ticket Status Breakdown</h2>
      <canvas ref="chartRef" height="300"></canvas>
    </div>

    <!-- Navigation -->
    <div class="text-center">
      <button
        @click="router.push('/tickets')"
        class="bg-blue-600 text-white px-6 py-2 rounded-xl"
      >
        Manage Tickets
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useTicketsStore } from "../store/tickets";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

const authStore = useAuthStore();
const ticketsStore = useTicketsStore();
const router = useRouter();

const chartRef = ref(null);

const { total, open, resolved, inProgress } = ticketsStore.getStats();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

// Draw chart
onMounted(() => {
  new Chart(chartRef.value, {
    type: "pie",
    data: {
      labels: ["Open", "In Progress", "Closed"],
      datasets: [
        {
          data: [open, inProgress, resolved],
          backgroundColor: ["#22C55E", "#F59E0B", "#9CA3AF"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
});
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>

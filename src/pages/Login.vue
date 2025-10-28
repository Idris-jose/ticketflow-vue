<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-blue-50">
    <div class="bg-white p-8 rounded-2xl shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#2563eb] text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      <p class="text-sm text-gray-600 text-center mt-4">
        Don’t have an account?
        <router-link to="/auth/register" class="text-[#2563eb] font-medium">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const email = ref("");
const password = ref("");
const toast = useToast();
const router = useRouter();
const auth = useAuthStore();

function handleLogin() {
  if (!email.value || !password.value) {
    toast.error("Please fill in all fields");
    return;
  }

  const result = auth.login(email.value, password.value);
  if (result.success) {
    toast.success("Login successful!");
    router.push("/dashboard");
  } else {
    toast.error(result.message);
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-blue-50">
    <div class="bg-white p-8 rounded-2xl shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Create Account</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="name"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

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
          class="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Sign Up
        </button>
      </form>

      <p class="text-sm text-gray-600 text-center mt-4">
        Already have an account?
        <router-link to="/auth/login" class="text-primary font-medium">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const name = ref("");
const email = ref("");
const password = ref("");
const toast = useToast();
const router = useRouter();
const auth = useAuthStore();

function handleSignup() {
  if (!name.value || !email.value || !password.value) {
    toast.error("All fields are required");
    return;
  }

  const result = auth.register(email.value, password.value);
  if (result.success) {
    toast.success("Account created!");
    router.push("/dashboard");
  } else {
    toast.error(result.message);
  }
}
</script>

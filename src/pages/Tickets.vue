<template>
  <div :class="`${MAX_CONTAINER_WIDTH} mx-auto p-6`">
    <h1 class="text-3xl font-bold mb-6">Ticket Management</h1>

    <!-- Ticket Form -->
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded-xl shadow mb-8">
      <h2 class="text-xl font-semibold mb-4">
        {{ editing ? "Edit Ticket" : "Create Ticket" }}
      </h2>

      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Title *</label>
          <input
            v-model="form.title"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Ticket title"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">
            {{ errors.title }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Status *</label>
          <select
            v-model="form.status"
            class="w-full border rounded-lg px-3 py-2"
          >
            <option :value="TICKET_STATUSES.OPEN">Open</option>
            <option :value="TICKET_STATUSES.IN_PROGRESS">In Progress</option>
            <option :value="TICKET_STATUSES.CLOSED">Closed</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm mt-1">
            {{ errors.status }}
          </p>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border rounded-lg px-3 py-2"
          placeholder="Describe the issue"
          rows="3"
        ></textarea>
      </div>

      <div class="mt-6 flex space-x-4">
        <button type="submit" class="bg-blue-400 text-white px-6 py-2 rounded-xl">
          {{ editing ? "Update Ticket" : "Create Ticket" }}
        </button>
        <button
          v-if="editing"
          type="button"
          @click="cancelEdit"
          class="bg-gray-300 px-6 py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </form>

    <!-- Ticket List -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <p
        v-if="tickets.length === 0"
        class="text-gray-500 col-span-full text-center py-8"
      >
        No tickets found. Create one above.
      </p>

      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white rounded-xl shadow p-4 relative"
      >
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
          <span
            class="text-sm px-3 py-1 rounded-full"
            :class="STATUS_COLORS[ticket.status]"
          >
            {{ ticket.status.replace('_', ' ') }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mt-2">{{ ticket.description }}</p>
        <p class="text-xs text-gray-400 mt-2">
          {{ new Date(ticket.createdAt).toLocaleString() }}
        </p>

        <div class="flex space-x-2 mt-4">
          <button
            @click="onEdit(ticket)"
            class="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            @click="onDelete(ticket.id)"
            class="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTickets } from "../hooks/useTickets.js";
import { useToast } from "vue-toastification";
import { MAX_CONTAINER_WIDTH, TICKET_STATUSES, STATUS_COLORS } from "../utils/constants.js";

const toast = useToast();

const {
  tickets,
  editing,
  errors,
  onSubmit,
  onEdit,
  onDelete,
  cancelEdit,
  form,
} = useTickets(toast);
</script>

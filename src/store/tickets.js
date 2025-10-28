import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();


import { STORAGE_KEYS, TICKET_STATUSES } from "../utils/constants.js";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = ref(JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKETS)) || []);
  const editing = ref(null);

  // Save tickets to localStorage
  const saveTickets = (data) => {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(data));
    tickets.value = data;
  };

  // Create or update a ticket
  const submitTicket = (data) => {
    if (!data.title || !data.status) {
      toast.error("Title and status are required");
      return;
    }

    if (editing.value) {
      const updated = tickets.value.map((t) =>
        t.id === editing.value ? { ...t, ...data } : t
      );
      saveTickets(updated);
      toast.success("Ticket updated!");
      editing.value = null;
    } else {
      const newTicket = {
        id: Date.now(),
        title: data.title,
        description: data.description || "",
        status: data.status,
        createdAt: new Date().toISOString(),
      };
      saveTickets([...tickets.value, newTicket]);
      toast.success("Ticket created!");
    }
  };

  const editTicket = (ticket) => {
    editing.value = ticket.id;
    return ticket; // can be used to populate form fields
  };

  const deleteTicket = (id) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.value.filter((t) => t.id !== id);
      saveTickets(updated);
      toast.success("Ticket deleted!");
    }
  };

  const cancelEdit = () => {
    editing.value = null;
  };

  // Computed ticket stats
  const total = computed(() => tickets.value.length);
  const open = computed(() =>
    tickets.value.filter((t) => t.status === TICKET_STATUSES.OPEN).length
  );
  const resolved = computed(() =>
    tickets.value.filter((t) => t.status === TICKET_STATUSES.CLOSED).length
  );
  const inProgress = computed(() =>
    tickets.value.filter((t) => t.status === TICKET_STATUSES.IN_PROGRESS).length
  );

  // Helper to return all at once
  const getStats = () => ({
    total: total.value,
    open: open.value,
    resolved: resolved.value,
    inProgress: inProgress.value,
  });

  return {
    tickets,
    editing,
    submitTicket,
    editTicket,
    deleteTicket,
    cancelEdit,
    getStats,
  };
});

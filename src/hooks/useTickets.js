import { ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { STORAGE_KEYS, TICKET_STATUSES } from "../utils/constants.js";
import { getFromStorage, setToStorage } from "../utils/storage.js";
import { validateTicket } from "../utils/validation.js";

export function useTickets(toast) {
  const tickets = ref([]);
  const editing = ref(null);

  // Form state (reactive replaces react-hook-form)
  const form = reactive({
    title: "",
    description: "",
    status: TICKET_STATUSES.OPEN,
  });

  const errors = reactive({
    title: "",
    status: "",
  });

  // Load tickets from localStorage
  onMounted(() => {
    const stored = getFromStorage(STORAGE_KEYS.TICKETS);
    if (stored) {
      tickets.value = stored;
    }
  });

  // Save tickets to localStorage
  const saveTickets = (data) => {
    setToStorage(STORAGE_KEYS.TICKETS, data);
    tickets.value = data;
  };

  // Reset form
  const reset = () => {
    form.title = "";
    form.description = "";
    form.status = TICKET_STATUSES.OPEN;
    errors.title = "";
    errors.status = "";
  };

  // Validation and submit handler
  const onSubmit = () => {
    const validation = validateTicket(form);
    if (!validation.isValid) {
      Object.values(validation.errors).forEach((error) => toast.error(error));
      Object.assign(errors, validation.errors);
      return;
    }

    if (editing.value) {
      const updated = tickets.value.map((t) =>
        t.id === editing.value ? { ...t, ...form } : t
      );
      saveTickets(updated);
      toast.success("Ticket updated!");
      editing.value = null;
    } else {
      const newTicket = {
        id: Date.now(),
        title: form.title,
        description: form.description || "",
        status: form.status,
        createdAt: new Date().toISOString(),
      };
      saveTickets([...tickets.value, newTicket]);
      toast.success("Ticket created!");
    }

    reset();
  };

  // Editing handler
  const onEdit = (ticket) => {
    editing.value = ticket.id;
    form.title = ticket.title;
    form.description = ticket.description;
    form.status = ticket.status;
  };

  // Delete handler
  const onDelete = (id) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.value.filter((t) => t.id !== id);
      saveTickets(updated);
      toast.success("Ticket deleted!");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    reset();
    editing.value = null;
  };

  // Ticket statistics
  const getStats = () => {
    const total = tickets.value.length;
    const open = tickets.value.filter((t) => t.status === TICKET_STATUSES.OPEN).length;
    const resolved = tickets.value.filter((t) => t.status === TICKET_STATUSES.CLOSED).length;
    return { total, open, resolved };
  };

  // mimic react-hook-form's handleSubmit for the Vue version
  const handleSubmit = (fn) => fn;

  return {
    tickets,
    editing,
    form,
    errors,
    handleSubmit,
    onSubmit,
    onEdit,
    onDelete,
    cancelEdit,
    getStats,
    reset,
  };
}

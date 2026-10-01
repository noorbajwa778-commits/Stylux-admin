
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],       // { id, text, time, read, link }
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Har salon ki ek notification: pending, approved aur rejected.
    // Dobara nahi banti kyunke id se check hota hai.
    syncPendingSalons: (state, action) => {
      const allSalons = action.payload || [];
      if (!state.items) state.items = [];

      allSalons.forEach((salon) => {
        const name = salon.name || "Unnamed salon";
        let id;
        let text;
        let link;

        if (salon.account_status === "Approved") {
          id = `approved-${salon.id}`;
          text = `Salon approved: ${name}`;
          link = `/salons/${salon.id}`;
        } else if (salon.account_status === "Rejected") {
          id = `rejected-${salon.id}`;
          text = `Salon rejected: ${name}`;
          link = `/salons/${salon.id}`;
        } else {
          id = `salon-${salon.id}`;
          text = `New salon request: ${name}`;
          link = "/requests";
        }

        if (state.items.some((n) => n.id === id)) return;

        state.items.unshift({
          id,
          text,
          time: new Date().toLocaleString(),
          read: false,
          link,
        });
      });
    },
    // Har appointment ki ek notification: booked, completed, cancelled.
    syncAppointments: (state, action) => {
      const { appointments, clients, salons } = action.payload || {};
      if (!state.items) state.items = [];

      (appointments || []).forEach((appt) => {
        const status = appt.status || "Upcoming";
        const id = `appt-${appt.id}-${status}`;
        if (state.items.some((n) => n.id === id)) return;

        const client = (clients || []).find((c) => c.id === appt.client_id);
        const clientName = client
          ? `${client.first_name || ""} ${client.last_name || ""}`.trim() ||
            client.email ||
            "A client"
          : "A client";

        const salon = (salons || []).find((sl) => sl.id === appt.salon_id);
        const salonName = salon ? salon.name || "a salon" : "a salon";

        const when = `${appt.date || ""} ${appt.time || ""}`.trim();

        let text;
        if (status === "Cancelled") {
          text = `Booking cancelled: ${clientName} at ${salonName} (${when})`;
        } else if (status === "Completed") {
          text = `Booking completed: ${clientName} at ${salonName} (${when})`;
        } else {
          text = `New booking: ${clientName} at ${salonName} (${when})`;
        }

        state.items.unshift({
          id,
          text,
          time: new Date().toLocaleString(),
          read: false,
          link: "/appointments",
        });
      });
    },

    // Koi bhi nayi notification (jaise salon approve hona).
    addNotification: (state, action) => {
      const { id, text, link } = action.payload;
      if (!state.items) state.items = [];
      if (state.items.some((n) => n.id === id)) return;

      state.items.unshift({
        id,
        text,
        time: new Date().toLocaleString(),
        read: false,
        link: link || "/requests",
      });
    },
    markAllRead: (state) => {
      (state.items || []).forEach((n) => (n.read = true));
    },
    clearNotifications: (state) => {
      state.items = [];
      state.seenIds = [];
    },
  },
});

export const {
  syncPendingSalons,
  syncAppointments,
  addNotification,
  markAllRead,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
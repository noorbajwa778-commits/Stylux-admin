import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../supabase.js";
import { syncAppointments } from "./NotificationsSlice.js";

const initialState = {
  appointments: [],
  clients: [],
  reviews: [],
  services: [],
  admins: [],
};

const adminDataSlice = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  setAppointments,
  setClients,
  setReviews,
  setServices,
  setAdmins,
  removeReview,
} = adminDataSlice.actions;

export const fetchAdminData = () => async (dispatch, getState) => {
  const [apptRes, clientRes, reviewRes, serviceRes, adminRes] = await Promise.all([
    supabase.from("appointments").select("*"),
    supabase.from("clients").select("*"),
    supabase.from("reviews").select("*"),
    supabase.from("services").select("*"),
    supabase.from("admin").select("*"),
  ]);

  if (apptRes.error) console.log("appointments fetch error:", apptRes.error);
  else dispatch(setAppointments(apptRes.data || []));

  if (clientRes.error) console.log("clients fetch error:", clientRes.error);
  else dispatch(setClients(clientRes.data || []));

  if (reviewRes.error) console.log("reviews fetch error:", reviewRes.error);
  else dispatch(setReviews(reviewRes.data || []));

  if (serviceRes.error) console.log("services fetch error:", serviceRes.error);
  else dispatch(setServices(serviceRes.data || []));

  if (adminRes.error) console.log("admin fetch error:", adminRes.error);
  else dispatch(setAdmins(adminRes.data || []));

  // Appointments ki notifications (salon ka naam salons slice se).
  if (!apptRes.error) {
    dispatch(
      syncAppointments({
        appointments: apptRes.data || [],
        clients: clientRes.data || [],
        salons: getState().salons.salons || [],
      })
    );
  }
};

export const deleteReviewInDB = (id) => async (dispatch) => {
  const { data, error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.log("Delete review error:", error);
    return;
  }
  if (!data || data.length === 0) {
    console.log("Review delete blocked - RLS DELETE policy check karein");
    return;
  }
  dispatch(removeReview(id));
};

export const getClientName = (clients, id) => {
  const c = clients.find((x) => x.id === id);
  if (!c) return "Unknown client";
  const full = `${c.first_name || ""} ${c.last_name || ""}`.trim();
  return full || c.email || "Unknown client";
};

export const getSalonName = (salons, id) => {
  const s = salons.find((x) => x.id === id);
  return s ? s.name || "Unnamed salon" : "Unknown salon";
};

export const getServiceName = (services, id) => {
  const s = services.find((x) => x.id === id);
  return s ? s.name || "Unnamed service" : "Unknown service";
};

export const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default adminDataSlice.reducer;
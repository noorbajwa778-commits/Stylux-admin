import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../supabase.js";
import { syncPendingSalons, addNotification } from "./NotificationsSlice.js";

const initialState = {
  salons: [],
  loading: false,
};

const salonsSlice = createSlice({
  name: "salons",
  initialState,
  reducers: {
    setSalons: (state, action) => {
      state.salons = action.payload;
    },
    setSalonsLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateSalonStatus: (state, action) => {
      const { id, account_status } = action.payload;
      const salon = state.salons.find((s) => s.id === id);
      if (salon) salon.account_status = account_status;
    },
    removeSalon: (state, action) => {
      state.salons = state.salons.filter((s) => s.id !== action.payload);
    },
  },
});

export const { setSalons, setSalonsLoading, updateSalonStatus, removeSalon } =
  salonsSlice.actions;

export const fetchSalons = () => async (dispatch) => {
  const { data, error } = await supabase.from("salons").select("*");
  if (error) {
    console.log("Salons fetch error:", error);
    dispatch(setSalons([]));
    return;
  }
  dispatch(setSalons(data || []));

  dispatch(syncPendingSalons(data || []));
};

export const approveSalonInDB = (id) => async (dispatch) => {
  const { data, error } = await supabase
    .from("salons")
    .update({ account_status: "Approved" })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Approve error:", error);
    return;
  }
  if (!data || data.length === 0) {
    console.log("Approve blocked - RLS UPDATE policy check karein");
    return;
  }
  dispatch(updateSalonStatus({ id, account_status: "Approved" }));
  dispatch(
    addNotification({
      id: `approved-${id}`,
      text: `Salon approved: ${data[0].name || "Unnamed salon"}`,
      link: `/salons/${id}`,
    })
  );
};

export const rejectSalonInDB = (id) => async (dispatch) => {
  const { data, error } = await supabase
    .from("salons")
    .update({ account_status: "Rejected" })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Reject error:", error);
    return;
  }
  if (!data || data.length === 0) {
    console.log("Reject blocked - RLS UPDATE policy check karein");
    return;
  }
  dispatch(updateSalonStatus({ id, account_status: "Rejected" }));
};

// Salon aur us ka sab data hamesha ke liye delete (admin_delete_salon function).
export const deleteSalonInDB = (id) => async (dispatch) => {
  const { error } = await supabase.rpc("admin_delete_salon", {
    p_salon_id: id,
  });

  if (error) {
    console.log("Delete salon error:", error);
    alert("Could not delete salon: " + error.message);
    return;
  }

  dispatch(removeSalon(id));
  dispatch(fetchSalons());
};

export default salonsSlice.reducer;
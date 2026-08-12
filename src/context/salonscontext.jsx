import { createContext, useContext, useState } from "react";
import { salons as initialSalons } from "../data/salons.js";

const SalonsContext = createContext();

export function useSalons() {
  return useContext(SalonsContext);
}

export function SalonsProvider({ children }) {
  const [salons, setSalons] = useState(initialSalons);

  const approveSalon = (id) => {
    setSalons((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "active" } : s))
    );
  };

  const rejectSalon = (id) => {
    setSalons((prev) => prev.filter((s) => s.id !== id));
  };

  const deleteSalon = (id) => {
    setSalons((prev) => prev.filter((s) => s.id !== id));
  };

  const addSalon = (newSalon) => {
    const salonToAdd = {
      id: Date.now(),
      status: "pending",
      rating: 0,
      servicesCount: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      ...newSalon,
    };
    setSalons((prev) => [salonToAdd, ...prev]);
  };

  const value = {
    salons,
    approveSalon,
    rejectSalon,
    deleteSalon,
    addSalon,
  };

  return (
    <SalonsContext.Provider value={value}>{children}</SalonsContext.Provider>
  );
}
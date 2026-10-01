import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import HomeDataSlice from "../Slices/HomeDataSlice.js";
import SalonsSlice from "../Slices/SalonsSlice.js";
import AdminDataSlice from "../Slices/AdminDataSlice.js";
import NotificationsSlice from "../Slices/NotificationsSlice.js";

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "stylux-admin",
  storage: storage,
  blacklist: ["home"],
};

const rootReducer = combineReducers({
  home: HomeDataSlice,
  salons: SalonsSlice,
  adminData: AdminDataSlice,
  notifications: NotificationsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { persistor, store };
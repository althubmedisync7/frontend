import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import PatientReducer from "./PatientSlice";
import DoctorReducer from "./DoctorSlice";

const persistConfig = {
   key: "root",
   storage,
   whitelist: ["patient", "doctor"],
};

const rootReducer = {
   patient: PatientReducer,
   doctor: DoctorReducer,
};

import { combineReducers } from "@reduxjs/toolkit";
const combinedReducer = combineReducers(rootReducer);
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export const persistor = persistStore(store);

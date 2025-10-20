import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
   name: "patient",
   initialState: {
      patientData: null,
      patientToken: "",
      refreshToken: "",
   },
   reducers: {
      setPatientData: (state, action) => {
         state.patientData = action.payload;

         state.patientToken = action.payload.access_token;
         state.refreshToken = action.payload.refresh_token;
      },
      clearPatientData: (state) => {
         state.patientData = null;
         state.patientToken = "";
         state.refreshToken = "";
      },
   },
});

export const { setPatientData, clearPatientData } = patientSlice.actions;
export default patientSlice.reducer;

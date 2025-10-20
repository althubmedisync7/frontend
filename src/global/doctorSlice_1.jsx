import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   doctorData: null,
   doctorToken: "",

};

const doctorSlice = createSlice({
   name: "doctor",
   initialState,
   reducers: {
      setDoctorData: (state, action) => {
         state.doctorData = action.payload.doctorData;
         state.doctorToken = action.payload.doctorToken;
      },
      clearDoctorData: (state) => {
         state.doctorData = null;
         state.doctorToken = "";
      },
   },
});

export const { setDoctorData, clearDoctorData } = doctorSlice.actions;
export default doctorSlice.reducer;

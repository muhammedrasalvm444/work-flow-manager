import { createSlice } from "@reduxjs/toolkit";

const workLogSlice = createSlice({
  name: "workLogs",
  initialState: [],
  reducers: {
    addWorkLog: (state, action) => {
      state.push(action.payload);
    },
    deleteWorkLog: (state, action) => {
      return state.filter((log) => log.id !== action.payload);
    },
  },
});

export const { addWorkLog, deleteWorkLog } = workLogSlice.actions;
export default workLogSlice.reducer;

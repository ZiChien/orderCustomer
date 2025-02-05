import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  currentOrder: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
});
export const { setInfo, setCurrentOrder } = userSlice.actions;
export const selectCurrentOrder = (state) => state.user.currentOrder;
export default userSlice.reducer;

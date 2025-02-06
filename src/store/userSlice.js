import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});
export const { setInfo } = userSlice.actions;
export default userSlice.reducer;

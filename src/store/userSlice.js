import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: undefined,
  accessToken: undefined,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});
export const { setProfile, setAccessToken } = userSlice.actions;
export default userSlice.reducer;

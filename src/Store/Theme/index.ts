import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});
export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;

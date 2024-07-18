import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoState } from '../interface';

const initialState: UserInfoState = {
  displayName: '',
  uid: '',
  email: '',
  photoURL: '',
  provider: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserInfoState>) => {
      const { displayName, uid, email, photoURL, provider } = action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.provider = provider;
    },
    saveName: (state, action: PayloadAction<{ displayName: string }>) => {
      const { displayName } = action.payload;
      state.displayName = displayName;
    },
    clearUserData: (state) => {
      state.displayName = '';
      state.uid = '';
      state.email = '';
      state.photoURL = '';
      state.provider = '';
    },
  },
});

export const { saveUser, clearUserData, saveName } = user.actions;
export default user.reducer;

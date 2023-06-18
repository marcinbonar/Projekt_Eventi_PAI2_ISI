import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
}

const initialState: UserState = {
  userId: sessionStorage.getItem('userId') ?? null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;

export default userSlice.reducer;

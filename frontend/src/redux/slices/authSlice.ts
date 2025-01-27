import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  verified: boolean;
  googleId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Save token to localStorage
      localStorage.setItem('token', token);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;

      // Remove token and role from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

// Actions
export const { setUser, clearUser } = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;

// Reducer
export default authSlice.reducer;

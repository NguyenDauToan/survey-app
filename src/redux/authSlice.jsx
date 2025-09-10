import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // lưu luôn role trong user
      const userWithRole = {
        ...action.payload.user,
        role: action.payload.role || action.payload.user.role
      };
      state.user = userWithRole;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // lưu token + user (bao gồm role) vào localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(userWithRole));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer

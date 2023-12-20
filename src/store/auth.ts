import {createSlice} from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string | undefined;
  followers: number;
  followings: number;
}

interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  busy:boolean
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  busy:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfie: (state, {payload}) => {
      state.profile = payload
    },
    updateLoginState: (state, {payload}) => {
      state.loggedIn = payload
    },
    updateBusyState: (state, {payload}) => {
      state.busy = payload
    }
  },
});

export const {updateProfie, updateLoginState, updateBusyState} = authSlice.actions

export default authSlice.reducer;

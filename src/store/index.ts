import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
const sotre = configureStore({
  reducer: {
    auth:authReducer,
  }
});


export default sotre
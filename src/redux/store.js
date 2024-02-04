import { configureStore } from '@reduxjs/toolkit';
import displaySettingsReducer from './settings';

export const store = configureStore({
  reducer: {
    displayValue: displaySettingsReducer, 
  },
})

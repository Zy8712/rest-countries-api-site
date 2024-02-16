import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  searchValue: '',
  filterValue: 1,
  paginationSettings: false,
};

export const counterSlice = createSlice({
  name: 'displaySettings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    alterSearchValue: (state, action) => {
      state.filterValue = 1;
      state.searchValue = action.payload;
    },
    alterFilterValue: (state, action) => {
      state.searchValue = '';
      state.filterValue = action.payload;
    },
    setPaginationSettings: (state) => {
      state.paginationSettings = !state.paginationSettings;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode, alterSearchValue, alterFilterValue, setPaginationSettings } = counterSlice.actions;

export default counterSlice.reducer;

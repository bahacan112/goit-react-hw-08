import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu
const initialState = {
  nameFilter: "",
};

// Slice oluşturma
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setNameFilter(state, action) {
      state.nameFilter = action.payload;
    },
  },
});

// Actions ve reducer dışa aktarımı
export const { setNameFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

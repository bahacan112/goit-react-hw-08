import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";
import { logOut } from "../auth/operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) =>
    builder
      // GET
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // ADD
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      // DELETE
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload);
      })

      // EDIT
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.items[index] = payload; // Güncellenen kişiyle değiştir.
        }
      })
      .addCase(editContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // LogOut olduğunda kişileri temizle
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      }),
});

export default contactsSlice.reducer;

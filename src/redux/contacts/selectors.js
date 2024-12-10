// src/redux/contacts/selectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectNameFilter = (state) => state.filters.nameFilter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    const normalizedFilter = nameFilter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.phone.includes(nameFilter)
    );
  }
);

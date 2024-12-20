import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

// Axios Örneği Oluşturma
const api = axios.create({
  baseURL: "https://connections-api.goit.global",
});

// Yardımcı Fonksiyonlar
const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// **Asenkron İşlemler**

// Kişileri Getir
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token, please authenticate.");
    }

    setAuthHeader(token);

    try {
      const { data } = await api.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kişi Ekle
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token, please authenticate.");
    }

    setAuthHeader(token);

    try {
      const { data } = await api.post("/contacts", contact);
      message.success("Kişi başarıyla eklendi!");
      return data;
    } catch (error) {
      message.error("Kişi ekleme başarısız oldu!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kişi Sil
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("No token, please authenticate.");
    }

    setAuthHeader(token);

    try {
      await api.delete(`/contacts/${id}`);
      message.success("Kişi başarıyla silindi!");
      return id;
    } catch (error) {
      message.error("Silme işlemi başarısız oldu!");
      return rejectWithValue(error.message);
    }
  }
);

// Kişi Güncelle
export const editContact = createAsyncThunk(
  "contacts/edit",
  async ({ id, ...updateFields }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("No token, please authenticate.");
    }

    setAuthHeader(token);

    try {
      const { data } = await api.patch(`/contacts/${id}`, updateFields);
      message.success("Kişi başarıyla güncellendi!");
      return data;
    } catch (error) {
      message.error("Güncelleme işlemi başarısız oldu!");
      return rejectWithValue(error.message);
    }
  }
);

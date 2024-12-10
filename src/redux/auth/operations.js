import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Kayıt ol
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      message.success("Kayıt başarılı! Sisteme giriş yapılıyor...");
      return data;
    } catch (error) {
      message.error("Kayıt başarısız oldu! Lütfen tekrar deneyin.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Giriş yap
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      message.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      return data;
    } catch (error) {
      message.error("Giriş başarısız! E-posta veya şifrenizi kontrol edin.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Çıkış yap
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    message.success("Başarıyla çıkış yaptınız!");
    return;
  } catch (error) {
    message.error("Çıkış işlemi başarısız oldu!");
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Kullanıcı verilerini token ile yenile
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      // Token yoksa hata döndürür, message göstermeye gerek yok
      return thunkAPI.rejectWithValue("No token");
    }
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      // Hata durumunda opsiyonel olarak message ile kullanıcıya bildirim yapılabilir.
      message.error("Kullanıcı verileri yenilenemedi!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

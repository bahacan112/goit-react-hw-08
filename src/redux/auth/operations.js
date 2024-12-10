import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

// Axios Temel URL Ayarı
axios.defaults.baseURL = "https://connections-api.goit.global";

// Yetkilendirme Başlıkları İçin Yardımcı Fonksiyonlar
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

// Kayıt Olma İşlemi
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      setAuthHeader(data.token); // Yetkilendirme Başlığı Ayarı
      message.success("Kayıt başarılı! Sisteme giriş yapılıyor...");
      return data;
    } catch (error) {
      message.error("Kayıt başarısız oldu! Lütfen tekrar deneyin.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Giriş Yapma İşlemi
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthHeader(data.token); // Yetkilendirme Başlığı Ayarı
      message.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      return data;
    } catch (error) {
      message.error("Giriş başarısız! E-posta veya şifrenizi kontrol edin.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Çıkış Yapma İşlemi
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader(); // Yetkilendirme Başlığını Temizle
    message.success("Başarıyla çıkış yaptınız!");
    return;
  } catch (error) {
    message.error("Çıkış işlemi başarısız oldu!");
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Kullanıcı Verilerini Yenileme İşlemi
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      // Token yoksa hata döndürür
      return thunkAPI.rejectWithValue("No token");
    }

    try {
      setAuthHeader(token); // Yetkilendirme Başlığı Ayarı
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      message.error("Kullanıcı verileri yenilenemedi!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import Layout from "../Layout/Layout";
import Home from "../../pages/HomePage/HomePage";
import Login from "../../pages/LoginPage/LoginPage";
import Registration from "../../pages/RegistrationPage/RegistrationPage";
import Contacts from "../../pages/ContactsPage/ContactsPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
      }}
    >
      <Layout toggleTheme={toggleTheme} currentTheme={currentTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={Registration} // JSX element kaldırıldı
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={Login} // JSX element kaldırıldı
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={Contacts} // JSX element kaldırıldı
              />
            }
          />
        </Routes>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

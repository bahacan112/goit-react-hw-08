import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={styles.authnav}>
      <NavLink to="/register" className={styles.link}>
        Kayıt Ol
      </NavLink>
      <NavLink to="/login" className={styles.link}>
        Giriş Yap
      </NavLink>
    </div>
  );
};

export default AuthNav;

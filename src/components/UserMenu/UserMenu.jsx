import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selector";
import { Button } from "antd";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.usermenu}>
      <span className={styles.username}>Hoş geldin, {user.name}!</span>
      <Button type="primary" onClick={handleLogout}>
        Çıkış
      </Button>
    </div>
  );
};

export default UserMenu;

import { Layout as AntLayout, Button } from "antd";
import AppBar from "../AppBar/AppBar";
import styles from "./Layout.module.css";
import PropTypes from "prop-types";
const { Header, Content, Footer } = AntLayout;

const Layout = ({ children, toggleTheme, currentTheme }) => {
  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <AppBar />
        <Button type="primary" onClick={toggleTheme}>
          Tema: {currentTheme === "light" ? "Light" : "Dark"}
        </Button>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        © 2024 GoIT React HW-08 - Bahattin Zenbil
      </Footer>
    </AntLayout>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.string.isRequired,
};

export default Layout;

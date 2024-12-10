import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import { Card, Typography } from "antd";
function Login() {
  const { Title } = Typography;

  return (
    <Card
      className={styles.card}
      bordered={true}
      title={<Title level={2}>Giriş Yap</Title>}
    >
      <LoginForm />
    </Card>
  );
}

export default Login;

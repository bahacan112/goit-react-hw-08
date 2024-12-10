// src/pages/Registration/Registration.jsx
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Card, Typography } from "antd";
import styles from "./RegistrationPage.module.css";

const { Title } = Typography;

const Registration = () => (
  <Card
    className={styles.card}
    bordered={true}
    title={<Title level={2}>Kayıt Ol</Title>}
  >
    <RegistrationForm />
  </Card>
);

export default Registration;

import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Form, Input, Button } from "antd";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    dispatch(login(values));
    form.resetFields();
  };

  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        className={styles.form}
        onFinish={handleSubmit}
        initialValues={{ email: "", password: "" }}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Lütfen email adresinizi girin" },
            { type: "email", message: "Geçerli bir email adresi girin" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi girin" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Giriş Yap
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

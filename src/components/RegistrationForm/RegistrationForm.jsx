import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Form, Input, Button } from "antd";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    dispatch(register(values));
    form.resetFields();
  };

  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        className={styles.form}
        onFinish={handleSubmit}
        initialValues={{ name: "", email: "", password: "" }}
        layout="vertical"
      >
        <Form.Item
          label="İsim"
          name="name"
          rules={[{ required: true, message: "Lütfen isminizi girin" }]}
        >
          <Input />
        </Form.Item>

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
          Kayıt Ol
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;

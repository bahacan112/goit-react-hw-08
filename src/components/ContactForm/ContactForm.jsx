import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import { Form, Input, Button } from "antd";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { name, number } = values;
    // Aynı isimli kişi var mı kontrolü
    const duplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      alert(`${name} zaten rehberde mevcut!`);
      return;
    }

    dispatch(addContact({ name, number }));
    form.resetFields();
  };

  return (
    <div className={styles.formContainer}>
      <h2>Kişi Ekle</h2>
      <Form
        form={form}
        className={styles.form}
        onFinish={handleSubmit}
        initialValues={{ name: "", number: "" }}
        layout="vertical"
      >
        <Form.Item
          label="İsim"
          name="name"
          rules={[{ required: true, message: "Lütfen bir isim girin" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Numara"
          name="number"
          rules={[
            { required: true, message: "Lütfen bir numara girin" },
            {
              pattern: /^[0-9+\-()\s]+$/,
              message: "Lütfen geçerli bir telefon numarası girin",
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Ekle
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;

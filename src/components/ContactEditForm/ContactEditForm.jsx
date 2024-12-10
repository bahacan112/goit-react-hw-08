import { Form, Input, Button, Modal } from "antd";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";

const ContactEditForm = ({ contact, isVisible, handleCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFinish = (values) => {
    dispatch(editContact({ id: contact.id, ...values }));
    form.resetFields();
    handleCancel();
  };

  return (
    <Modal
      title="Kişi Bilgilerini Düzenle"
      open={isVisible} // visible yerine open kullanın
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{
          name: contact.name,
          number: contact.number, // phone yerine number kullandık
        }}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          label="Adı"
          name="name"
          rules={[{ required: true, message: "Lütfen adınızı girin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefon"
          name="number" // phone yerine number
          rules={[
            { required: true, message: "Lütfen telefon numaranızı girin!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ContactEditForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired, // phone yerine number
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ContactEditForm;

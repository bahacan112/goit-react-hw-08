import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Button, Modal } from "antd";
import { DeleteOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import ContactEditForm from "../ContactEditForm/ContactEditForm";
import styles from "./ContactItem.module.css";

const { Text, Title } = Typography;

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Silme işlemi
  const showDeleteModal = () => setIsModalOpen(true);
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  // Düzenleme işlemi
  const showEditModal = () => setIsEditOpen(true);
  const handleEditCancel = () => setIsEditOpen(false);

  return (
    <>
      <Card
        className={styles.card}
        bordered={true}
        hoverable
        actions={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={showEditModal}
          />,
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={showDeleteModal}
          />,
        ]}
      >
        <Title level={4}>{contact.name}</Title>
        <Text type="secondary">
          <PhoneOutlined /> {contact.number}
        </Text>
      </Card>

      {/* Silme Onay Modali */}
      <Modal
        title="Silme Onayı"
        open={isModalOpen} // visible yerine open
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Sil"
        cancelText="İptal"
      >
        <p>{`${contact.name} kişisini silmek istediğinize emin misiniz?`}</p>
      </Modal>

      {/* Düzenleme Formu */}
      <ContactEditForm
        contact={contact}
        isVisible={isEditOpen}
        handleCancel={handleEditCancel}
      />
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired, // veya phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;

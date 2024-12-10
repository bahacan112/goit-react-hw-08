import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  if (filteredContacts.length === 0) {
    return <p className={styles.empty}>Rehberde kayıtlı kişi bulunamadı.</p>;
  }

  return (
    <ul className={styles.list}>
      {filteredContacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;

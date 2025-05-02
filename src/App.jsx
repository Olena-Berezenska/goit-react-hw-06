import ContactForm from './components/ContactForm/ContactForm ';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './redux/contactsSlice';
import { changeFilter } from './redux/filtersSlice';
import { number } from 'yup';

const App = () => {
  const contacts = useSelector(state => state.contactList.contacts);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  const HandleaddContact = data => {
    const newcontact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    dispatch(addContact(newcontact));
  };
  const handleChangeImput = e => {
    dispatch(changeFilter(e.target.value));
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const HandledeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={HandleaddContact} />
      <SearchBox onChange={handleChangeImput} inpValue={filter} />
      <ContactList
        contactList={filteredContacts}
        onDelete={HandledeleteContact}
      />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Form from 'components/Form';
import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';
import { save, load } from 'localStorage/localStorage';

const STORAGE_KEY = 'contacts';

const PhonePage = () => {
  const [contacts, setContacts] = useState(load(STORAGE_KEY) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(STORAGE_KEY, contacts);
  }, [contacts]);

  const handleAddContact = contact => {
    if (contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    setContacts([...contacts, contact]);
  };

  const handleDelete = item => {
    setContacts(contacts.filter(contact => contact.id !== item));
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisisbleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visible = getVisisbleContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <Form handleAddContact={handleAddContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactsList contacts={visible} handleDelete={handleDelete} />
    </>
  );
};
export default PhonePage;

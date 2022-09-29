import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import s from './form.module.scss';
import PropTypes from 'prop-types';

const Form = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact({ name, number, id: uuid() });
    reset();
  };

  const handleInputName = e => {
    setName(e.target.value);
  };

  const handleInputNumber = e => {
    setNumber(e.target.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.formLabel}>
        <span>Name</span>
        <input
          className={s.forminput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputName}
        />
      </label>
      <label className={s.formLabel}>
        <span>Number</span>
        <input
          className={s.forminput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputNumber}
        />
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  handleAddContact: PropTypes.func.isRequired,
};

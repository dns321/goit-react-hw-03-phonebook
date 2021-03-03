import React from 'react';
import style from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map(({ name, number, id }) => (
      <li key={id} className={style.itemContact}>
        {name}: {number}
        <button
          className={style.itemContactBtn}
          type="button"
          onClick={() => deleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;

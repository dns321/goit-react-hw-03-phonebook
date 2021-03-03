import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import Section from './section/Section';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = data => {
    this.setState(prev => ({
      contacts: [{ ...data, id: uuidv4() }, ...prev.contacts],
    }));
  };

  checkUniqueContact = contactName => {
    const findeContact = !this.state.contacts.find(
      contact => contact.name === contactName,
    );
    console.log(findeContact);
    return findeContact;
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const normolizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter),
    );

    return (
      <>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm
            updateState={this.handleAddContact}
            checkUniqueContact={this.checkUniqueContact}
          />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />

          <ContactList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;

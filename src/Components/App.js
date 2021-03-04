import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import Section from './section/Section';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = data => {
    this.setState(prev => ({
      contacts: [{ id: uuidv4(), ...data }, ...prev.contacts],
    }));
  };

  checkUniqueContact = contactName => {
    const findeContact = !this.state.contacts.find(
      contact => contact.name === contactName,
    );
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

  componentDidMount() {
    console.log('componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsetcontacts = JSON.parse(contacts);

    if (parsetcontacts) {
      this.setState({ contacts: parsetcontacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('right Locsal storeg');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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

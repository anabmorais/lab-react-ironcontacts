import React, { Component } from "react";
import "./App.css";
import allContacts from "./contacts.json";

class App extends Component {
  //copy of all contacts
  contactsToAdd = [...allContacts];

  state = {
    //after this moment the contacts to add has less 5 contacts
    contacts: this.contactsToAdd.splice(0, 5),
    sortBy: "default"
  };

  //Avoid Duplicates
  handleAddRandomContact = () => {
    if (this.contactsToAdd.length > 0) {
      const contactsToAddIndex = Math.floor(Math.random() * this.contactsToAdd.length);
      const randomContact = this.contactsToAdd[contactsToAddIndex];
      this.contactsToAdd.splice(contactsToAddIndex, 1);
      this.setState(state => {
        state.contacts.push(randomContact);
        return state;
      });
    }
  };

  handleSortByName = () => {
    this.setState({
      sortBy: "name"
    });
  };

  handleSortByPopularity = () => {
    this.setState({
      sortBy: "popularity"
    });
  };

  handleDeleteContact = contactId => {
    this.setState(state => {
     const indexToDelete = state.contacts.findIndex(contact => contact.id === contactId);
     if(indexToDelete !== -1) {
       const contactToRemove = state.contacts[indexToDelete];
       this.contactsToAdd.push(contactToRemove)
       state.contacts.splice(indexToDelete,1);
     }
      return state;
    });
  };

  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>

        <button onClick={this.handleAddRandomContact} disabled={this.state.contacts.length === allContacts.length}>
          Add Random Contact
        </button>
        <button onClick={this.handleSortByName} disabled={this.state.sortBy === "name"}>
          Sort by name
        </button>
        <button onClick={this.handleSortByPopularity} disabled={this.state.sortBy === "popularity"}>
          Sort by popularity
        </button>

        <table align="center">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts
              .sort((contactA, contactB) => {
                switch (this.state.sortBy) {
                  case "default":
                    return 0;

                  case "name":
                    if (contactA.name < contactB.name) {
                      return -1;
                    }
                    if (contactA.name > contactB.name) {
                      return 1;
                    }
                    return 0;

                  case "popularity":
                    return contactB.popularity - contactA.popularity;
                }
              })
              .map(contact => (
                <tr key={contact.id}>
                  <td>
                    <img className="contact-image" src={contact.pictureUrl} alt={`This is ${contact.name}`} />
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity.toFixed(2)}</td>
                  <td>
                    <button onClick={() => this.handleDeleteContact(contact.id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

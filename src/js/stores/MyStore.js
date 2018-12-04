import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";

class MyStore extends Flux.Store {

    constructor(){
        super();
        this.state = {
            contacts: []
        };
    }
    
    getContacts(){
        return this.state.contacts;
    }
    
    _setContacts(contacts) {
        console.log(contacts);
        var parsedContacts = JSON.parse(contacts);
        for (let i=0; i<parsedContacts.length; i++) {
            this.state.contacts.push(parsedContacts[i]);
        }
        this.setStoreState({
            contacts: this.state.contacts
        }).emit();
    }
    
    _addContact(incomingContact) {
        this.state.contacts.push(incomingContact);
        this.setStoreState({
            contacts: this.state.contacts
        }).emit();
    }
    
    _deleteContact(emailId) {
        let tempState = this.state;
        for (let i=0; i<tempState.contacts.length; i++) {
            if (tempState.contacts[i].email === emailId) {
                tempState.contacts.splice(i, 1);
                console.log(tempState.contacts[i].email);
            }
        }
        console.log(tempState);
        console.log(emailId);
        this.setStoreState({
            contacts: tempState.contacts
        }).emit();
    }
    
    _editContact(incomingContact) {
        let tempState = Object.assign({}, this.state);
        
        for (let i=0; i<tempState.contacts.length; i++) {
            if (tempState.contacts[i].email === incomingContact.email) {
                tempState.contacts[i].name = incomingContact.name;
                tempState.contacts[i].email = incomingContact.email;
                tempState.contacts[i].phone = incomingContact.phone;
                tempState.contacts[i].address = incomingContact.address;
            }
        }
        this.setStoreState({
            contacts: tempState.contacts
        }).emit();
    }
}
export default new MyStore();
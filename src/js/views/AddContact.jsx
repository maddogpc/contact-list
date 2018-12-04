import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import ContactActions from "../actions/MyActions.js";
import MyStore from "../stores/MyStore.js";
export default class Contacts extends Flux.View {
    constructor() {
        super();
        this.state = {
            edit: false,
            editContact: {name:"", email:"", phone:"", address:""}
        };
        //this.addContactHandler = this.addContactHandler.bind(this);
    }
    
    componentDidMount() {
        let editEmail = this.props.match.params.contact_id;
        let edit = (editEmail !== undefined);
        let editContact;
        if (edit) {
            let contacts = MyStore.getContacts();
                contacts.forEach((contact) => {
                    if (contact.email === editEmail) {
                        editContact = contact;
                    }
                });
            this.setState({edit: edit, editContact: editContact});
        }
        this.bindStore(MyStore, () => {
            this.props.history.push("/contacts");
        });
    }
    
    addEditContactHandler() {
        let name = document.querySelector("#nameInput").value;
        let email = document.querySelector("#emailInput").value;
        let phone = document.querySelector("#phoneInput").value;
        let address = document.querySelector("#addressInput").value;
        if (!this.state.edit) {
            ContactActions.addContact(name, email, phone, address);
        }
        else if (this.state.edit) {
            ContactActions.editContact(name, email, phone, address);
        }
    }
    
    handleChange(event) {
        let eventId = event.target.id;
        let editContact = this.state.editContact;
        if (eventId === "nameInput") {
            editContact.name = event.target.value;
            this.setState({editContact: editContact});
        }
        else if (eventId === "emailInput") {
            editContact.email = event.target.value;
            this.setState({editContact: editContact});
        }
        else if (eventId === "phoneInput") {
            editContact.phone = event.target.value;
            this.setState({editContact: editContact});
        }
        else if (eventId === "addressInput") {
            editContact.address = event.target.value;
            this.setState({editContact: editContact});
        }
    }
    
    
    
    render() {
        
        return (
            <div className="container">
                <div>
                    <h1 className="text-center mt-5">Add a new contact</h1>
                    <form>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" value={this.state.editContact.name} onChange={(e) => this.handleChange(e)} placeholder="Full Name" id="nameInput" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={this.state.editContact.email} onChange={(e) => this.handleChange(e)} placeholder="Enter email" id="emailInput" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="phone" className="form-control" value={this.state.editContact.phone} onChange={(e) => this.handleChange(e)} placeholder="Enter phone" id="phoneInput" />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" value={this.state.editContact.address} onChange={(e) => this.handleChange(e)} placeholder="Enter address" id="addressInput" />
                        </div>
                        <button onClick={this.addEditContactHandler.bind(this)} type="button" className="btn btn-primary form-control">save</button>
                        <Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
                    </form>
                </div>
            </div>
        );
    }
}
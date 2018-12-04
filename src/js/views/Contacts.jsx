import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";

import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import avatar1 from '../../img/user_1.jpg';
import MyStore from "../stores/MyStore.js";
import ContactActions from "../actions/MyActions.js";
export default class Contacts extends Flux.View {
    constructor(){
        super();
        this.state = {
            showModal: false,
            modalEmail: "",
            contacts: []
        };
    }
    
    componentDidMount() {
        const reContacts = MyStore.getContacts();
        this.setState({ contacts: reContacts });
        
        this.bindStore(MyStore, () => {
            const contacts = MyStore.getContacts();
            this.setState({contacts});
        });
        
    }
    
    onClickTrash(email) {
        this.setState({ showModal: true, modalEmail: email});
    }
    
    onClickTrashYes() {
        this.setState({ showModal: false});
        ContactActions.removeContact("e", this.state.modalEmail);
    }
    
    render() {
        const contactsInHTML = this.state.contacts.map((contact,i) => {
            return <ContactCard onClickTrash={this.onClickTrash.bind(this)} id={i} key={i} name={contact.name} address={contact.address} phone={contact.phone} email={contact.email} />;
        });
        return (
            <div className="container">
                <div>
                    <p className="text-right my-3">
                        <Link className="btn btn-success" to="/add">Add new contact</Link>
                    </p>
                    <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                        <ul className="list-group pull-down" id="contact-list">
                            {contactsInHTML}
                        </ul>
                    </div>
                </div>
                <Modal onClickTrashYes={this.onClickTrashYes.bind(this)} show={this.state.showModal} onClose={() => this.setState({ showModal: false})} />
            </div>
        );
    }
}
import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contacts from "./views/Contacts.jsx";
import MyActions from './actions/MyActions.js';
import AddContact from "./views/AddContact.jsx";

export default class Layout extends Flux.View {
    
    constructor(){
        super();
        MyActions.getContacts();
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path="/index.html" component={Contacts} />
                            <Route exact path="/" component={Contacts} />
                            <Route exact path="/contacts" component={Contacts} />
                            <Route exact path="/add" component={AddContact} />
                            <Route exact path="/edit/:contact_id" component={AddContact} />
                            <Route render={() => <h1 className="notfound">Not found!</h1>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

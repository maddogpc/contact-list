import Flux from '@4geeksacademy/react-flux-dash';
import MyStore from "../stores/MyStore.js";
class ContactActions extends Flux.Action{
    
    addContact(nameInp,emailInp,phoneInp,addressInp){
        var url = 'https://assets.breatheco.de/apis/fake/contact/';
        var data = {
          full_name: nameInp,
          email: emailInp,
          agenda_slug: "madisonv",
          address: addressInp,
          phone: phoneInp
          };
        console.log(nameInp, emailInp, addressInp, phoneInp);
        fetch(url, {
          method: 'PUT', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          mode: "cors", 
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((contact) => this.dispatch('MyStore.addContact', contact)
        );
    }
    removeContact(e, email){
        let id;
        const Contacts = MyStore.getContacts();
            for (let i=0; i<Contacts.length; i++) {
                if (Contacts[i].email === email) {
                    id = Contacts[i].id;
                }
            }  
        var url = 'https://assets.breatheco.de/apis/fake/contact/'+id;
        fetch(url, {
          method: 'DELETE', 
          mode: "cors", 
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(this.dispatch('MyStore.deleteContact', email)
        );
    }
    editContact(nameInp,emailInp,phoneInp,addressInp){
        this.dispatch(
            'MyStore.editContact', //store name followed by store setter method
            { name: nameInp, email: emailInp, phone: phoneInp, address: addressInp } //data to send to the store
        );
    }
    
    getContacts(){
        fetch('https://assets.breatheco.de/apis/fake/contact/agenda/madisonv', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors" // no-cors, cors, *same-origin
        })
          .then(function(response) {
            return response.text();
          })
          .then((contacts) => {
            this.dispatch('MyStore.setContacts', contacts);
          })
          .catch((error) => {
              console.log(error);
          });
    }
}
export default new ContactActions();
const Contact = require("../db/models").Contact;


module.exports = class ContactController {

  constructor(){
    this.contacts = [];
    this.addContactQuestions = [
        {
          type: "input",
          name: "name",
          message: "Contact's name - ",
          validate(val){
            return val !== "";
          }
        },
        {
          type: "input",
          name: "phone",
          message: "Contact's phone number - ",
          validate(val){
            return val !== "";
          }
        }
      ];
  }

  addContact(name, phone){
    return Contact.create({name, phone});
  }

  getContacts(){
    return Contact.findAll();
  }

  iterativeSearch(contacts, target){
    for(let contact of contacts){
      if(contact.name.toLowerCase() === target.toLowerCase()){
        return contact;
      }
    }
    return null;
  }

}

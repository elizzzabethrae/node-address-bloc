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

    this.searchQuestions = [
      {
        type: "input",
        name: "name",
        message: "Name of contact to search - ",
        validate(val){
          return val !== "";
        }
      }
    ];

    this.showContactQuestions = [
      {
        type: "list",
        name: "selected",
        message: "Please choose from an option below: ",
        choices: [
          "Delete contact",
          "Main menu"
        ]
      }
    ];

    this.deleteConfirmQuestions = [
      {
        type: "confirm",
        name: "confirmation",
        message: "are you sure you want to delete this contact?"
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

  binarySearch(contacts, target){
    let min = 0;
    let max = contacts.length - 1;
    let mid;

    while(min <= max) {

// #1
      mid = Math.floor((min + max) / 2);
      let currentContact = contacts[mid];

// #2
      if(currentContact.name > target){ //target is before element at mid, eliminate upper bound
        max = mid - 1;
      } else if(currentContact.name < target){ //target is after element at mid, eliminate lower bound
        min = mid - 1;
      } else { //element found, return it
        return contacts[mid];
      }
    }

    return null;
  }

  search(name){
    return Contact.findOne({
      where: {name}
    });
  }

  delete(id){
    return Contact.destroy({
      where: {id}
    })
  }

}

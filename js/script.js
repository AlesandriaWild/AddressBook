//Business Logic for AdressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

//Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber, emailOne, emailTwo, mailingAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailOne = emailOne;
  this.emailTwo = emailTwo;
  this.mailingAddress = mailingAddress;
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.getElementById("first-name").innerText = contact.firstName;
  document.getElementById("last-name").innerText = contact.lastName;
  document.getElementById("phone-number").innerText = contact.phoneNumber;
  document.getElementById("email-one").innerText = contact.emailOne;
  document.getElementById("email-two").innerText = contact.emailTwo;
  document.getElementById("mailing-address").innerText = contact.mailingAddress;
  document.getElementById("physical-address").innerText = contact.physicalAddress;
  document.querySelector("div#contact-details").removeAttribute("class");
}

// UI Logic
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName() + " ");
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul)
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail1 = document.querySelector("input#new-email-one").value;
  const inputtedEmail2 = document.querySelector("input#new-email-two").value;
  const inputtedMailingAddress = document.querySelector("input#new-mailing-address").value;
  const inputtedPhysicalAddress = document.querySelector("input#new-physical-address").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail1, inputtedEmail2, inputtedMailingAddress, inputtedPhysicalAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);
}

window.addEventListener("load", function () {
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("div#contacts").addEventListener("click", displayContactDetails);  
});
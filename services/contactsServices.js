// import fs from "fs/promises";
// import crypto from "crypto";
// import path from "path";
import { Contact } from "../schemas/mongoSchema.js";

// const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = Contact.find();
    return contacts;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function getContactById(id) {
  try {
    const contacts = await Contact.findById();

    return contacts || null;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = await Contact.create({ name, email, phone });

    return newContact;
  } catch (error) {
    return null;
  }
}

async function removeContact(id) {
  try {
    const removedContact = await Contact.findByIdAndDelete(id);
    return removedContact || null;
  } catch (error) {
    return null;
  }
}

// async function updateContact(id, body) {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(contact => contact.id === id);
//     if (index !== -1) {
//       const updatedContact = { ...contacts[index], ...body };
//       contacts[index] = updatedContact;
//       await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//       return updatedContact;
//     }
//   } catch (error) {
//     return null;
//   }
// }

async function updateContactService(id, name, email, phone) {
  try {
    const existingContact = await Contact.findById(id);

    if (!existingContact) {
      return null;
    }

    existingContact.name = name || existingContact.name;
    existingContact.email = email || existingContact.email;
    existingContact.phone = phone || existingContact.phone;

    await existingContact.save();

    return existingContact;
  } catch (error) {
    return null;
  }
}
async function updateStatusContact(id, favorite) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error(`Error updating contact's status: ${error}`);
    return null;
  }
}

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
  updateContactService,
};

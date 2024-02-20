import fs from "fs/promises";
import crypto from "crypto";
import path from "path";
// import HttpError from "../helpers/HttpError.js";

const contactsPath = path.join(__dirname, "../db/contacts.json");

export async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  } catch (error) {
    return null;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find(contact => contact.id === contactId);
    if (removedContact) {
      const updatedContacts = contacts.filter(
        contact => contact.id !== contactId
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );
      return removedContact || null;
    }
  } catch (error) {
    return null;
  }
}

export async function updatedContact(contactId, body) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      const updatedContact = { ...contacts[index], ...body };
      contacts[index] = updatedContact;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return updatedContact;
    }
  } catch (error) {
    return null;
  }
}
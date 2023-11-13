const fs = require("fs/promises");
const path = require("path");
 const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

  

const readFile = async () => {
  // "utf-8"
  const data = await fs.readFile("./files/file.txt", "utf-8");
  // return JSON.parse(data);
  return data;
};


const writeFile = async () => {
    const data = await fs.writeFile("./files/file2.txt", "Hallo word!");
  };
 

 // ===============================

async function  listContacts() {// ...твой код. Возвращает массив контактов.
  const data= await fs.readFile(contactsPath, "utf-8");
   return JSON.parse(data);
}


  async function getContactById(contactId) {// ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
    const contacts= await listContacts();
    // const data= await fs.readFile(contactsPath, "utf-8");
    //   return JSON.parse(data);
      const result = contacts.find((contact) => contact.id === contactId);
      return result || null;
      
     }
   
 async function addContact(name, email, phone) {// ...твой код. Возвращает объект добавленного контакта.
  const contacts= await listContacts();
  const newContact = {
     id: nanoid(),
    // id: String(Math.random()),
    name: name,
    email: email,
    phone: phone,
  };
  // console.log("newContact=", newContact);
  contacts.push(newContact);
  await fs.writeFile(contactsPath,JSON.stringify(contacts, null, 2));
  return newContact;
}

 

async function removeContact(contactId) {// ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts= await listContacts();

  index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath,JSON.stringify(contacts, null, 2));
    console.log("removedContact=", removedContact);
    return removedContact;
  } else {
    // console.log(null);
    return null;
  }
}

 module.exports = {
readFile,
writeFile,
listContacts,
addContact,
getContactById,
removeContact,
};
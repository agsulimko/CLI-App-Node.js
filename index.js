const { program } = require("commander");

const contacts = require("./contacts"); // тут функці ( readFile,writeFile,listContacts,addContact,getContactById,removeContact,)

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const getContacts = await contacts.getContactById(id);

      return console.log(getContacts);

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.log(addContact);
    case "update":
      const updateContacts = await contacts.updateContacts(
        id,
        name,
        email,
        phone
      );
      return console.log(updateContacts);

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);

    default:
      return console.log("Unknown action");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);

// якщо треба обновити
//         case "updateById":
//  const  updateContacts = await contacts.updateContacts( id, name, email, phone );
// return console.log(updateContacts);
// =====================
//  invokeAction(argv);
//   invokeAction({ action: "list"});
//    invokeAction({ action: "get", id: "Z5sbDlS7pCzNsnAHLtDJd"});
// invokeAction({action: "add", name:"artem",email: "a.g.sulimko@gmail.com", phone:"0506078888"});
// invokeAction({ action: "remove", id: "Z5sbDlS7pCzNsnAHLtDJd"});

// invokeAction({action: "updateById",id:"Z5sbDlS7pCzNsnAHLtDJd", name:"artem",email: "a.g.sulimko@gmail.com", phone:"0506078888"});

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id - выводим в консоль объект контакта или null, если контакта с таким id не существует.
// node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

// # Добавляем контакт и выводим в консоль созданный контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт и выводим в консоль удаленный контакт или null, если контакта с таким id не существует.
// node index.js --action remove --id 5bsw4KVffkAGgQuk0Uk7i

// # edit
// node index.js --action update --id 05olLMgyVQdWRwgKfg5J6 --name Mango --email mango@gmail.com --phone 322-22-22

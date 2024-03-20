import { createStorage } from "unstorage";
import { myStorageDriver } from "..";

const storage = createStorage({
  driver: myStorageDriver({
    owner: "Otto-J",
    repo: "nuxt-ijust.cc",
    auth: "",
  }),
});

// const keys = await storage.getKeys();
// console.log(1, keys);

const item = await storage.getItem("7");
console.log(3, item);

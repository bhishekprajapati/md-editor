import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";

import { createLocaleDate, getLocale } from "./utils";

const FILE_EXT = ".md";
const STORAGE_BASE = "app";

const storage = createStorage({
  driver: localStorageDriver({
    base: STORAGE_BASE,
  }),
});

const generateFilename = (function* generateMarkdownFilename() {
  let count = 1;
  while (true) {
    const filename = `untitled-${count}.md`;
    if (!MarkdownFile.findOne(filename)) yield filename;
    ++count;
  }
})();

export class MarkdownFile {
  filename = "";
  content = "";
  isNew = true;

  #meta = {
    createdAt: new Date().toISOString(),
  };

  constructor(filename, content) {
    this.filename = filename;
    this.content = content;
  }

  async save() {
    if (!this.isNew && (await MarkdownFile.findOne(this.filename))) {
      const answer = prompt(
        `A file with the name ${this.filename} already exists! Do you want to overwrite?`,
        "yes",
      );
      if (answer !== "yes") return null;
    }
    await storage.setItem(this.filename, {
      id: this.filename,
      content: this.content,
    });
    await storage.setMeta(this.filename, this.#meta);
    return true;
  }

  static async findOne(filename) {
    const entry = await storage.getItem(filename);
    if (entry) {
      const file = new MarkdownFile(filename);
      file.content = entry.content;
      file.isNew = false;
      return file;
    }
    return null;
  }

  static async getFileList() {
    const list = [];
    for (const key of await storage.getKeys(STORAGE_BASE)) {
      const filename = key.substring(STORAGE_BASE.length + 1);
      list.push({
        filename,
        meta: await storage.getMeta(filename),
      });
    }
    return list;
  }

  static generateFilename() {
    return generateFilename.next().value;
  }

  static getExt() {
    return FILE_EXT;
  }
}

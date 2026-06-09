import { getLinks, saveLinks } from "./feed-manager.mjs";
import { askQuestion, close, rl } from "./rl.mjs";
import https from "https";
import axios from "axios";
import Parser from "rss-parser";
import { EventEmitter } from "events";

const feeds = await getLinks();
const parser = new Parser();
const emitter = new EventEmitter();

function prompt() {
  rl.setPrompt(
    "Enter Command: (list, add, delete, update, read, quit): ",
  );
  rl.prompt();
}

rl.on("line", async (input) => {
  let cmdParts = input.trim().split(" ");

  emitter.emit(cmdParts[0], cmdParts.slice(1));
});

emitter.on("quit", async () => {
  await saveLinks(feeds);
  close();
});

emitter.on("list", () => {
  feeds.forEach((url, index) => {
    console.log(`${index + 1}.\t${url}`);
  });
  prompt();
});

emitter.on("add", (url) => {
  if (url === undefined || url.length === 0) {
    console.log("Please provide a URL to add.");
  } else {
    feeds.push(url);
  }
  prompt();
});

emitter.on("delete", (index) => {
  if (index === undefined || index.length === 0) {
    console.log("Please provide the index of the feed to delete.");
  } else {
    const i = parseInt(index) - 1;
    if (i >= 0 && i < feeds.length) {
      feeds.splice(i, 1);
    } else {
      console.log("Invalid index.");
    }
  }
  prompt();
}); 

emitter.on("update", (args) => {
  if (args === undefined || args.length < 2) {
    console.log("Please provide the index of the feed to update and the new URL.");
  } else {
    const index = parseInt(args[0]) - 1;
    const newUrl = args.slice(1).join(" ");
    if (index >= 0 && index < feeds.length) {
      feeds[index] = newUrl;
    } else {
      console.log("Invalid index.");
    }
  }
  prompt();
});

emitter.on("read", async (index) => {
  if (index === undefined || index.length === 0) {
    console.log("Please provide the index of the feed to read.");
  } else {
    const i = parseInt(index) - 1;
    if (i >= 0 && i < feeds.length) {
      // Process the read command for the specified feed
      let { data } = await axios.get(feeds[i]);
        let feed = await parser.parseString(data);
        feed.items.forEach((item) => {
          console.log(item.title);
        });
    } else {
      console.log("Invalid index.");
    }
  }
  prompt();
});

prompt();
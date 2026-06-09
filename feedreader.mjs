import { getLinks, saveLinks } from "./feed-manager.mjs";
import { askQuestion, close } from "./rl.mjs";
import https from "https";
import axios from "axios";
import Parser from "rss-parser";

const feeds = await getLinks();
const parser = new Parser();

let input = await askQuestion(
  "Enter Command: (list, add, delete, read, update, axios, quit): ",
);

while (input !== "quit") {
  let cmdParts = input.trim().split(" ");
  let cmd = cmdParts[0];
  // Process the command and its arguments
  //list
  if (cmd === "list") {
    feeds.forEach((url, index) => {
      console.log(`${index + 1}.\t${url}`);
    });
  }
  //add url
  if (cmd === "add") {
    if (cmdParts.length < 2) {
      console.log("Please provide a URL to add.");
    } else {
      const url = cmdParts.slice(1).join(" ");
      feeds.push(url);
    }
  }
  //delete index
  if (cmd === "delete") {
    if (cmdParts.length < 2) {
      console.log("Please provide the index of the feed to delete.");
    }
    const index = parseInt(cmdParts[1]) - 1;
    if (index >= 0 && index < feeds.length) {
      feeds.splice(index, 1);
    } else {
      console.log("Invalid index.");
    }
  }
  //read index
  if (cmd === "read") {
    https.get(feeds[parseInt(cmdParts[1]) - 1], (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        console.log(data);
      });
    });
  }
  //update index
  if (cmd === "update") {
    if (cmdParts.length < 3) {
      console.log(
        "Please provide the index of the feed to update and the new URL.",
      );
    }
    const index = parseInt(cmdParts[1]) - 1;
    const newUrl = cmdParts.slice(2).join(" ");
    if (index >= 0 && index < feeds.length) {
      feeds[index] = newUrl;
    } else {
      console.log("Invalid index.");
    }
  }
  //axios
  if (cmd === "axios") {
    if (cmdParts.length < 2) {
      console.log("Please provide the index of the feed to read.");
    } else {
      let index = parseInt(cmdParts[1]) - 1;
      if (index < 0 || index >= feeds.length) {
        console.log("Invalid index.");
        continue;
      } else {
        let { data } = await axios.get(feeds[index]);

        let feed = await parser.parseString(data);
        feed.items.forEach((item) => {
          console.log(item.title);
        });
      }
    }
  }
  input = await askQuestion(
    "Enter Command: (list, add, delete, read, update, axios, quit): ",
  );
}
await saveLinks(feeds);
close();

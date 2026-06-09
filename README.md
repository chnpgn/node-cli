# Node CLI RSS Feed Manager

## Overview

This repository contains a small Node.js command-line application for managing and reading RSS feeds. It supports storing feed URLs in `feeds.json`, listing and updating them, and fetching feed content using HTTP or RSS parsing.

The project includes two CLI entrypoints:

- `feedreader.mjs` - a simple interactive prompt-based RSS feed manager.
- `feedreader-evt.mjs` - an alternative implementation using `EventEmitter` for command handling.

Supporting files:

- `feed-manager.mjs` - loads and saves the persistent feed URL list in `feeds.json`.
- `rl.mjs` - provides a reusable readline wrapper for prompting the user.
- `feeds.json` - stores the feed URL list between runs.
- `calc.js` - a small unrelated CLI number input demo.

## Features

The main feed reader CLI supports the following commands:

- `list` - show all saved feed URLs with indexes.
- `add <url>` - append a new feed URL to the list.
- `delete <index>` - remove the feed at the given index.
- `update <index> <new-url>` - replace the feed URL at the given index.
- `read <index>` - fetch the raw feed content from the selected URL and print it.
- `axios <index>` (only in `feedreader.mjs`) - fetch the selected feed URL using Axios, parse it with `rss-parser`, and print the item titles.
- `quit` - save the feed list to `feeds.json` and exit.

## Libraries Used

The application uses these dependencies:

- `axios` - for HTTP requests to RSS feed URLs.
- `rss-parser` - for parsing RSS/Atom XML feed content.

It also uses Node.js built-in modules:

- `https` - raw HTTP(S) requests.
- `fs/promises` - file access and read/write operations.
- `path` and `url` - resolve file paths in ESM.
- `readline/promises` - prompt the user from the terminal.
- `events` - event-driven command handling in `feedreader-evt.mjs`.

## Requirements

- Node.js 18 or newer is recommended.
- The project is configured as an ES module package via `package.json` with `"type": "module"`.

## Installation

From the repository root, install dependencies:

```bash
npm install
```

## Running the Application

To run the default interactive feed manager:

```bash
node feedreader.mjs
```

To run the event-driven version:

```bash
node feedreader-evt.mjs
```

Example session:

1. Start the app.
2. Enter `list` to see saved feed URLs.
3. Enter `add https://example.com/feed.xml` to add a feed.
4. Enter `axios 1` to fetch and parse the first feed.
5. Enter `quit` to save changes and exit.

## Data Storage

Feed URLs are saved in `feeds.json`. The feed manager automatically creates `feeds.json` as an empty array if the file does not already exist.

## Notes

- `feedreader.mjs` includes both raw HTTP reading and RSS parsing capabilities.
- `feedreader-evt.mjs` demonstrates the same command set with an event-based architecture.
- `calc.js` is a simple separate CLI example and is not part of the main feed manager flow.


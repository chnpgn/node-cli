import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { access, readFile, writeFile, constants } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile = join(__dirname, 'feeds.json');

export async function getLinks() {
  try {
    await access(jsonFile, constants.F_OK);
    const data = await readFile(jsonFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    await writeFile(jsonFile, JSON.stringify([]));
    return [];
  }
}

export async function saveLinks(links) {
  await writeFile(jsonFile, JSON.stringify(links));
}
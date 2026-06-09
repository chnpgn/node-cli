import * as readLine from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = readLine.createInterface({ input, output });

export async function askQuestion(question) {
  const answer = await rl.question(question);
  return answer;
}

export function close() {
  rl.close();
}

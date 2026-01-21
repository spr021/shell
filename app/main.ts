import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ");
rl.prompt();

rl.on("line", (line) => {
  const command = line.trim();
  switch (command) {
    case "exit":
      rl.close();
      return;
    default:
      console.log(`${command}: command not found`);
      break;
  }
  rl.prompt();
});

rl.on("close", () => {
  process.exit(0);
});
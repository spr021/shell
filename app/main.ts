import { createInterface } from "readline"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.setPrompt("$ ")
rl.prompt()

const builtInCommands = ["exit", "echo", "type"]

rl.on("line", (line) => {
  const command = line.trim()
  const commandName = command.split(" ")[0]
  switch (commandName) {
    case "exit":
      rl.close()
      return
    case "echo":
      console.log(command.slice(5))
      break
    case "type":
      builtInCommands.includes(command.split(" ")[1])
        ? console.log(`${command.split(" ")[1]} is a shell builtin`)
        : console.log(`${command.slice(5)}: not found`)
      break
    default:
      console.log(`${command}: command not found`)
      break
  }
  rl.prompt()
})

rl.on("close", () => {
  process.exit(0)
})

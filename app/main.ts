import { createInterface } from "readline"
import { existsSync, accessSync, constants } from "fs"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const builtinCommands = ["echo", "exit", "type"]
const paths = process.env["PATH"]?.split(":") || []

const echo = (input: string): void => {
  rl.write(`${input}\n`)
}

const type = (input: string): void => {
  if (builtinCommands.includes(input)) {
    rl.write(`${input} is a shell builtin\n`)
  } else {
    for (const p of paths) {
      const filePath = `${p}/${input}`
      if (existsSync(filePath)) {
        try {
          accessSync(filePath, constants.X_OK)
          rl.write(`${input} is ${filePath}\n`)
          return
        } catch (e) {
          // File exists but not executable, continue searching
        }
      }
    }

    rl.write(`${input}: not found\n`)
  }
}

const main = (): void => {
  rl.question("$ ", (answer) => {
    if (answer === "exit") {
      process.exit(0)
    } else if (answer.startsWith("echo")) {
      echo(answer.slice(5))
    } else if (answer.startsWith("type")) {
      type(answer.slice(5))
    } else {
      rl.write(`${answer}: command not found\n`)
    }

    main()
  })
}

main()

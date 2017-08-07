import chalk from "chalk"
import notifier from "node-notifier"

export default function createNotification(options)
{
  const title = `${options.title}`

  if (options.notify) {
    notifier.notify({
      title,
      message: options.message
    })
  }

  const level = options.level || "info"
  const message = `${chalk.bold(title)}: ${options.message}`

  switch (level) {
    case "warn":
      console.log(chalk.yellow(message))
      break

    case "error":
      console.log(chalk.bgRed.white(message))
      break

    case "info":
    default:
      console.log(message)
  }
}

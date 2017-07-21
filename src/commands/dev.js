import chalk from "chalk"

import createExpress from "../express/createExpressServer"
import { addDevMiddleware } from "../express/dev"

const DEVELOPMENT_PORT = process.env.DEVELOPMENT_PORT

export function startDevServer() {
  const server = createExpress({})
  const compiler = addDevMiddleware(server)

  let serverIsStarted = false

  /* eslint-disable no-console */
  compiler.plugin("done", (stats) => {
    if (!stats.hasErrors()) {
      console.log(chalk.green("Webpack compiled successfully."))

      if (!serverIsStarted) {
        serverIsStarted = true

        server.listen(DEVELOPMENT_PORT, () => {
          console.log(`Development Server started @ Port ${DEVELOPMENT_PORT}`)
        })
      }
    } else {
      console.error("Webpack failed!")
    }
  })
}

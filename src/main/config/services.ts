import { readdirSync } from 'fs'

export default (server: any): void => {
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../services/${file}`)).default(server)
    }
  })
}
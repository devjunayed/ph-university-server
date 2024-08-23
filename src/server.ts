/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'

let server: Server

async function main() {
    await mongoose.connect(config.db_url as string)
    server = app.listen(config.port, () => {
        console.log(`server is running at port ${config.port}`)
    })
}
main()

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandledRejection is detected, shutting down ...')
    console.log(reason)
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on('uncaughtException', () => {
    console.log('uncaughtException is detected, shutting down ...')

    process.exit(1)
})

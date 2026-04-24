import 'dotenv/config'
import mongoose from 'mongoose'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import connectMongoDB from './db/mongodb.js'
import Person from './models/Person.js'

const argv = yargs(hideBin(process.argv))
    .command('add <firstname> <lastname>', 'Add a new name')
    .help()
    .argv

const main = async () => {
    try {
        await connectMongoDB(process.env.MONGO_URI)

        const command = argv._[0]

        if (!command) {
            const people = await Person.find({})
            console.log('\n📋 All names:')
            people.forEach(p => {
                console.log(`${p.firstname} ${p.lastname}`)
            })
        }

        else if (command === 'add') {
            const firstname = argv.firstname
            const lastname = argv.lastname

            const person = await Person.create({
                firstname,
                lastname
            })

            console.log('\n✅ Person saved:')
            console.log(person.firstname, person.lastname)
        }

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await mongoose.connection.close()
    }
}

main()
import { createConnection } from 'typeorm'

createConnection().then(() => console.log('📦 Success Connected Database!'))
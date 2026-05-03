import 'dotenv/config'
import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI in .env')
  process.exit(1)
}

await mongoose.connect(uri)
console.log('Connected to MongoDB')

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => {
    await mongoose.disconnect()
    process.exit(0)
  })
}

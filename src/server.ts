import mongoose from 'mongoose'
import { app } from './app'

const PORT = process.env.PORT || 3333

mongoose.connect(process.env.DATABASE_URL as string)
  .then(() => console.log('Connection to database is a success'))
  .catch((err) => console.log('Error connecting to database', err))

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`)
})

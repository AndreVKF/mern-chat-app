import mongoose from 'mongoose'

export const mongoConnection = async () => {
  const connectionUrl = process.env.MONGO_CONNECTION_STR

  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Successufully connected to database!!')
  } catch (error) {
    console.log(error)
  }
}

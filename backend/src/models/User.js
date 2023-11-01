import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, lowerCase: true },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
  },
  { timestamps: true },
)

export const UserModel = mongoose.model('User', UserSchema)

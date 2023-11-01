import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    recipientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true },
)

export const MessageModel = mongoose.model('Message', MessageSchema)

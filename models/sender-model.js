const { Schema, model } = require('mongoose');

const SenderSchema = new Schema({
  username: { type: String, required: true },
  senderId: { type: String, required: true },
  messages: [{ message: { type: String }, my: { type: Boolean } }],
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
});

module.exports = model('Sender', SenderSchema);

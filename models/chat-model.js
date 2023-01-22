const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
  link: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  keys: { type: Schema.Types.ObjectId, ref: 'Keys', required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  senders: [{ type: Schema.Types.ObjectId, ref: 'Sender' }],
});

module.exports = model('Chat', ChatSchema);

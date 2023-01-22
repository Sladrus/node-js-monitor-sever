const { Schema, model } = require('mongoose');

const RequestShema = new Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Number, required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
});

module.exports = model('Request', RequestShema);

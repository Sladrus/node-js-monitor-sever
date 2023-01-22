const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
  api_id: { type: Number, required: true },
  api_hash: { type: String, required: true },
  phone: { type: Number, default: 0 },
  key: { type: String, required: true, unique: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
});

module.exports = model('Account', AccountSchema);

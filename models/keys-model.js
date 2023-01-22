const { Schema, model } = require('mongoose');

const KeysSchema = new Schema({
  title: { type: String, required: true },
  list: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Keys', KeysSchema);

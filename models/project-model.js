const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  bot: { type: String },
  usersList: [{ type: String }],
  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Project', ProjectSchema);

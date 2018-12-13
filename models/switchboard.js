const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwitchboardSchema = new Schema({

  host: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = Switchboard = mongoose.model('switchboard', SwitchboardSchema);
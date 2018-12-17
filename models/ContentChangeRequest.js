const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentChangeRequestSchema = new Schema({

  name: {
    type: String
  },

  email: {
    type: String
  },

  organization: {
    type: String
  },

  storenumber: {
    type: String
  },

  promoname: {
    type: String
  },

  startdate: {
    type: Date
  },

  enddate: {
    type: Date
  },

  requesttype: {
    type: String
  },

  requestrelatesto: {
    type: String
  },

  requestdetail: {
    type: String
  },

  lineupsaffected: {
    type: Boolean
  },

  daypartsaffected: {
    type: String
  },

  timeofdayaffected: {
    type: String
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = ContentChangeRequest = mongoose.model('contentChangeRequest', ContentChangeRequestSchema);
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

  promoname: {
    type: String
  },

  startdate: {
    type: String
  },

  enddate: {
    type: String
  },

  requesttype: {
    type: Array
  },

  requestrelatesto: {
    type: Array
  },

  requestdetail: {
    type: String
  },

  islineupsaffected: {
    type: Boolean
  },
  
  lineupsaffecteddetail: {
    type: String
  },

  daypartsaffected: {
    type: Array
  },

  timeofdayaffected: {
    type: Array
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = ContentChangeRequest = mongoose.model('contentChangeRequest', ContentChangeRequestSchema);
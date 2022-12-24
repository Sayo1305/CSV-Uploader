const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Userdata = require('./User');
const csvfile = new Schema({
  arrofdata: {
    type: Object,
  },
  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Userdata,
  }],
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const csvdata = mongoose.model("csvdata", csvfile);
module.exports = csvdata;

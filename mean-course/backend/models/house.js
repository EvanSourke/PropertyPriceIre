const mongoose = require('mongoose');


const houseSchema = mongoose.Schema({
  dateOfSale: {type:String, required: true },
  Address: { type: String, required: true },
  County: { type: String, required: true },
  Price: { type: String, required: true },
  //Description: { type: String, required: false },
},
{collection : 'houseData'});


module.exports = mongoose.model('House',  houseSchema);

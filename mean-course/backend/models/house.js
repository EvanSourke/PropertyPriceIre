const mongoose = require('mongoose');


const houseSchema = mongoose.Schema({
  dateOfSale: {type:String, required: true },
  Address: { type: String, required: true },
  County: { type: String, required: true },
  Price: { type: Number, required: true },
  eircode: { type: String, required: false},
  notFullMarketPrice: { type: String, required: false},
  vatExclusive: { type: String, required: false},
  descriptionOfProperty: { type: String, required: false},
  propertySizeDescription: { type: String, required: false},
},
{collection : 'houseData'});


module.exports = mongoose.model('House',  houseSchema);

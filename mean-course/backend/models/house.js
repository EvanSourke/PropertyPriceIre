const mongoose = require('mongoose');


const houseSchema = mongoose.Schema({
  DateofSale: {type:Date, required: true },
  Address: { type: String, required: true },
  County: { type: String, required: true },
  Price: { type: Number, required: true },
  Eircode: { type: String, required: false}
},
{collection : 'housesData'});


module.exports = mongoose.model('House',  houseSchema);

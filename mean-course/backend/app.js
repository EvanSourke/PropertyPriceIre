const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require('moment')

const house = require("./models/house");

const app = express();

mongoose.connect("mongodb+srv://EvanS:19vZ6bm4DyhtPC3M@FYP.mj91dum.mongodb.net/FYP?retryWrites=true&w=majority")
  .then(()=>{
    console.log('Connected to Database!')
  })
  .catch(() =>{
    console.log('Connection failed')
  });

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


//cross origin resources, allows cross domain comms
app.use((req, res ,next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET"
  );
  next();
});

//"http://localhost:3000/api/GET/"+County+"/"+PropertyType+"/"+Start+"/"+End+"/"+PriceFrom+"/"+PriceTo
//only http requests with '' will reach this
//house.where("County").equals(County).where("Date of Sale (dd/mm/yyyy)").gte(Start).lte(End).where("Price").gt(PriceFrom).lt(PriceTo)
// house.find({County: County, dateOfSale: {$gte: Start, $lte: End }, Price: {$gte: PriceFrom, $lte: PriceTo }})

///:County/:Start/:End/:PriceFrom/:PriceTo

//, dateOfSale: {$gte: Start, $lte: End },

app.get("/api/GET" , (req, res, next) => {
  const County = String(req.query.County);
  const Start = new Date(req.query.Start);
  const End = new Date(req.query.End);
  const PriceFrom = Number(req.query.PriceFrom);
  const PriceTo = Number(req.query.PriceTo);

  console.log(req.query);

  house.find({County: County, DateofSale: {$gte: Start, $lte: End }, Price: {$gte: PriceFrom, $lte: PriceTo }})
  .then((documents) => {
    documents = documents.map(document => ({
      DateofSale: moment(document.DateofSale).format('DD/MM/YYYY'),
      Address: document.Address,
      County: document.County,
      Price: document.Price,
      Eircode: document.Eircode
    }));
    res.status(200).json({
      message: 'Houses fetched successfully!',
      houses: documents
    });
  });
});

app.get("/api/GET2" , (req, res, next) => {
  const Address = String(req.query.Address);

  console.log(req.query);

  house.find({Address: {$regex: Address, $options: 'i'}})
  .then((documents) => {
    documents = documents.map(document => ({
      DateofSale: moment(document.DateofSale).format('DD/MM/YYYY'),
      Address: document.Address,
      County: document.County,
      Price: document.Price,
      Eircode: document.Eircode
    }));
    res.status(200).json({
      message: 'Houses fetched successfully!',
      houses: documents
    });
  });
});


module.exports = app;

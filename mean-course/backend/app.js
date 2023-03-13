const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const house = require("./models/house");

const app = express();

mongoose.connect("mongodb+srv://EvanS:ewavAgwbD5KPkQLj@FYP.mj91dum.mongodb.net/FYP?retryWrites=true&w=majority")
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

app.get("/api/GET/:County/:Start/:End/:PriceFrom/:PriceTo" , (req, res, next) => {
  const County = String(req.params.County);
  const Start = new Date(req.params.Start);
  const End = new Date(req.params.End);
  const PriceFrom = Number(req.params.PriceFrom);
  const PriceTo = Number(req.params.PriceTo);

  house.where("County").equals(County).where("Date of Sale (dd/mm/yyyy)").gte(Start).lte(End).where("Price").gt(PriceFrom).lt(PriceTo)
  .then(documents => {
    res.status(200).json({
      message: 'Houses fetched successfully!',
      houseData: documents
    });
  });
});

// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//       res.status(201).json({
//       message: 'Post added sucessfully',
//       postId: createdPost._id
//     });
//   });
// });

// app.delete("/api/posts/:id", (req, res, next ) => {
//   Post.deleteOne({_id: req.params.id}).then(result => {
//     console.log(result);
//     res.status(200).json({
//       message: "Post deleted!"
//     });
//   })

// })


module.exports = app;

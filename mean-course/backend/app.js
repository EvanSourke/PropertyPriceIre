const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://EvanS:ewavAgwbD5KPkQLj@fyp.mj91dum.mongodb.net/node-angular?retryWrites=true&w=majority")
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
      res.status(201).json({
      message: 'Post added sucessfully',
      postId: createdPost._id
    });
  });
});

//only http requests with '/api/posts' will reach this
app.get('/api/posts',(req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next ) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted!"
    });
  })

})


module.exports = app;

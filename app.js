const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/slotbookDB", {useNewUrlParser: true, useUnifiedTopology: true});

const formSchema = {
  name: String,
  email: String,
  contact: Number,
  location: String,
  category: String,
  subject: String,
  description: String,
}

const User = mongoose.model("User", formSchema);


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){

  const user1 = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    location: req.body.location,
    category: req.body.category,
    subject: req.body.subject,
    description: req.body.description,
  });
  user1.save();
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is running at 3000");
});

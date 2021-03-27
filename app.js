const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

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
  res.sendFile(__dirname+"/view/index.html");
});

app.post("/", function(req, res){

  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const location = req.body.location;
  const category = req.body.category;
  const subject = req.body.subject;
  const description = req.body.description;

  const user1 = new User({
    name: name,
    email: email,
    contact: contact,
    location: location,
    category: category,
    subject: subject,
    description: description,
  });
  user1.save();

});
    var message = {
      from: "mailaddress.sethu@gmail.com",
      to: "ssethuraman09@gmail.com",
      subject: name+"-"+subject,
      text: description,
    };
    let info = await transporter.sendMail(message);
  }
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is running at 3000");
});

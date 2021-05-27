const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const port = 5000;
const staticDir = __dirname + "\\static\\";
const bcrypt = require("bcryptjs")
const UserModel = require("./UserModel");
const bodyParser = require("body-parser");

const databaseModel = require("./databaseModel");
 

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.set('views', './views')
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('./index',{name:"samira"});
})

app.get("/", async function(req, res){
const User =await UserModel.getUser();
res.render
})



app.post("/register", async function (req,res) {
  console.log(req.body.password)
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  UserModel.saveUser(req.body.email, hashedPassword);
  res.redirect("/");

 
});

app.post("/login", async function (req,res) {
  const user = await UserModel.getUser(req.body.email);
  await bcrypt.compare(req.body.password, user.password, (err, success) => {

    if (err) {
      console.log(err);
    
  }
if (success) console.log("Success");
else console.log("Fail");
  });
     res.redirect("/");
  
});

app.listen(port, function() {
console.log(`Example app listening on port ${port}!`);
});

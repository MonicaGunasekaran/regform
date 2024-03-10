var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
app.use(bodyparser.json());
app.use(express.static("public"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://127.0.0.1/Database");
var db = mongoose.connection;
db.on("error", () => console.log("Error in connecting Database"));
db.on("open", () => console.log("Database Connected"));
app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var phone = req.body.phone;
  var gender = req.body.gender;
  var password = req.body.password;
  var data = {
    name: name,
    age: age,
    email: email,
    phone: phone,
    gender: gender,
    password: password,
  };
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record inserted Successfully");
  });
  return res.redirect("signup_success.html");
});
app.get("/", (req, res) => {
  res.set({ "Allow-access-Allow-Origin": "*" });
  return res.redirect("index.html");
});

app.listen(3000);
console.log("Listening on port");

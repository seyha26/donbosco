
// API key 2ce3311c035a8c7452e9e6d8c5cc4ae0-us10
// Audience ID 4ee1d1c625



const express = require("express");
const bodyPharser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyPharser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
  console.log(res.statusCode)
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/4ee1d1c625";

  const options = {
    method: "POST",
    auth: "seyha1:2ce3311c035a8c7452e9e6d8c5cc4ae0-us10"
  };

   const request = https.request(url, options, function(response){
    response.on("data", function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }

      console.log(JSON.parse(data));

    });
  });

  // request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000.");
});

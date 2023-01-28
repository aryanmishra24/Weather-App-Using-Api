const bodyParser = require("body-parser");
//const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function (req, res) {
res.sendFile(__dirname+"/index.html");})

app.post("/",function(req,res){
    const query= req.body.city;
    console.log("post request recieved")
    const appid="9e60cdcd809f517c1a03449491d10c8d";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q="+query;
    console.log(req.body.city);
    https.get(url, function(response) {
        response.on('data', function(chunk){
            const data =chunk.toString();
            const weather = JSON.parse(data);
            console.log(weather);
            const t=weather.main.temp;
            var temp=Number(t)-273.15;
            res.write("weather at "+ query+" is "+temp+" C");
            const icon=weather.weather.icon;
            const url="http://openweathermap.org/img/wn/01n@2x.png";
            res.write("<img src="+ url +">");
            res.send();
        });
      
        
     })
})



app.listen(3000, function () {
    console.log("port 3000 server is running");
})

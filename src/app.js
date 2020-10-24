const express = require("express");
const app = express();
const path = require("path");
const hbs  = require("hbs");
const port = process.env.PORT || 8000;

//public folder static path
const publicStaticPath = path.join(__dirname,"../public");
const templateStaticPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

/*

 nodemon src/app.js -e js,hbs 

*/
// console.log(publicPath);

app.set("view engine","hbs");
app.set("views", templateStaticPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticPath));

//routing
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/weather", (req, res) => {
    res.render("weather");
})

app.get("*", (req, res) => {
    res.render("404error", {
        errorMsg:'Opps! Page Not Found' 
    });
})

app.listen(port,() => console.log(`Connect to ${port} port`));
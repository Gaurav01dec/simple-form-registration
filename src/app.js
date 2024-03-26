const express = require("express");
const path = require("path");
const hbs = require("hbs");//handlebars
const Register = require("./models/register");
require("./db/conn");

const app = express();
const port = 8000;
//defining static path
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Root page
// app.use(express.static(staticPath));
//using template engine 
app.set("view engine", "hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index.hbs");
})
app.post("/", async (req, res) => {
    try {
        const registerEmployee = new Register({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            password:req.body.password,
        })
        registerEmployee.save();
        res.render("index.hbs")
    } catch (error) {
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(
        `listening on port http://localhost:${port}`
    );
});
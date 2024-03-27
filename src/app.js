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
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.hbs");
})
app.post("/register", async (req, res) => {
    try {
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
        })
        registerEmployee.save();
        res.render("index.hbs")
    } catch (error) {
        res.send(error);
    }
})

app.post("/login", async (req, res) => {
    const resultdata = await Register.find({ email: req.body.email })

    if (resultdata.length == 0) {
        res.send(`No record found ...Login Failed`)

    } else{
        nameinDatabase = await resultdata[0].name

        passwordByUser = await req.body.password

        if (passwordByUser == resultdata[0].password) {

            res.send(`${nameinDatabase} ...Login Success`)
        }else{
            res.send(`Wrong Password ...Login Failed`)
        }
    }
    // console.log(req.body.email);
    // console.log(req.body.password);

})

app.listen(port, () => {
    console.log(
        `listening on port http://localhost:${port}`
    );
});
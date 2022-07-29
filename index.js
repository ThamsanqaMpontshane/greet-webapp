import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import greet from "./greet.js";
import flash from "express-flash";
import session from "express-session";
// import pgPromise from 'pg-promise';

const app = express();
const greet1 = greet();
// const pgp = pgPromise();
// const db = pgp("postgres://ktbmqlfewjewga:db46b615c42ed38f43050b4fd1b875395874a1f89d7edbeeb8882529738cbb3a@ec2-50-19-255-190.compute-1.amazonaws.com:5432/daud1uk12sgdr5");

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

// here we get the get the settings
app.get("/", (req, res) => {
    let theGreeting = greet1.getLanguage();
    let bala = greet1.getCounter();
    // let restart = greet1.clear();
    res.render("index", {
        getTheGreeting: theGreeting,
        thiscounter: bala,
        // theClear: restart
    });
});

// set and send data or reset data
app.post("/greetings", (req, res) => {
    let name = req.body.theName;
    let language = req.body.language;
    let nameMap = greet1.getName();

    if (name == "" && language == null) {
        req.flash("info", "Please Enter A Name And Language");
    } else if (name == "" && language !== null) {
        req.flash("info", "Please Enter A Name");
    } else if (!name.match(/^[a-zA-Z]+$/)) {
        req.flash("info", "Please Enter A Valid Name");
    } else if (language == null) {
        req.flash("info", "Please Select A Language");
    }
    //duplicate name
    else if (nameMap[name] > 1) {
        req.flash("info", "You have already greeted " + name + " once");
    }
    greet1.setlanguage(name, language);
    greet1.error(name, language);
    greet1.setName(name, language);
    greet1.duplicate(name);
    greet1.forCounter();
    res.redirect("/");
});

app.get("/greeted", function (req, res) {
    console.log(greet1.getName());
    res.render('names', {
        names: greet1.getName()
    });
});

app.get("/greeted/:name", function (req, res) {
    let name = req.params.name;
    let nameMap = greet1.getName();
    for (let key in nameMap) {
        if (key === name) {
            res.render('counter', {
                name: key,
                count: " " + nameMap[key],
                myMessage: "You have greeted ",
                times: " times"
            });
        }
    }
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
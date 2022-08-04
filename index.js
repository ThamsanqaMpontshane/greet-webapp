import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import greet from "./greet.js";
import flash from "express-flash";
import session from "express-session";
import pgPromise from 'pg-promise';


const app = express();
const pgp = pgPromise({});

const local = process.env.LOCAL;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greet';

const db = pgp(connectionString);
const greet1 = greet(db);

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

//  !here we get the get the settings
app.get("/", async (req, res) => {
    // console.log(req.body.theName + "sddsdsdsdsdsdsd")
    // const theGreeting = greet1.setName(req.body.theName);
    const bala = await greet1.everyoneCounter();
    res.render("index", {
        // getTheGreeting: theGreeting,
        thiscounter: bala,
    });
});

// !set and send data or reset data
app.post("/greetings", (req, res) => {
    const name = req.body.theName;
    console.log(req.body.theName + "sddsdsdsdsdsdsd")

    const {
        language
    } = req.body;
    if (name == "" && language == null) {
        req.flash("info", "Please Enter A Name And Language");
    } else if (name == "" && language !== null) {
        req.flash("info", "Please Enter A Name");
    } else if (!name.match(/^[a-zA-Z]+$/)) {
        req.flash("info", "Please Enter A Valid Name");
    } else if (language == null) {
        req.flash("info", "Please Select A Language");
    }
    greet1.setName(name);
    greet1.forCounter();
    res.redirect("/");
});

app.get("/greeted", async (req, res) => {
    let listOfNames = await greet1.getName()
    console.log(listOfNames);
    res.render('names', {
        names: listOfNames
    });

});

app.get("/greeted/:username", (req, res) => {
    const {
        name
    } = req.params;
    const nameMap = greet1.getName();
    for (let key in nameMap) {
        if (key === name) {
            res.render('counter', {
                name,
                count: ` ${name}`,
                myMessage: "You have greeted ",
                times: " times"
            });
        }
    }
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
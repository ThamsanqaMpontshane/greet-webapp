import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import greet from "./greet.js";
import flash from "express-flash";
import session from "express-session";
import pgPromise from 'pg-promise';


const app = express();
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greet';

const config = {
    connectionString    
}

if(process.env.NODE_ENV == "production"){
    config.ssl = {
        rejectUnauthorized: false
    }
}

const db = pgp(config);
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
    const theMessages = await greet1.greetingmsg();
    const bala = await greet1.everyoneCounter();
    // console.log(bala)
    res.render("index", {
        theGreetingMessage: theMessages,
        thiscounter: bala
    });
});

// !set and send data or reset data
app.post("/greetings", async  (req, res) => {
    const name = req.body.theName;

    const { language } = req.body;
    if (name == "" && language == null) {
        req.flash("info", "Please Enter A Name And Language");
    } else if (name == "" && language !== null) {
        req.flash("info", "Please Enter A Name");
    } else if (!name.match(/^[a-zA-Z]+$/)) {
        req.flash("info", "Please Enter A Valid Name");
    } else if (language == null) {
        req.flash("info", "Please Select A Language");
    }
    greet1.setTheGreeting(name, language);
    greet1.setName(name);
    // await greet1.everyoneCounter();
  
    res.redirect("/");
});

app.get("/greeted", async (req, res) => {
    const listOfNames = await greet1.getName()
    res.render('names', {
        names: listOfNames
    });

});

app.get("/greeted/:theName", async (req, res) => {
    const name = req.params.theName;
    const personcounter = await greet1.personsCounter(name);
    console.log(personcounter[0].counter);
            res.render("counter", {
                name: name,
                count: personcounter[0].counter
            });
        }
        
);

app.listen(process.env.PORT || 3004, function(){
    console.log("Express server listening on port", this.address().port, app.settings.env);
  });
import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import greet from "./greet.js";
import flash from "express-flash";
import session from "express-session";
import pgPromise from 'pg-promise';
import greetRouter from './routes/routes.js';

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
const Routers = greetRouter(greet1);

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
app.get('/', Routers.defaultRoute);
// !set and send data or reset data
app.post('/greetings', Routers.Homepage);
app.get("/greeted", Routers.GreetedNames);
app.get("/greeted/:theName", Routers.Summary);
app.get("/reset", Routers.reset);
// !PORT
app.listen(process.env.PORT || 3_004, () => {
  });
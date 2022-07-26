import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import greet from './greet.js';

const app = express();
const greet1 = greet();

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

// here we get the get the settings
app.get('/', (req, res) => {
    let theGreeting = greet1.getLanguage();
    console.log(theGreeting);
    res.render("index", {
        getTheGreeting: theGreeting,
    });
});

// set and send data or reset data
app.post('/greetings', (req, res) => {
    let name = req.body.theName;
    let language = req.body.language;
    greet1.setlanguage(name,language)
    greet1.setName(name);
    res.redirect('/');
});


app.get('/greeted', (req, res) => {
    let name = req.body.theName;
    let language = req.body.language;
    let theGreeting = greet1.greetingMessage(name,language);
    greet1.setName(name)
    greet1.setlanguage(language)
    res.redirect('/');
    console.log(name);
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
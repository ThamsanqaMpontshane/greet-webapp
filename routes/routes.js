const greeter = (greetings) => {

    async function defaultRoute(req, res) {
    const theMessages = await greetings.greetingmsg();
    const bala = await greetings.everyoneCounter();
    res.render('index', {
        theGreetingMessage: theMessages,
        thiscounter: bala,
    });
}

async function Homepage(req, res) {
    const name = req.body.theName;
    await greetings.setName(name);
    const {language } = req.body;

    if (name == "" && language == null) {
        req.flash("info", "Please Enter A Name And Language");
    } else if (name == "" && language !== null) {
        req.flash("info", "Please Enter A Name");
    } else if (!name.match(/^[a-zA-Z]+$/)) {
        req.flash("info", "Please Enter A Valid Name");
    } else if (language == null) {
        req.flash("info", "Please Select A Language");
    }
    await greetings.setTheGreeting(name, language);
    await greetings.everyoneCounter();
    res.redirect('/');
}

async function GreetedNames(req, res) {
    const listOfNames = await greetings.getName()
    res.render('names', {
        names: listOfNames
    });
}

async function Summary(req, res) {
    const name = req.params.theName;
    const personcounter = await greetings.personsCounter(name);
    res.render("counter", {
        name,
        count: personcounter[0].counter,
    });
}

async function reset(req, res) {
    await greetings.reset()
    req.flash("info", "The Database Has Been Reset");
    res.redirect("/")
}
return {
    defaultRoute,
    Homepage,
    GreetedNames,
    Summary,
    reset
}
};

export default greeter;
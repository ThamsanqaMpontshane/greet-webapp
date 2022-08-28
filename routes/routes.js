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
    const { language } = req.body;
    await greetings.setName(name,language);
    const getTheName = await greetings.getName();

    if (name == "" && language == null) {
        req.flash("info", "Please Enter A Name And Language")
    } else if (name == "" && language !== null) {
        req.flash("info", "Please Enter A Name");
    } else if (!name.match(/^[a-zA-Z]+$/)) {
        req.flash("info", "Please Enter A Valid Name");
    } else if (language == null) {
        req.flash("info", "Please Select A Language");
    }else if (getTheName.includes(name)){
        req.flash("info", "The Name Exist");
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
        count: personcounter,
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
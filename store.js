function greet(data) {
    let nameMap = data || {};
    let greetingmessage = "";
    function setName(name) {
        if (name) {
            if (nameMap[name] === undefined) {
                nameMap[name] = 1;
            }
            nameMap[name]++;
        }

    }

    function getName() {
        return Object.keys(nameMap);
    }

    function setlanguage(name,language) {
        
        if (language === "English") {
            greetingmessage = "Hello " + "" + name;
        } else if (language === "Xhosa") {
            greetingmessage = "Molo " + "" + name;
        } else if (language === "Afrikaans") {
            greetingmessage = "Hallo " + "" + name;
        }
        console.log(greetingmessage)

        //push to languageData
        // return greetingmessage;
    }
    function getLanguage(){
        return greetingmessage
    }

    function greetingMessage(name, language) {
        let theGreeting = setlanguage(language, name);
        return theGreeting
    }


    function error(name, language) {

        if (name == "" && language == null) {
            return "Please Enter A Name And Language";
        } else if (name == "" && language !== "") {
            return "Please Enter A Name";
        } else if (!name.match(/^[a-zA-Z]+$/)) {
            return "Please Enter A Valid Name";
        } else if (language == null) {
            return "Please Select A Language";
        }
        
    }


    function forCounter() {
        return Object.keys(nameMap).length;
    }

    return {
        setName,
        getName,
        greetingMessage,
        forCounter,
        error,
        setlanguage,
        getLanguage
    }
};

export default greet;
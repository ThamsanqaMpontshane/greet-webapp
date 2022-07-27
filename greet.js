function greet(data) {
    let nameMap = data || {};
    let greetingmessage = "";
    let greetingerror = "";
    function setName(name, language) {
        if (name) { 
            //if language is not selected do not add to nameMap
            if (language) {
            let upperCaseName = name.toUpperCase();
            if (nameMap[upperCaseName] === undefined || nameMap[upperCaseName] === null && nameMap[upperCaseName] !== Number) {
                nameMap[upperCaseName] = 0;
            }
            nameMap[upperCaseName]++;
        }
    }
    }
    function getName() {
        return nameMap;
    }
    
    function setlanguage(name,language) {
        //if language is not selected
        if (language !== null && language !== "" && language !== undefined && name !== "" && name !== null && name !== undefined && name.match(/^[a-zA-Z]+$/)) {
            if (language === "English") {
                greetingmessage = "Hello " + "" + name;
            } else if (language === "Xhosa") {
                greetingmessage = `Molo ${name}`;
            } else if (language === "Afrikaans") {
                greetingmessage = "Hallo " + "" + name;
            }
        }
    }

    function getLanguage(){
        return greetingmessage;
    }
    function error(name, language) {
        if (name == "" && language == null) {
            greetingerror = "Please Enter A Name And Language";
        } else if (name == "" && language !== "") {
            greetingerror = "Please Enter A Name";
        } else if (!name.match(/^[a-zA-Z]+$/)) {
            greetingerror = "Please Enter A Valid Name";
        } else if (language == null) {
            greetingerror = "Please Select A Language";
        }
    }
    function duplicate(name) {
        if (nameMap[name] > 1) {
            greetingerror = "You have already greeted " + name + " once";
        }
    }
    function greetingError() {
        return greetingerror;
    }
    function forCounter() {
        var myCounter = Object.keys(nameMap).length;
        return myCounter;
    }
    function getCounter() {
        return forCounter();
    }
    function reset() {
        nameMap = {};
        greetingmessage = "";
        greetingerror = "";
    }

    return {
        setName,
        getName,
        forCounter,
        error,
        setlanguage,
        getLanguage,
        greetingError,
        getCounter,
        duplicate,
        reset
    };
}

export default greet;
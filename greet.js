function greet(db) {
    let greetingmessage = "";
    async function setName(name, language) {
        const upperCasedName = name.toUpperCase();
        const result = await db.manyOrNone('select username from mygreetedusers where username = $1', [upperCasedName]);
        
        if(language) {
        if (result.length == 0 && upperCasedName !== "" && upperCasedName.match(/^[a-zA-Z]+$/)) {
            await db.none('INSERT INTO mygreetedusers (username, counter) VALUES ($1, $2)', [upperCasedName, 1]);
        } else if (result.length >= 1) {
            await db.none('UPDATE mygreetedusers SET counter = counter + 1 WHERE username = $1', [upperCasedName]);
        }
        }
    }

    async function getName() {
        return await db.manyOrNone('select username from mygreetedusers');
    }

    async function personsCounter(name) {
        const upperCasedName = name.toUpperCase();
        const theCounter = await db.manyOrNone('select counter from mygreetedusers where username = $1', [upperCasedName]);
        console.log
        return theCounter[0].counter;
    }

    async function everyoneCounter() {
        const result = await db.oneOrNone('select count(username) from mygreetedusers');
        return result.count
    }

    async function setTheGreeting(name, language) {
        if (name !== "" && name.match(/^[a-zA-Z]+$/)) {
            if (language === "English") {
                greetingmessage = `Hello ${name}`;
                return;
            }
            if (language === "Xhosa") {
                greetingmessage = `Molo ${name}`;
                return;
            }
            if (language === "Afrikaans") {
                greetingmessage = `Hallo ${name}`;
                return;
            }
        }
    }

    async function greetingmsg() {
        return greetingmessage;
    }

    async function reset() {
        await db.none('delete from mygreetedusers');
        greetingmessage = "";
    }

    return {
        setName,
        getName,
        reset,
        personsCounter,
        everyoneCounter,
        setTheGreeting,
        greetingmsg,
    };
}
export default greet;

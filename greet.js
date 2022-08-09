
function greet(db) {
    let greetingmessage = "";

    async function setName(name) {
        const result = await db.manyOrNone('select username from mygreetedusers where username = $1', [name])
        if (result.length === 0 && name !== "" && name.match(/^[a-zA-Z]+$/)) {
            db.none('INSERT INTO mygreetedusers (username, counter) VALUES ($1, $2)', [name, 1])
        
        } else {
            db.none('UPDATE mygreetedusers SET counter = counter + 1 WHERE username = $1', [name])
        }
    }

    async function getName() {
        return await db.manyOrNone('select username from mygreetedusers');
    }

    async function personsCounter(name) {
        const result = await db.manyOrNone('select counter from mygreetedusers where username = $1', [name]);
        return result;
    }

    async function everyoneCounter() {
        const result = await db.manyOrNone('select * from mygreetedusers');
        return result.length;
    }
    async function setTheGreeting(name, language) {
        if(name !== "" && name.match(/^[a-zA-Z]+$/)){
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


































































// function greet(db) {
//     let greetingmessage = "";
//     const username = {};
//     async function setName(name, language) {
//         //let username be an object that will store the names


//         if(name !== '' && language !== null) {
//             username.name = name;
//             if(name.match(/^[a-zA-Z]+$/)) {
//                 const newUser = {

//                 username : username.name,
//                 counter: 0,

//             };
//             console.log(newUser);
//                 if(language === 'english' && newUser.username !== '' && newUser.counter === 0) {
//                     greetingmessage = `Hello ${name}`;
//                     db.none('INSERT INTO mygreetedusers (username, counter) VALUES ($1, $2)', [name, 1])
//                     console.log(greetingmessage);
//                 }
//                 else if(language === 'xhosa' && newUser.username !== '' && newUser.counter === 0) {
//                     greetingmessage = `Molo ${name}`;
//                     db.none('INSERT INTO mygreetedusers (username, counter) VALUES ($1, $2)', [name, 1])

//                 }else if(language === 'afrikaans' && newUser.username !== '' && newUser.counter === 0) {
//                     greetingmessage = `Hallo ${name}`;
//                     db.none('INSERT INTO mygreetedusers (username, counter) VALUES ($1, $2)', [name, 1])
//                 }else{
//                     db.none('UPDATE mygreetedusers SET counter = counter + 1 WHERE username = $1', [name])
//                 }
//             }
//             else{
//                 greetingmessage = "Please Enter A Valid Name";
//             }
//     }
// }
//     async function getName() {
//         // return nameMap;
//         }

//     async function getLanguage() {
//         return greetingmessage;
//         }

//     async function forCounter() {
//             // return Object.keys(nameMap).length;
//         }

//     async function getCounter() {
//             return forCounter();
//         }

//     async function reset() {
//             nameMap = {};
//             greetingmessage = "";
//             greetingerror = "";
//         }

//         return {
//             setName,
//             getName,
//             forCounter,
//             getLanguage,
//             getCounter,
//             reset,
//         };
//     }

//     export default greet;
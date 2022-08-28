import assert from 'assert';
import greet from '../greet.js';
import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/thegreet';

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

describe("GREETINGS APP", async () => {
   beforeEach(async () => {
       await db.manyOrNone('Delete from mygreetedusers where id > 0');
   });
    it("should greet username in English", async () => {
        const name = "John";
        await greet1.setName(name);
        await greet1.setTheGreeting(name, "English");
        const greeting = await greet1.greetingmsg();
        assert.equal(greeting, "Hello John");
    }),
    it("should greet username in Xhosa", async () => {
        const name = "John";
        await greet1.setName(name);
        await greet1.setTheGreeting(name, "Xhosa");
        const greeting = await greet1.greetingmsg();
        assert.equal("Molo John", greeting);
    }),
    it("should greet username in Afrikaans", async () => {
        const name = "John";
        await greet1.setName(name);
        await greet1.setTheGreeting(name, "Afrikaans");
        const greeting = await greet1.greetingmsg();
        assert.equal("Hallo John", greeting);
    }),
    it("should be able to count how many people have been greeted", async () => {
        await greet1.setName("lucky", "Xhosa" );
        await greet1.setName("thamsanqa","English" );
        assert.equal(2,await greet1.everyoneCounter());
    }),
    it("should be able to count how many people have been greeted", async () => {
        await greet1.setName("lucky","Xhosa");
        await greet1.setName("thamsanqa", "Xhosa");
        await greet1.setName("thamie", "Xhosa");
        assert.equal(3,await greet1.everyoneCounter());
    }),
    it("should be able to count how many times `Luckeez` has been greeted", async () => {
        await greet1.setName("luckeez", "Xhosa");
        await greet1.setName("luckeez", "Xhosa");
        assert.equal(2,await greet1.personsCounter("luckeez") );
    })
    it("should be able to count how many times `Thamsanqa` has been greeted", async () => {
        await greet1.setName("thamsanqa", "Xhosa");
        await greet1.setName("thamsanqa","Xhosa");
        await greet1.setName("thamsanqa", "Xhosa");
        assert.equal(3,await greet1.personsCounter("thamsanqa") );
    }),
    it("should be able to count how many times `Thamie` has been greeted", async () => {
        await greet1.setName("thamie", "Xhosa");
        await greet1.setName("thamsanqa", "Xhosa");
        await greet1.setName("lucky", "Xhosa");
        assert.equal(1,await greet1.personsCounter("thamie") );
    })
    after(async () => {
        await db.manyOrNone('Truncate mygreetedusers');
    })
});
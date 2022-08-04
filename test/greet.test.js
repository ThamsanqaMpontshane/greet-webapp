import assert from 'assert';
import greet from '../greet.js';

describe("GREETINGS APP", function () {
    describe("Greeting", function () {
        it("should greet the user in English", function () {
            const greeting = greet();
            assert.equal(greeting.greetingMessage("Lucky", "English"), "Hello Lucky");
        });

        it("should greet the user in Xhosa", function () {
            const greeting = greet();
            assert.equal(greeting.greetingMessage("Lucky", "Xhosa"), "Molo Lucky");
        });

        it("should greet the user in Afrikaans", function () {
            const greeting = greet();
            assert.equal(greeting.greetingMessage("Lucky", "Afrikaans"), "Hallo Lucky");
        });

    });

    describe("Counter", function () {
        it("should count how many users have been greeted", function () {
            const greeting = greet();
            greeting.greetingMessage("Lucky", "English");
            greeting.greetingMessage("Lucky", "English");
            greeting.greetingMessage("Lucky", "English");
            assert.equal(greeting.forCounter(), 1);
        });

        it("should count how many users have been greeted", function () {
            let greeting = greet();
            greeting.greetingMessage("Thamie", "English");
            greeting.greetingMessage("Mabhozeni", "English");
            greeting.greetingMessage("Khisto", "English");
            assert.equal(greeting.forCounter(), 3);
        });

        it("should count how many users have been greeted", function () {
            let greeting = greet();
            greeting.greetingMessage("Thamie", "English");
            greeting.greetingMessage("Thamie", "English");
            greeting.greetingMessage("Khisto", "English");
            assert.equal(greeting.forCounter(), 2);
        });

        it("should count how many users have been greeted", function () {
            let greeting = greet();
            greeting.greetingMessage("Thamie", "English");
            greeting.greetingMessage("Thamie", "English");
            greeting.greetingMessage("Khisto", "English");
            greeting.greetingMessage("Khisto", "English");
            greeting.greetingMessage("Khisto", "English");
            greeting.greetingMessage("Lucky", "English");
            assert.equal(greeting.forCounter(), 3);
        });
    });

    describe("Error Messages", function () {
        it("should return error message when name is empty and language is empty", function () {
            let greeting = greet();
            assert.equal(greeting.error("", null), "Please Enter A Name And Language");
        });
        it("should return error message when name is empty and language is not empty", function () {
            let greeting = greet();
            assert.equal(greeting.error("", "English"), "Please Enter A Name");
        });
        it("should return error message when name is not empty and language is empty", function () {
            let greeting = greet();
            assert.equal(greeting.error("Lucky", null), "Please Select A Language");
        });
        it("should return error message when name does not match the regex", function () {
            let greeting = greet();
            assert.equal(greeting.error("123", "English"), "Please Enter A Valid Name");
        });
    });

    describe("Duplicates", function () {
        it("should return true if name is in the list", function () {
            let greeting = greet();
            greeting.greetingMessage("Lucky", "English");
            assert.equal(greeting.duplicates("Lucky"), true);
        });
        it("should return false if name is not in the list", function () {
            let greeting = greet();
            greeting.greetingMessage("Khisto", "English");
            assert.equal(greeting.duplicates("Lucky"), false);
        });
    });
});
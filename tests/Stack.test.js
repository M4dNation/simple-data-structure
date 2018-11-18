const Stack = require("../src/Stack");

describe("Stack", () => 
{
    test("Instanciate should return an empty stack.", () => 
    {
        const stack = new Stack();

        expect(stack).toBeInstanceOf(Stack);
        expect(stack.size).toBe(0);
    });

    test("Adding an element to the stack increases the size.", () => 
    {
        const stack = new Stack();
        stack.push("test");

        expect(stack.size).toBe(1);
    });

    test("Poping an element from the stack decreases the size.", () => {
        const stack = new Stack();
        stack.push("test");
        stack.push("test1");

        stack.pop();

        expect(stack.size).toBe(1);
    });

    test("Poping an element from an empty returns undefined.", () => {
        const stack = new Stack();

        const result = stack.pop();

        expect(result).toBe(undefined);
    });
});
const Tree = require("../src/Tree");

describe("Tree", () => 
{
    test("Instanciate should return an empty stack.", () => 
    {
        const tree = new Tree();

        expect(tree).toBeInstanceOf(Tree);
        expect(tree.root).toBe(null);
        expect(tree.height).toBe(0);
    });

    test("Setting root node update tree height", () => 
    {
        const tree = new Tree();

        tree.root = "root node";

        expect(tree.height).toBe(1);
    });
});
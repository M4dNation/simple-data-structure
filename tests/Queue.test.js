const Queue = require("../src/Queue");

describe("Queue", () => 
{
    test("Instanciate should return an empty queue.", () => 
    {
        const queue = new Queue();

        expect(queue).toBeInstanceOf(Queue);
        expect(queue.newestIndex).toBe(1);
        expect(queue.oldestIndex).toBe(1);
    });

    test("Adding an element to the queue updates newest index.", () => 
    {
        const queue = new Queue();
        queue.enqueue("test");

        expect(queue.newestIndex).toBe(2);
    });

    test("Poping an element to the queue updates oldest index.", () => {
        const queue = new Queue();
        queue.enqueue("test");
        queue.enqueue("test1");

        queue.dequeue();

        expect(queue.oldestIndex).toBe(2);
    });

    test("Poping last element resets queue indexes.", () => 
    {
        const queue = new Queue();
        queue.enqueue("test");
        queue.enqueue("test1");
        queue.enqueue("test2");

        queue.dequeue();
        queue.dequeue();
        queue.dequeue();

        expect(queue.newestIndex).toBe(1);
        expect(queue.oldestIndex).toBe(1);
    });
});
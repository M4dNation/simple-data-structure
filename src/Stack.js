class Stack
{
	/**
    *  Build a new queue structure.
    */
	constructor()
	{
		this.size = 0;

		this.storage = {};
	}

	/**
    * Push data inside the stack.
    * @param    {Object}    data    The data to be pushed in the stack.
    */
	push(data)
	{
    	this.storage[++this.size] = data;
	}

	/**
    * Pop data from the stack.
    * @return   {Object}    The most recently added data in the stack.
    */
	pop()
	{
		if (this.size <= 0)
		{
			return ;
		}

        const data = this.storage[this.size];
 
        delete this.storage[this.size];
        this.size--;
 
        return data;
	}
};

module.exports = Stack;
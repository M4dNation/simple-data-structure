const Queue = require("./Queue");

class Tree
{
	/**
    * Build a new tree structure.
    */
	constructor()
	{
		this._rootNode = null;
	}

	/**
    * @setter
    * Set the root node of the tree.
    * @param    {Node}  node    The root node of the tree.
    */
	set root(node)
	{
		this._rootNode = node;
	}

	/**
    * @getter
    * Get the root node of the tree.
    * @return   {Node}  The root node of the tree.
    */
	get root()
	{
		return this._rootNode;
	}

	/**
    * @getter
    * Get all the nodes of the tree as an array.
    * @return   {Array}	All the nodes as an array.
    */
	get nodes()
	{
		let nodes = [];
		
		breadthFirstSearch(function(node)
		{
			nodes.push(node);
		}, this._rootNode);

		return nodes;
	}

	/**
	* @getter
    * Get the size of the tree.
    * @return   {Number}    The total of nodes in the tree.
    */
	get size()
	{
		let total = 0;

		breadthFirstSearch(function()
		{
			total++;
		}, this._rootNode);

		return total;
	}

	/**
    * @getter
    * Get the height of the tree.
    * @return   {Number}    The maximum height of the tree.
    */
	get height()
	{
		return branchHeight(this._rootNode);
	}

	/**
    * This function is used in order to find a node in the tree.
    * @param 	{String}	id	The node id.
    * @return 	{Node} 			The searched node.
    */
	findNode(id, traversal = breadthFirstSearch)
	{
		let node = null;
		let callback = function(n)
		{
			if (n.id === id)
			{
				node = n;
			}
		};

		traversal.call(this, callback);

		return node;
	}

	/**
    * Add a node to the tree.
    * @param	{Node}		node 		The new node.
    * @param	{String} 	parentId 	The parent node id.
    */
	addNode(node, parentId, traversal = breadthFirstSearch)
	{
		let parent = this.findNode(parentId, traversal);

		if (parent)
		{
			parent.addChild(node);
		}
		else
		{
			throw new Error("Cannot add to non existing node.");
		}
	}

	/**
    * Add to move a node in the tree.
    * @param	{String}	id 				The node to move.
    * @param 	{String} 	id 				The new node's parent id
    * @param 	{Boolean} 	keepChildren 	Whether or not the children should be kept and linked to the new parent.
    */
	moveNode(id, parentId, keepChildren = false, traversal = breadthFirstSearch)
	{
		let node = this.findNode(id, traversal);
		let parent = this.findNode(parentId, traversal);
		let child = null;

		if (parent)
		{
			if (!keepChildren)
			{
				while(node.hasChildren())
				{
					child = node.children[0];

					for (let i = 0, l = node.parent.length; i < l; i++)
					{
						child.addParent(node.parent[i]);
					}
					
					node.removeChild(child);
				}
			}

			while(node.hasParent())
			{
				node.removeParent(node.parent[0]);
			}

			node.addParent(parent);
		}
		else
		{
			throw new Error("Cannot move root node.");
		}
	}

	/**
    * Remove a node from the tree.
    * @param	{Node} 		id 				The node id.
    * @param 	{Boolean} 	keepChildren 	Whether or not the children should be kept and linked to the new parent.
    * @return 	{Node} 						The removed node.
    */
	removeNode(id, keepChildren = false, traversal = breadthFirstSearch)
	{
		let nodeToRemove = this.findNode(id, traversal);

		if (!nodeToRemove)
		{
			throw new Error("Cannot remove non existing node.");
		}

		let parent = nodeToRemove.parent;
		let child = null;

		if (nodeToRemove.hasParent())
		{
			if (keepChildren)
			{
				while(nodeToRemove.hasChildren())
				{
					child = nodeToRemove.children[0];

					for (let i = 0, l = parent.length; i < l; i++)
					{
						child.addParent(parent[i]);
					}

					nodeToRemove.removeChild(child);
				}
			}

			while(nodeToRemove.hasParent())
			{
				parent[0].removeChild(nodeToRemove);
			}
		}
		else
		{
			throw new Error("Cannot remove root node.");
		}

		return nodeToRemove;
	}

	/**
    * Get all node of a branch.
    * @param	{Array}		branch 	The destination array.
    * @param	{Node} 		node 	The starting node.
    */
	getBranch(branch, node)
	{
		let callback = function(n)
		{
			branch.push(n);
		};

		breadthFirstSearch(callback, node);
	}

	/**
    * Print the tree in the console.
    */
	print()
	{
		recursePrint(this._rootNode, "");	
	}
};

function recursePrint(startingNode, prefix)
{
    console.log(prefix + startingNode.title);
    for (let i = 0, length = startingNode.children.length; i < length; i++)
    {
        recursePrint(startingNode.childen[i], "\t" + prefix);
    }
}

function branchHeight(startingNode)
{
    if (!startingNode.hasChildren())
    {
        return 1;
    }

	let maxHeight = 0;
	let lastHeight = 0;

	for (let i = 0, l = startingNode.children.length; i < l; i++)
	{
        lastHeight = branchHeight(startingNode.children[i]) + 1;
        
        if (lastHeight > maxHeight)
        {
            maxHeight = lastHeight;
        }
	}

	return maxHeight;
}

/**
* Traverse a tree with breadth-first search.
* Apply a callback method to every visited node in the process.
* @param	{Function}	callback	The function to apply to every visited node during search.
* @param	{Node} 		entryNode 	The starting node of the traversal
*/
function breadthFirstSearch(callback, entryNode)
{
	let queue = new Queue();

	queue.enqueue(entryNode);
	currentTree = queue.dequeue();

	while (currentTree)
	{
		for (let i = 0, length = currentTree.children.length; i < length; i++)
		{
			queue.enqueue(currentTree.children[i]);
		}

		callback(currentTree);

		currentTree = queue.dequeue();
	}
};

/**
* Traverse a tree with depth-first search.
* Apply a callback method to every visited node in the process.
* @param {Function}	callback 	The function to apply to every visited node during search.
* @param {Node} 	entryNode 	The starting node of the traversal
*/
function depthFirstSearch(callback, entryNode)
{
	(function recurse(currentNode)
	{
		for (let i = 0, length = currentNode.children.length; i < length; i++)
		{
			recurse(currentNode.children[i]);
		}

		callback(currentNode);
	})(entryNode);
}

module.exports = Tree;
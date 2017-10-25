
var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var fs = require("fs");

function main()
{
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["analysis.js"];
	}
	var filePath = args[0];

	complexity(filePath);
	/*
	console.log(
		"| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth 	|\n"+
		"| :---          | :---         	| :---       | :---         		| :---         		|"
	);
	*/
	// Report
	for( var node in builders )
	{
		var builder = builders[node];
		builder.report();
	}

}


var builders = {};

// Represent a reusable "class" following the Builder pattern.
function FunctionBuilder()
{
	this.StartLine = 0;
	this.FunctionName = "";
	// The number of parameters for functions
	this.ParameterCount = 0,
	// Number of if statements/loops + 1
	this.SimpleCyclomaticComplexity = 0;
	// The max depth of scopes (nested ifs, loops, etc)
	this.MaxNestingDepth  = 0;
	// The max number of conditions if one decision statement
	this.MaxConditions = 0;
	// The number of Sync method calls
	this.SyncCallCount = 0;
	// The number of return statement
	this.Returns = 0;
	// The length of longest message chains
	this.MaxMessageChains = 0;
	// The start and end location of the function
	this.StartLine = 0;
 	this.EndLine = 0;

	this.report = function()
	{
		/*
		console.log(
			(
				"|{0}()|" +
				" {2} | " + 
				" {3} | " +
		 	    " {4} | " +
		 		" {5} | " 
			)
			.format(this.FunctionName, this.StartLine,
				this.EndLine - this.StartLine,
				this.SyncCallCount,
				this.MaxMessageChains, 
				this.MaxNestingDepth
			)
		);
		*/
		
		console.log(
		    (
		    	"{0}(): {1}\n" +
				"============\n" +
				"Method Length: {2} | " + 
				"Sync Calls: {3} | " +
		 	    "Max Message Chains: {4} | " +
		 		"Max Nesting Depth: {5} | " +
		 		"Max Conditions: {6} | " +
		 		"Parameters: {7} | " +
		 		"Returns: {8}\n"
		 	)
			 .format(this.FunctionName, this.StartLine,
					this.EndLine - this.StartLine,
					this.SyncCallCount,
					this.MaxMessageChains, 
					this.MaxNestingDepth,
					this.MaxConditions, 
					this.ParameterCount, 
					this.Returns)
		);

		if (this.EndLine - this.StartLine > 120) {
			console.log("**Fail**. Long method ( > 120 lines)\n");
		}
		if (this.SyncCallCount > 1) {
			console.log("**Fail**. Sync call more than once\n");
		}
		if (this.MaxMessageChains > 3) {
			console.log("**Fail**. MaxMessageChains > 3\n");
		}
		if (this.MaxNestingDepth > 3) {
			console.log("**Fail**. Big O > O(n^3)\n");
		}
		

	}
};

// A builder for storing file level information.
function FileBuilder()
{
	this.FileName = "";
	// Number of strings in a file.
	this.Strings = 0;
	// Number of imports in a file.
	this.ImportCount = 0;
	// Number of Conditions in a file
	this.AllConditions = 0;

	this.report = function(){ }
}

// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverseWithParents(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent')
            {
            	child.parent = object;
							traverseWithParents(child, visitor);
            }
        }
    }
}
// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverse(object, num)
{
    var key, child;

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key === 'property')
            {
            	child.parent = object;
					num++;
					num += traverse(child, visitor);
            }
        }
    }
		return num;
}

function complexity(filePath)
{
	var buf = fs.readFileSync(filePath, "utf8");
	var ast = esprima.parse(buf, options);

	var i = 0;

	// A file level-builder:
	var fileBuilder = new FileBuilder();
	fileBuilder.FileName = filePath;
	fileBuilder.ImportCount = 0;
	builders[fileBuilder.filePath] = fileBuilder;

	// Tranverse program with a function visitor.
	traverseWithParents(ast, function (node)
	{
		if (node.type === 'FunctionDeclaration')
		{

			var builder = new FunctionBuilder();
			var paraNum = 0;
			//ParameterCount
			for (var p in node.params) {
				builder.ParameterCount += 1;
			}
			builder.StartLine    = node.loc.start.line;
			builder.EndLine      = node.loc.end.line;
			builder.FunctionName = functionName(node);
			builders[builder.FunctionName] = builder;

			traverseWithParents(node, function (child)
			{
				//SimpleCyclomaticComplexity
				if (isDecision(child))
				{
					builder.SimpleCyclomaticComplexity += 1;
				}
				//Returns
				if (child.type == 'ReturnStatement')
				{
					builder.Returns++;
				}
				//MaxMessageChains
				if(child.type === "MemberExpression") {
					var maxChains = 0;
					traverseWithParents(child, function (grandchild) {
						if(grandchild.type === "MemberExpression") {
							maxChains += 1;
						}
					});
					if(maxChains > builder.MaxMessageChains) {
						builder.MaxMessageChains = maxChains;
					}
				}
				//MaxConditions
				if (child.type === 'IfStatement')
				{
					temp = 1;
					traverseWithParents(child.test, function(subchild){
						if (subchild.type == 'LogicalExpression')
						{
							temp++;
						}
					});
					if (temp > builder.MaxConditions)
						builder.MaxConditions = temp;
				}
				//MaxNestingDepth
				if (isDecision(child)){
					res = nestDepth(child);
					if (res > builder.MaxNestingDepth)
						builder.MaxNestingDepth = res;
				}
				//SyncCallCount
				if(child.type === 'CallExpression'){
					var callName = String(child.callee.name);
					if(callName.includes('Sync')) builder.SyncCallCount++;
				}
			});
		}
		//String Usage
		if (node.type == "Literal" && typeof(node.value) === "string")
		{
			fileBuilder.Strings += 1;
		}


		if (node.type === 'Identifier' && node.name === 'require')
		{
			fileBuilder.ImportCount++;
		}

		//AllConditions
		if (node.type == 'BinaryExpression')
		{
			fileBuilder.AllConditions++;
		}
	});

}

// Helper function for counting children of node.
function childrenLength(node)
{
	var key, child;
	var count = 0;
	for (key in node)
	{
		if (node.hasOwnProperty(key))
		{
			child = node[key];
			if (typeof child === 'object' && child !== null && key != 'parent')
			{
				count++;
			}
		}
	}
	return count;
}


// Helper function for checking if a node is a "decision type node"
function isDecision(node)
{
	if( node.type == 'IfStatement' || node.type == 'ForStatement' || node.type == 'WhileStatement' ||
		 node.type == 'ForInStatement' || node.type == 'DoWhileStatement')
	{
		return true;
	}
	return false;
}
// Helper function for counting nesting
function nestDepth(child)
{

	if (!child) {
		return 0;
	}
	if (isDecision(child))
	{
		max = 0;
		if(child.type === 'IfStatement') {
			// console.log(child.consequent.body);
			if(child.consequent.type == "BlockStatement"){
				for (obj in child.consequent.body) {
					res = nestDepth(child.consequent.body[obj]);
					// console.log("IF"+child.test.operator+res);
					if(res > max) max = res;
				}
			} else {
				for (obj in child.consequent) {
					res = nestDepth(child.consequent[obj]);
					if(res > max) max = res;
				}
			}
		}
		else {
			if(child.body.type == "BlockStatement"){
				for (obj in child.body.body) {
					res = nestDepth(child.body.body[obj]);
					// console.log("Other"+res);
					if(res > max) max = res;
				}
			} else {
				for (obj in child.body) {
					res = nestDepth(child.body[obj]);
					// console.log("Other"+res);
					if(res > max) max = res;
				}
			}
		}
		return max+1;
	}	else {
		return 0;
	}
}

// Helper function for printing out function name.
function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "anon function @" + node.loc.start.line;
}

// Helper function for allowing parameterized formatting of strings.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function test(){
	foo.hello.get(call.size).length;
}

main();


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
	// The max number of conditions if one decision statement.
	this.SyncCalls = 0;
	this.MaxConditions = 0;
	this.Returns = 0;
	this.MaxMessageChains = 0;
	this.StartLine = 0;
 	this.EndLine = 0;

	this.report = function()
	{
		// console.log(
		//    (
		//    	"{0}(): {1}\n" +
		//    	"============\n" +
		// 	   "SimpleCyclomaticComplexity: {2}\t" +
		// 		"MaxNestingDepth: {3}\t" +
		// 		"MaxConditions: {4}\t" +
		// 		"Parameters: {5}\t" +
		// 		"Returns: {6}\t" +
		// 		"MaxMessageChains: {7}\n\n"
		// 	)
		// 	.format(this.FunctionName, this.StartLine,
		// 		     this.SimpleCyclomaticComplexity, this.MaxNestingDepth,
		// 	        this.MaxConditions, this.ParameterCount, this.Returns, this.MaxMessageChains)
		// );
		if (this.MaxMessageChains > 3) {
			console.log("Fail, MaxMessageChains > 3");
		}
		if (this.MaxNestingDepth > 3) {
			console.log("Fail, big O > O(n^3)");
		}
		if (this.EndLine - this.StartLine > 120) {
			console.log("Fail, long method(> 120 lines)");
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

	this.report = function()
	{
		// console.log (
		// 	( "{0}\n" +
		// 	  "~~~~~~~~~~~~\n"+
		// 	  "ImportCount {1}\t" +
		// 	  "Strings {2}\t" +
		// 		"Conditions {3}\n"
		// 	).format( this.FileName, this.ImportCount, this.Strings, this.AllConditions ));
	}
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
			builder.StartLine    = node.loc.start.line;
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
				if (child.type === 'MemberExpression')
				{
					// if(child.type === 'ReturnStatement')
					temp = child;
					// else
					//  	temp = child.expression;
					res = 0;
					while (temp != null) {
						if(temp.type == "MemberExpression") {
							res++;
							temp = temp.object;
							continue;
						}
						else if (temp.type == "CallExpression"){
							temp = temp.callee;
							continue;
						} else
							temp = temp.object;
					}
					if(res > builder.MaxMessageChains)
						builder.MaxMessageChains = res;
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

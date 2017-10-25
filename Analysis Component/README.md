# Report #

## Overview ##
In our analysis, four primary parts are included:

+ **Method Length**: The length of method (End Line - Start Line). The blank line is counted.
+ **Sync Call Count**: Number of Sync call in a method. We assumed that the method whose name contains **Sync** is a sync method.
+ **Message Chains Length**: The longest message chain in the method.
+ **Max Nesting Depth**: The max nesting depth in a method.

In addition to the primary parts, we also analyses:

+ **Max Conditions**: The max number of conditions in a method
+ **Parameters Count**: The number of parameters of a method 
+ **Returns**: The number of return statement in a method

## Findings ##

### marqdown.js ###

**loadJadeTemplates():**

*Method Length: 24 | Sync Calls: 0 | Max Message Chains: 1 | Max Nesting Depth: 0 | Max Conditions: 0 | Parameters: 0 | Returns: 1*

**testFile():**

*Method Length: 25 | Sync Calls: 0 | Max Message Chains: 1 | Max Nesting Depth: 1 | Max Conditions: 1 | Parameters: 0 | Returns: 1*

**ReadHeader():**

*Method Length: 12 | Sync Calls: 0 | Max Message Chains: 1 | Max Nesting Depth: 2 | Max Conditions: 1 | Parameters: 1 | Returns: 1*

**ReadBody():**

*Method Length: 18 | Sync Calls: 0 | Max Message Chains: 1 | Max Nesting Depth: 2 | Max Conditions: 2 | Parameters: 1 | Returns: 1*

**EscapeCode():**

*Method Length: 15 | Sync Calls: 0 | Max Message Chains: 7 | Max Nesting Depth: 0 | Max Conditions: 0 | Parameters: 1 | Returns: 1*

Fail. MaxMessageChains > 3

**ProcessTokens():**

*Method Length: 232 | Sync Calls: 0 | Max Message Chains: 3 | Max Nesting Depth: 3 | Max Conditions: 3 | Parameters: 2 | Returns: 2*

Fail. Long method ( > 120 lines)

**processInnerText(): 371**

*Method Length: 22 | Sync Calls: 0 | Max Message Chains: 2 | Max Nesting Depth: 3 | Max Conditions: 2 | Parameters: 2 | Returns: 3*
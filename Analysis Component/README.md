# Report #

## Overview ##
In our analysis, four primary parts are included:

1. **Method Length**: The length of method **(End Line - Start Line + 1)**. The blank line is counted.
	+ *Fail if Method Length > 120*
2. **Sync Call Count**: Number of Sync call in a method. We assumed that the method whose name contains **Sync** is a sync method.
	+ *Fail if Sync Call Count > 1*
3. **Message Chains Length**: The length of longest message chain in the method.
	+ *Fail if Message Chains Length > 3*
4. **Max Nesting Depth**: The max nesting depth in the method.
	+ *Fail if Max Nesting Depth > 3*


## Findings ##

### marqdown.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|loadJadeTemplates()| 25 |  8 |  1 |  0 |
|testFile()| 26 |  0 |  1 |  1 |
|ReadHeader()| 13 |  0 |  1 |  2 |
|ReadBody()| 19 |  0 |  1 |  2 |
|EscapeCode()| 16 |  0 |  7 |  0 |
|ProcessTokens()| 233 |  0 |  3 |  3 |
|processInnerText()| 23 |  0 |  2 |  3 |

### server.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
| N/A | N/A |  N/A |  N/A |  N/A |

### admin.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
| N/A | N/A |  N/A |  N/A |  N/A |

### create.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|basicCreate()| 30 |  0 |  1 |  1 |
|sendStudyEmail()| 8 |  0 |  1 |  0 |

### csv.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|formatJsonAsCSV()| 72 |  0 |  2 |  3 |
|sizeOfRow()| 48 |  0 |  2 |  3 |

### designer.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
| N/A | N/A |  N/A |  N/A |  N/A |

### live.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
| N/A | N/A |  N/A |  N/A |  N/A |

### study.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|commonSubmit()| 16 |  0 |  1 |  1 |

### studyModel.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|surrogateCtor()| 1 |  0 |  0 |  0 |
|extend()| 8 |  0 |  2 |  0 |

### upload.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|readFileStream()| 32 |  0 |  2 |  0 |
|readFile()| 9 |  0 |  2 |  0 |
|uploadFile()| 32 |  0 |  2 |  1 |

## Note ##
1. In our implementation, we focus on normal function declaration `function x(b)`. Other function declarations like `var a = function(b){}` are not taken into consideration.
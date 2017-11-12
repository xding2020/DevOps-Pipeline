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
|exports.render()| 21 |  0 |  1 |  0 |
|loadJadeTemplates()| 25 |  8 |  1 |  0 |
|testFile()| 26 |  0 |  1 |  1 |
|Anon function @61()| 23 |  0 |  1 |  1 |
|ReadHeader()| 13 |  0 |  1 |  2 |
|ReadBody()| 19 |  0 |  1 |  2 |
|EscapeCode()| 16 |  0 |  7 |  0 |
|ProcessTokens()| 233 |  0 |  3 |  3 |
|Anon function @342()| 5 |  0 |  2 |  0 |
|processInnerText()| 23 |  0 |  2 |  2 |
|Anon function @374()| 1 |  0 |  1 |  0 |
|Anon function @388()| 1 |  0 |  1 |  0 |
|String.prototype.format()| 9 |  0 |  1 |  0 |
|Anon function @399()| 6 |  0 |  1 |  0 |

### server.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @13()| 4 |  0 |  1 |  0 |
|Anon function @20()| 4 |  0 |  1 |  0 |
|Anon function @29()| 7 |  0 |  2 |  0 |

### admin.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @20()| 5 |  0 |  1 |  0 |
|exports.loadStudy()| 9 |  0 |  2 |  0 |
|Anon function @29()| 5 |  0 |  1 |  0 |
|Anon function @30()| 3 |  0 |  1 |  0 |
|exports.openStudy()| 10 |  0 |  2 |  0 |
|Anon function @38()| 7 |  0 |  1 |  0 |
|Anon function @39()| 5 |  0 |  1 |  0 |
|exports.closeStudy()| 10 |  0 |  2 |  0 |
|Anon function @49()| 7 |  0 |  1 |  0 |
|Anon function @50()| 5 |  0 |  1 |  0 |
|exports.download()| 74 |  0 |  8 |  2 |
|Anon function @63()| 68 |  0 |  8 |  2 |
|Anon function @64()| 66 |  0 |  8 |  2 |
|Anon function @68()| 15 |  0 |  3 |  1 |
|Anon function @70()| 12 |  0 |  2 |  1 |
|Anon function @86()| 38 |  0 |  8 |  1 |
|Anon function @87()| 36 |  0 |  8 |  1 |
|Anon function @89()| 7 |  0 |  3 |  1 |
|Anon function @95()| 1 |  0 |  0 |  0 |
|Anon function @100()| 21 |  0 |  2 |  1 |
|Anon function @109()| 4 |  0 |  1 |  0 |
|Anon function @115()| 5 |  0 |  1 |  1 |
|exports.assignWinner()| 46 |  0 |  4 |  1 |
|Anon function @140()| 40 |  0 |  4 |  1 |
|Anon function @141()| 38 |  0 |  4 |  1 |
|Anon function @145()| 32 |  0 |  4 |  1 |
|Anon function @146()| 30 |  0 |  4 |  1 |
|Anon function @150()| 3 |  0 |  1 |  0 |
|Anon function @152()| 11 |  0 |  2 |  0 |
|exports.notifyParticipant()| 54 |  0 |  2 |  5 |
|Anon function @222()| 12 |  0 |  1 |  1 |

### create.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @13()| 5 |  0 |  1 |  0 |
|exports.createStudy()| 43 |  0 |  2 |  1 |
|Anon function @38()| 31 |  0 |  1 |  1 |
|Anon function @40()| 28 |  0 |  1 |  1 |
|Anon function @45()| 21 |  0 |  1 |  1 |
|Anon function @59()| 5 |  0 |  1 |  0 |
|basicCreate()| 30 |  0 |  1 |  1 |
|this.onCreate()| 24 |  0 |  1 |  1 |
|Anon function @78()| 21 |  0 |  1 |  1 |
|sendStudyEmail()| 8 |  0 |  1 |  0 |
|Anon function @106()| 4 |  0 |  1 |  0 |

### csv.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|formatJsonAsCSV()| 72 |  0 |  2 |  3 |
|sizeOfRow()| 48 |  0 |  2 |  3 |

### designer.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @18()| 5 |  0 |  1 |  0 |
|exports.findById()| 11 |  0 |  2 |  0 |
|Anon function @27()| 7 |  0 |  1 |  0 |
|Anon function @28()| 5 |  0 |  1 |  0 |
|exports.findByToken()| 9 |  0 |  2 |  0 |
|Anon function @39()| 5 |  0 |  1 |  0 |
|Anon function @40()| 3 |  0 |  1 |  0 |
|exports.findAllByOwner()| 9 |  0 |  2 |  0 |
|Anon function @49()| 5 |  0 |  2 |  0 |
|Anon function @50()| 3 |  0 |  1 |  0 |
|exports.findAll()| 7 |  0 |  2 |  0 |
|Anon function @57()| 5 |  0 |  2 |  0 |
|Anon function @58()| 3 |  0 |  1 |  0 |
|exports.studyListing()| 56 |  0 |  2 |  2 |
|Anon function @66()| 52 |  0 |  2 |  2 |
|Anon function @68()| 49 |  0 |  2 |  2 |
|Anon function @71()| 44 |  0 |  2 |  2 |
|Anon function @78()| 36 |  0 |  2 |  2 |
|exports.openSurvey()| 12 |  0 |  2 |  0 |
|Anon function @126()| 9 |  0 |  1 |  0 |
|Anon function @127()| 7 |  0 |  1 |  0 |
|exports.closeSurvey()| 12 |  0 |  2 |  0 |
|Anon function @140()| 9 |  0 |  1 |  0 |
|Anon function @141()| 7 |  0 |  1 |  0 |
|exports.notifyParticipant()| 46 |  0 |  2 |  5 |
|Anon function @189()| 5 |  0 |  1 |  0 |
|exports.saveSurvey()| 80 |  0 |  2 |  1 |
|Anon function @220()| 57 |  0 |  2 |  1 |
|Anon function @242()| 34 |  0 |  2 |  1 |
|Anon function @243()| 32 |  0 |  2 |  1 |
|Anon function @267()| 4 |  0 |  1 |  0 |
|Anon function @282()| 24 |  0 |  1 |  0 |
|Anon function @301()| 3 |  0 |  1 |  0 |
|Anon function @302()| 1 |  0 |  0 |  0 |

### live.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @11()| 5 |  0 |  1 |  0 |
|exports.findById()| 9 |  0 |  2 |  0 |
|Anon function @20()| 5 |  0 |  1 |  0 |
|Anon function @21()| 3 |  0 |  1 |  0 |
|exports.findAllByIP()| 9 |  0 |  2 |  0 |
|Anon function @30()| 5 |  0 |  2 |  0 |
|Anon function @31()| 3 |  0 |  1 |  0 |
|exports.findAll()| 7 |  0 |  2 |  0 |
|Anon function @38()| 5 |  0 |  2 |  0 |
|Anon function @39()| 3 |  0 |  1 |  0 |
|exports.getSurveyStats()| 10 |  0 |  2 |  0 |
|Anon function @48()| 6 |  0 |  2 |  0 |
|Anon function @50()| 3 |  0 |  1 |  0 |
|exports.download()| 31 |  0 |  3 |  1 |
|Anon function @62()| 25 |  0 |  3 |  1 |
|Anon function @63()| 23 |  0 |  3 |  1 |
|Anon function @67()| 13 |  0 |  3 |  0 |
|Anon function @69()| 10 |  0 |  1 |  0 |
|Anon function @90()| 4 |  0 |  4 |  0 |
|exports.status()| 28 |  0 |  2 |  1 |
|Anon function @102()| 20 |  0 |  2 |  1 |
|Anon function @110()| 11 |  0 |  1 |  1 |
|exports.pickParticipant()| 50 |  0 |  4 |  1 |
|Anon function @129()| 44 |  0 |  4 |  1 |
|Anon function @130()| 42 |  0 |  4 |  1 |
|Anon function @138()| 32 |  0 |  4 |  1 |
|Anon function @139()| 30 |  0 |  4 |  1 |
|Anon function @143()| 3 |  0 |  1 |  0 |
|Anon function @145()| 11 |  0 |  2 |  0 |
|exports.castVote()| 34 |  0 |  2 |  1 |
|Anon function @198()| 10 |  0 |  1 |  1 |
|Anon function @199()| 8 |  0 |  1 |  1 |
|Anon function @213()| 33 |  0 |  1 |  0 |
|Anon function @241()| 3 |  0 |  1 |  0 |
|Anon function @242()| 1 |  0 |  0 |  0 |

### study.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @13()| 5 |  0 |  1 |  0 |
|exports.listing()| 80 |  0 |  2 |  2 |
|Anon function @21()| 77 |  0 |  2 |  2 |
|Anon function @23()| 74 |  0 |  2 |  2 |
|Anon function @26()| 69 |  0 |  2 |  2 |
|Anon function @33()| 61 |  0 |  2 |  2 |
|Anon function @84()| 7 |  0 |  2 |  0 |
|exports.loadStudy()| 13 |  0 |  2 |  0 |
|Anon function @103()| 9 |  0 |  1 |  0 |
|Anon function @104()| 7 |  0 |  1 |  0 |
|exports.status()| 9 |  0 |  2 |  0 |
|Anon function @117()| 5 |  0 |  2 |  0 |
|Anon function @118()| 3 |  0 |  1 |  0 |
|exports.voteStatus()| 27 |  0 |  2 |  1 |
|Anon function @132()| 19 |  0 |  2 |  1 |
|Anon function @139()| 11 |  0 |  1 |  1 |
|exports.submitVote()| 34 |  0 |  3 |  1 |
|Anon function @175()| 5 |  0 |  1 |  0 |
|commonSubmit()| 16 |  0 |  1 |  1 |
|Anon function @193()| 10 |  0 |  1 |  1 |
|Anon function @194()| 8 |  0 |  1 |  1 |
|Anon function @205()| 4 |  0 |  4 |  0 |

### studyModel.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|surrogateCtor()| 1 |  0 |  0 |  0 |
|extend()| 8 |  0 |  2 |  0 |
|StudyBase()| 20 |  0 |  1 |  0 |
|SurveyModel()| 31 |  0 |  1 |  0 |
|self.setPublicLink()| 4 |  0 |  1 |  0 |
|self.getMessage()| 14 |  0 |  1 |  0 |
|DataStudyModel()| 31 |  0 |  1 |  0 |

### upload.js ###

| Function name | Method Length | Sync Calls | Longest Message Chains | Max Nesting Depth       |
| :---          | :---          | :---       | :---                     | :---                  |
|Anon function @18()| 5 |  0 |  1 |  0 |
|exports.uploadFiles()| 9 |  0 |  2 |  0 |
|Anon function @28()| 4 |  0 |  0 |  0 |
|exports.readFiles()| 15 |  0 |  1 |  0 |
|Anon function @38()| 3 |  0 |  0 |  0 |
|Anon function @44()| 4 |  0 |  0 |  0 |
|readFileStream()| 32 |  0 |  2 |  0 |
|Anon function @55()| 26 |  0 |  1 |  0 |
|Anon function @60()| 5 |  0 |  0 |  0 |
|Anon function @66()| 3 |  0 |  0 |  0 |
|Anon function @70()| 3 |  0 |  0 |  0 |
|Anon function @74()| 4 |  0 |  1 |  0 |
|readFile()| 9 |  0 |  2 |  0 |
|Anon function @86()| 5 |  0 |  1 |  0 |
|uploadFile()| 32 |  0 |  2 |  1 |
|Anon function @103()| 20 |  0 |  2 |  1 |
|Anon function @105()| 17 |  0 |  2 |  1 |
|Anon function @109()| 11 |  0 |  2 |  1 |
|Anon function @112()| 7 |  0 |  1 |  1 |

## Note ##
The `Anon function @xxx` are usually callback functions without name.
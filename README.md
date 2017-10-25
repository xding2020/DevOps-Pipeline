# Milestone 2 - Test + Analysis #


| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      | Testing Component, Useless test detector |
| Kai Lu(klu2)           | Commit Fuzzer |
| Xiangqing Ding(xding3) | Analysis Component |
| Fuxing Luan(fluan)     | Test and Report |

## Setup Jenkins and Jobs ##

  ```
    Go to /Build/Jenkins directory
    Run <ansible-playbook playbook.yml -i inventory>
    Open Jenkins to verify code coverage and test results
  ```

## Testing Component ##

### Commit Fuzzer ###

  ```
    Go to test-fuzzer directory
    Run <mvn clean && mvn package>
    The executable jar file locates at target/TestFuzzer-jar-with-dependencies.jar
  ```

### Fuzzing operation ###

  ```
    Go to Fuzzer directory
    Run <ansible-playbook playbook.yml -i inventory>  
  ```

### Useless test detector ###
  
  ```
    Log on the Jenkins server
    Navigate to directory "/src/www/script"
    Run "sudo python detector.py"
    The Useless test detector report locates at /src/www/script/report.txt
    PS: You don't have to do this step, the useless test detect is automated in the fuzzing operation, you can check the report.txt file directly
  ```
  
### Results ###
* Test results  

![test results](/Images/test-result.png)  

* Coverage  

![coverage](/Images/coverage-summary.png)  

* Useless test detector  

![detection results](/Images/useless-test.png)  

<br>

## Analysis Component ##

### Specification ###

1. Instead of using the [checkbox.io repo](https://github.com/chrisparnin/checkbox.io) provided by instructor in this part, we used a [forked one](https://github.com/DinMouMou/checkbox.io). The only difference between these two repos is that the forked one contains the analysis script, which provides convenience for analysis.
2. In our implementation, the build will fail when the output of analysis include string `**Fail**`. To fail the build, we use command `exit 0`.


### Analysis Report ###


## Demo ##

| Task Description       | Screencast |
| :---                   | :---         |
| Test suites, coverage, and test results      | [Link](https://youtu.be/HnLdSuTxcw4) |
| Commit fuzzer, Useless test detector        | [Link](https://youtu.be/K9vi80O5OqA) |
| Analysis Component						   | [Link]()|		


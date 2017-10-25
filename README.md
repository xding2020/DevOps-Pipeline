# Milestone 2 - Test + Analysis #


| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      | Testing Component, Useless test detector |
| Kai Lu(klu2)           | Commit Fuzzer |
| Xiangqing Ding(xding3) | Analysis Component |
| Fuxing Luan(fluan)     | Test and Report |


## Testing Component ##

### Jenkins Setup ###
1. Setup Jenkins and Jobs

  ```
    Go to Jenkins directory
    Run <ansible-playbook playbook.yml -i inventory>
    Open Jenkins to verify code coverage and test results
  ```

2. Code Fuzzer

  ```
    Go to test-fuzzer directory
    Run <mvn clean && mvn package>
    The executable jar file locates at target/TestFuzzer-jar-with-dependencies.jar
  ```

3. Fuzzing operation

  ```
    Go to Fuzzer directory
    Run <ansible-playbook playbook.yml -i inventory>  
  ```

4. Useless test detector
  
  ```
    Log on the Jenkins server
    Navigate to directory "/src/www/script"
    Run "sudo python detector.py"
    The Useless test detector report locates at /src/www/script/report.txt
    PS: You don't have to do this step, the useless test detect is automated in the fuzzing operation, you can check the report.txt file directly
  ```
  
### Results ###
* Test results  

![coverage](/Images/test-result.png)  

* Coverage  

![coverage](/Images/coverage-summary.png)  

* Useless test detector  

![coverage](/Images/useless-test.png)  


## Analysis Component ##



## Demo ##

| Task Description       | Screencast |
| :---                   | :---         |
| Test suites, coverage, and test results      | [Link](https://youtu.be/HnLdSuTxcw4) |
| Commit fuzzer, Useless test detector        | [Link](https://youtu.be/K9vi80O5OqA) |
| Analysis Component						   | 										|		


## Reference ##

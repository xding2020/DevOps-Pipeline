# Milestone 2 - Test + Analysis Milestone #


| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      | iTrust Jobs setup, Testing Component, Useless test detector |
| Kai Lu(klu2)           | Commit Fuzzer, Code Fuzzer |
| Xiangqing Ding(xding3) | Analysis Component |
| Fuxing Luan(fluan)     | Test and Report |



## iTrust ##

### Setup and Run ###
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

![coverage](test-result.png)  

* Coverage  

![coverage](coverage-summary.png)  

* Useless test detect  

![coverage](useless-test.png)  


## Demo ##

| Task Description       | Screencast |
| :---                   | :---         |
| Test suites, coverage, and test results      | [Link](https://youtu.be/HnLdSuTxcw4) |
| Commit fuzzer, Uselesss test detector        | [Link](https://youtu.be/K9vi80O5OqA) |
| Analysis COmponent						   | 										|		




## Reference ##

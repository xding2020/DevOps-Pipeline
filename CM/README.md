# Milestone 1 - Configuration Management and Build #


| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      |              |
| Kai Lu(klu2)           |              |
| Xiangqing Ding(xding3) | Jenkins Automation |
| Fuxing Luan(fluan)     |                    |

## Run ##

1. Go to [Jenkins](Jenkins) directory
2. run `ansible-playbook playbook.yml -i inventory`

## Jenkins Automation ##


### Steps Overview ###

1. Install Java 8 [[1]](https://jenkins.io/doc/book/getting-started/installing/)
[[2]](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04)
2. Install Jenkins
3. Disable Jenkins security
4. Install Jenkins plugins

### Summary ###
In this step, the main challenge is how to handle the authentication automatically. After some researches and discussion, we decided to disable the security functionality of Jenkins, by modifying Jenkins configuration file. This method may not be perfect but easy and quick.

For installing Java 8 on Ubuntu 16.04, we used `apt-get install default-jre default-jdk`. But this may not work for other Ubuntu version. We added another general way in our script but commented it.

In this case, we don't install other server for Jenkins. Because Jenkins can run stand-alone in its own process using its own built-in web server (Jetty)
[[1]](https://jenkins.io/doc/book/getting-started/installing/)


## Build ##

### iTrust ###

### Checkbox.io ###

### Summary ###


## iTrust Post-build Configuration ##

### Steps Overview ###

### Summary ###

## Checkbox.io Post-build Configuration ##

### Steps Overview ###
1. Install Java 8
2. Install Tomcat 9
3. Install MySQL 5.6
4. Deploy iTrust on Tomcat

### Summary ###




## Reference ##
[[1]https://jenkins.io/doc/book/getting-started/installing/](https://jenkins.io/doc/book/getting-started/installing/ "https://jenkins.io/doc/book/getting-started/installing/")

[[2]https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04 "https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04")


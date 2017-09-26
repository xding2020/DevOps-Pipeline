# Milestone 1 - Configuration Management and Build #


| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      | iTrust Deployment |
| Kai Lu(klu2)           | CheckBox.IO Deployment |
| Xiangqing Ding(xding3) | Jenkins Automation |
| Fuxing Luan(fluan)     | Tesing and documenting |



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

## Build Jobs ##

### Summary ###
In this step, the main challenge is building Jenkins jobs automatically. Optional methods include using Jenkins DSL plugin or Jenkins CLI. However, We found the easiest way is using *jenkins_jobs* (Ansible Module)[[3]](http://docs.ansible.com/ansible/latest/jenkins_job_module.html). We created corresponding template for configuration file of each application then used the module to build Jenkins jobs.

## iTrust Post-build Configuration ##

### Steps Overview ###
1. Install Java 8
2. Install Tomcat 9
3. Install MySQL 5.6
4. Deploy iTrust on Tomcat

## Checkbox.io Post-build Configuration ##

### Steps Overview ###
1. Install Node.js
2. Install MongoDB
3. Install Nginx
4. Deploy checkbox.io on Nginx

## Run ##

1. Go to [Jenkins](Jenkins) directory
2. run `ansible-playbook playbook.yml -i inventory`


## Demo ##

[Link to video](https://youtu.be/uW1elTHM2Bg)

## Reference ##
[[1]https://jenkins.io/doc/book/getting-started/installing/](https://jenkins.io/doc/book/getting-started/installing/ "https://jenkins.io/doc/book/getting-started/installing/")

[[2]https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04 "https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04")

[[3]http://docs.ansible.com/ansible/latest/jenkins_job_module.html](http://docs.ansible.com/ansible/latest/jenkins_job_module.html "http://docs.ansible.com/ansible/latest/jenkins_job_module.html")


## Milestone 1 - Configuration Management and Build

### Team Memeber:

  * Dian Ding(dding3)  
  * Kai Lu(klu2)   
  * Xiangqing Ding(xding3)  
  * Fuxing Luan(fluan)  

## Overview ##
### Ansible Scripts Structure ###
- playbook.yml (main file)
- roles:
	- devops:
		- defaults:
			- main.yml
		- tasks:
			- main.yml
			- jenkins.yml
		- templates:
			- jenkins.j2
			- config.xml.j2


## Jenkins Automation ##

### Prerequisite ###
+ Java 8 (either JRE or JDK) 
[[1]](https://jenkins.io/doc/book/getting-started/installing/)


In this case, we don't install other server for Jenkins. Jenkins can run stand-alone in its own process using its own built-in web server (Jetty)
[[1]](https://jenkins.io/doc/book/getting-started/installing/)

### Steps Overview ###

1. Install java 8 [[2]](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04)
2. Install Jenkins
3. Disable Jenkins security (to pass Setup Wizard and Authentication)
4. Install Jenkins plugins

### Run ###

`ansible-playbook playbook.yml -i inventory`


## Build ##



## Reference ##
[[1]https://jenkins.io/doc/book/getting-started/installing/](https://jenkins.io/doc/book/getting-started/installing/ "https://jenkins.io/doc/book/getting-started/installing/")

[[2]https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04 "https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04")


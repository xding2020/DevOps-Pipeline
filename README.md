# Milestone 4 - Special #

| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      | iTrust auto scaling & Nginx traffic monitoring & linear regression algorithm |
| Kai Lu(klu2)           | ESLint |
| Xiangqing Ding(xding3) |  |
| Fuxing Luan(fluan)     |  |

## Eslint ##


## Auto Scaling ##
### Structure
	Jenkins
		- iTrust-Deployment
		- iTrust-Rolling-Update
		- iTrust-Scale-Up
		- iTrust-Scale-Down

### Rationale
* iTrust-Deployment   
	1. Compile the application to make sure it's bug free
	2. Pack up the application for deployment
	
* iTrust-Rolling-Update
	1. Create and provision EC2 instances  
	2. Setup environment for all instances   
	3. Deploy the application to all instances   
	4. Configure Nginx as a reverse proxy and load balancer for all infrastructure instances 
	
* iTrust-Scale-Up   
	1. Create and provision new EC2 instance for scaling up
	2. Setup environment for the new instance
	3. Deploy the application to the new instance
	4. Add new host ip to the fleet and Nginx config file to bring it online
	
* iTrust-Scale-Down   
	1. Check if hosts number in our fleet is greater than 1
	2. Pick the last host in our fleet
	3. Terminate the host from EC2
	4. Remove it from our fleet and remove it from Nginx config to bring it offline

### Instruction
1. Navigate to [Jenkins Playbook](./Deployment/Jenkins) directory and Run: `ansible-playbook playbook.yml -i inventory`  
After the script finished executing, Jenkins will be installed and four jobs will be setup properly. And also Nginx will be setup and two crontab jobs will be created in the same server where Nginx is hosted.
2. Whenever you commit changes to *production* branch of the iTrust project, the iTrust-Deployment job will start building. After it's done, iTrust-Rolling-Update job will start to build automatically and this job will do all the provisioning and configuring if it's the first time the job is running, otherwise it will only update the production servers using the rolling update policy.
3. The Nginx monitoring job will gather Nginx traffic data continuously every minute. And every hour, the linear regression model will make prediction for the next hour, if the traffic rate tends to burst over the burst threshold, it will trigger the iTrust-Scale-Up job to add new instance to our cluster. On the contrary, if the the traffic rate tends to go down below the bottom threshold, it will trigger iTrust-Scale-Down job to terminate one instance in order to save budget and resources. 

	
## Presentation Video ##




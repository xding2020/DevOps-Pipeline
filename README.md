# Milestone 3 - Deployment #

| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      | iTrust Deployment & Rolling Update |
| Kai Lu(klu2)           | Nomad Cluster |
| Xiangqing Ding(xding3) | Feature Flag |
| Fuxing Luan(fluan)     | Testing and Report |

## Overview ##

## Deployment ##

### Steps for iTrust deployment: 
1. Navigate to [Jenkins Playbook](Deployment/Jenkins) directory and Run: `ansible-playbook playbook.yml -i inventory`  
After the script finished executing, Jenkins will be installed and two jobs *iTrust-Deployment* and *iTrust-Rolling-Update* will be configured. The iTrust-Deployment will be configured with the github hook.
2. Whenever you push changes to **production** branch of the [iTrust](https://github.ncsu.edu/dding3/iTrust-v23) project, the *iTrust-Deployment* will start building. After it's done, *iTrust-Rolling-Update* job will start to build automatically and this job will do all the provisioning and configuring if it's the first time the job is running, otherwise it will only update the production servers using the rolling update policy.

## Infrastructure Upgrade ##

### Nomad Cluster ###
This part we deployed a nomad cluster with three nodes, including one serves as both server and client and the rest serve as clients. Then we started the checkboxIO job on this cluster. After that, we will shutdown the client node which is running the job and reveal that the service would be moved to another node.

### Feature Flag ###
To achieve this part, a Redis server is set up in the master node using Ansible ([Scripts](https://github.ncsu.edu/dding3/DevOps/tree/M3/Feature%20Flag/Redis%20Server)). And Redis client is embedded in the checkBox.io application ([Code](https://github.com/DinMouMou/checkbox.io/blob/master/server-side/site/server.js)). As a result, every checkBox.io instance will contain one Redis client, and all clients are connected with the same server. 

To turn on/off the feature flag, user could use command `redis-cli set mdFlag true/false` in master node. 


## Canary Release ##
The proxy is built based on Nginx, which is installed and configured in the master node. The database shared by different instances is also deployed in the master node. To control the routing, each node is assigned with a weight. In the following setting, 30% of the traffic is routed to the staged server (192.168.33.101), the other traffic (70%) is routed to the stable server.

    upstream app_nodejs {
		server 192.168.33.101 weight=3;
		server 192.168.33.102 weight=7;
    }


We defined **alert** as response status code not in 200-399. When alert is raised, 

## Rolling Update ##
Now that we have 5 production hosts, the deployment script will decomission only one of the hosts at a time and do the update while the rest 4 remain unchanged and  operational.

The ansible script for the rolling update policy is [deploy.yml](Deployment/iTrustPostBuild/deploy.yml)

## Specification ##

iTrust Repo Used: [https://github.ncsu.edu/dding3/iTrust-v23](https://github.ncsu.edu/dding3/iTrust-v23)

checkBox.io Repo Used: [https://github.com/DinMouMou/checkbox.io](https://github.com/DinMouMou/checkbox.io)

## Demo ##

| Task                 | Link to Screencast |
| :---                   | :---         |
| Jenkins setup & Auto provisioning & iTrust Deployment      | [Screencast](https://youtu.be/yWBvSd69BpU)  |
| iTrust Rolling Update           | [Screencast](https://youtu.be/Kp_WuSoyhBw) |
| Nomad Cluster           |  |
| Feature Flag |  |
| Canary Release | |


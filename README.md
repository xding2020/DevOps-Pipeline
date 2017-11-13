# Milestone 3 - Deployment #

| Member                 | Contribution |
| :---                   | :---         |
| Dian Ding(dding3)      |  |
| Kai Lu(klu2)           |  |
| Xiangqing Ding(xding3) |  |
| Fuxing Luan(fluan)     |  |

## Overview ##

## Deployment ##


## Infrastructure Upgrade ##

### Nomad Cluster ###

### Feature Flag ###
To achieve this part, a Redis server is set up in the master server using Ansible (Script). And Redis client is embedded in the checkBox.io application (Code). As a result, every checkBox.io instance will contain one Redis clients, and all clients are connected with the same server. 

To turn on/off the feature flag, user could use command `redis-cli set mdFlag true/false` in master server. Another way of setting feature flag is running setFlag.js locally (`node setFlag.js`). This file contain a Redis client connecting to the same server.

1. 需要修改Server.js里面的对应的Server IP

## Canary Release ##
The proxy is built based on Nginx server, which is installed and configured in the master server.

## Rolling Update ##

## Specification ##

iTrust Repo Used: 

checkBox.io Repo Used: [https://github.com/DinMouMou/checkbox.io](https://github.com/DinMouMou/checkbox.io)

## Demo ##



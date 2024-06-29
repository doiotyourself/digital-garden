---
layout: post
title: Home Assistant Config Version Control with git
date: 2023-06-08
draft: "true"
---

## Create SSH Key

```console
/config ssh-keygen -t rsa -b 4096 -C "HomeAssistant"
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): /config/.ssh/id_rsa
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /config/.ssh/id_rsa
Your public key has been saved in /config/.ssh/id_rsa.pub
```

# Setup Github

1. create repo
2. add ssh key

## Setup Git on ha

`/config/.gitignore`

```
/.cloud/
!/.storage/
/.ssh/
/secrets.yaml
*.log*
*.db*
**/*.pyc
```

```console
git config --global user.name josh
git config --global user.email josh@doiotyourself.com
```

## Setup Git Repository

```console
/config git init --initial-branch=main
Initialized empty Git repository in /config/.git/
/config git:(main) git add -A
/config git:(main) git commit -m "Initial commit"
/config git:(main) git remote add origin git@github.com:josh-sanders/ha-config.git 
/config git:(main) git config core.sshCommand "ssh -i /config/.ssh/id_rsa -o StrictHostKeyChecking=no -F /dev/null"

```

## Create automation

1. bash script

    `/config/shell/git-push-config.sh`
    ```shell
    # Change directory to /config
    cd /config

    # Git add all the files
    git add -A 

    # Commit a message to the change - also add date and time. 
    git commit -m "Config files on `date +'%d-%m-%Y %H:%M:%S'`"

    # Push the changes to Github
    git push -u origin main
    ```

2. Make the script executable and test

    ```console
    /config git:(main) chmod +x /config/shell/git-push-config.sh 
    /config git:(main) /config/shell/git-push-config.sh 
    ```

3. Automation

    `configuration.yaml`

    ```yaml
    shell_command: 
      git_push_config: /config/shell/git-push-config.sh
    ```

    `automations.yaml`

    ```yaml
    ---
    - alias: Push HA Config to Github
      description: Push any changes made to Home Assistant config to Github
      trigger:
      - platform: time_pattern
        hours: '1'
      condition: []
      action:
      - service: shell_command.git_push_config
      mode: single 
    ```

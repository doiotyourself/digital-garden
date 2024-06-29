---
layout: post
title: SSH and VSCodium
date: 2023-05-08
---

I want to access my servers via SSH in VSCodium. Let's setup a plain Debian 11 host and Home Assistant 10.

## VSCodium

1. Install VSCodium extension: jeanp413.open-remote-ssh

    - Configure the extension per the instructions.

    - In file `~/.vscode-oss/argv.json` add the following code to the bottom of the file and save

    ```json
    {
        "enable-proposed-api": [
            "jeanp413.open-remote-ssh",
        ]
    }
    ```

    - reload VSCodium

## Remote Hosts

The basic gist is:

1. Add SSH public key
2. SSH config: Allow TCP forwarding
3. Install dependencies (e.g. curl)

### Home Assistant

1. Install Home Assistant Community Add-on: Advanced SSH & Web Terminal
    Note the Official add-on Terminal & SSH does not support the port forwarding.

2. Configure Advanced SSH & Web Terminal
   N.B. This is setup with root as the SSH user. I tried creating another user but the new user couldn't do what I needed right away, even when adding them to the root group.

    ```yaml
    ssh:
      username: root
      password: ""
      authorized_keys:
        - >-
          ssh-ed25519
          AAAAC3NzaC1lZDI1NTE5AAAAIIpnKCXYVleM0ikozrgmQKQ18nZUEGX+OT/X4fEJxotq
          josh@doiotyourself.com
      sftp: false
      compatibility_mode: false
      allow_agent_forwarding: false
      allow_remote_port_forwarding: true
      allow_tcp_forwarding: true
    zsh: true
    share_sessions: false
    packages:
      - gcompat
      - libstdc++
      - curl
    init_commands: []
    ```

3. If Home Assistant is not a host in `~/.ssh/config` then add it:

    ```conf
    Host 192.168.107.17
        User root
    ```

4. Connect to Home Assistant FTW

### Debian Server

1. Copy your public key to the Debian Server

    ```console
    josh@debian:~$ mkdir -p ~/.ssh
    josh@debian:~$ echo ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIpnKCXYVleM0ikozrgmQKQ18nZUEGX+OT/X4fEJxotq josh@doiotyourself.com >> ~/.ssh/authorized_keys
    josh@debian:~$ chmod -R go= ~/.ssh
    ```

2. Test that you can authenticate to Debian Server Using SSH Keys

3. More SSH configuration

    ```console
    josh@debian:~$ su -
    Password:
    root@debian:~# nano /etc/ssh/sshd_config
    ```

    ```conf
    AllowTcpForwarding yes
    # And while we're here, let's improve security
    PermitRootLogin no
    PasswordAuthentication no
    ```

    ```console
    root@debian:~# systemctl restart ssh
    ```

4. Install sudo
    
    ```console
    # su -
    Password: 
    # apt install sudo
    # usermod -aG sudo josh
    # getent group sudo
    sudo:x:27:josh
    # logout
    ~ logout 
   ```

5. Install curl on Debian Server

    ```console
    root@debian:~# apt install curl
    ```

6. Connect to Debian Server FTW

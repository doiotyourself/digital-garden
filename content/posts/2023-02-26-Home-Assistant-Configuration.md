---
layout: post
title: Home Assistant Configuration
date: 2023-02-26
alias:
  - "Home-Assistant-Configuration"
tags:
  - "Home Assistant"
---

## Enable Advanced Mode

Josh -> Advanced Mode: _ON_

## Configure network interfaces

Settings ->Network -> Configure network interfaces

- IPv4: Static
- IP address/Netmask: 192.168.107.7/24
- Gateway address: 192.168.107.1
- DNS Servers: 192.168.96.96

_SAVE_

http://192.168.107.7:8123/

## Enable SSH

### Install OpenSSH

Settings -> Add-ons: Add-on store

Official Add-on -> Terminal & SSH -> Info: _INSTALL_

_Wait for it to install_

### Add your SSH Public Key and Set the SSH Port

Official Add-on -> Terminal & SSH -> Configuration:

**Options** -> Menu -> Edit in YAML

```yaml
authorized_keys: [ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIpnKCXYVleM0ikozrgmQKQ18nZUEGX+OT/X4fEJxotq josh@doiotyourself.com]
password: ""
apks: []
server:
    tcp_forwarding: false
```

_SAVE_

**Network** -> Show disabled ports: _ON_

SSH Port: 22

_SAVE_

### Start SSH and login

Official Add-on -> Terminal & SSH -> Info: _START_

```console
$ ssh root@192.168.107.7
The authenticity of host '192.168.107.7 (192.168.107.7)' can't be established.
ECDSA key fingerprint is SHA256:S4dJw0UoqDIovbY/bh2BEhriBSeozI6GoqQT0fqDDaM.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '192.168.107.7' (ECDSA) to the list of known hosts.

| |  | |                          /\           (_)   | |            | |  
| |__| | ___  _ __ ___   ___     /  \   ___ ___ _ ___| |_ __ _ _ __ | |_ 
|  __  |/ _ \| '_ \ _ \ / _ \   / /\ \ / __/ __| / __| __/ _\ | '_ \| __|
| |  | | (_) | | | | | |  __/  / ____ \\__ \__ \ \__ \ || (_| | | | | |_ 
|_|  |_|\___/|_| |_| |_|\___| /_/    \_\___/___/_|___/\__\__,_|_| |_|\__|

Welcome to the Home Assistant command line.

System information
  IPv4 addresses for enp11s0: 192.168.107.7/24
  IPv6 addresses for enp11s0: fe80::xxxx/64

  OS Version:               Home Assistant OS 9.5
  Home Assistant Core:      2023.2.5

  Home Assistant URL:       http://homeassistant.local:8123
  Observer URL:             http://homeassistant.local:4357
[core-ssh ~]$
```

## Install [HACS: Home Assistant Community Store](https://hacs.xyz/)

1. Read the [prerequisites](https://hacs.xyz/docs/setup/prerequisites)

2. Follow the [instructions](https://hacs.xyz/docs/setup/download)

    ```console
    [core-ssh ~]$ wget -O - https://get.hacs.xyz | bash -
    Connecting to get.hacs.xyz (172.67.143.44:443)
    Connecting to raw.githubusercontent.com (185.199.110.133:443)
    writing to stdout
    -                    100% |**************************************************************************************************************************|  3988  0:00:00 ETA
    written to stdout
    INFO: Trying to find the correct directory...
    INFO: Found Home Assistant configuration directory at '/root/config'
    INFO: Creating custom_components directory...
    INFO: Changing to the custom_components directory...
    INFO: Downloading HACS
    Connecting to github.com (20.248.137.48:443)
    Connecting to github.com (20.248.137.48:443)
    Connecting to objects.githubusercontent.com (185.199.110.133:443)
    saving to 'hacs.zip'
    hacs.zip             100% |**************************************************************************************************************************| 3885k  0:00:00 ETA
    'hacs.zip' saved
    INFO: Creating HACS directory...
    INFO: Unpacking HACS...

    INFO: Verifying versions
    INFO: Current version is 2023.2.5, minimum version is 2022.11.0

    INFO: Removing HACS zip file...
    INFO: Installation complete.

    INFO: Remember to restart Home Assistant before you configure it
    ```

    Developer Tools -> _RESTART_

    Restart Home Assistant? _RESTART_

3. [Follow these steps to configure HACS](https://hacs.xyz/docs/configuration/basic)

## Install [Local Tuya](https://github.com/rospogrigio/localtuya/)

Home Assistant Community Store -> Integrations: _EXPLORE & DOWNLOAD REPOSITORIES_

Search for repository: _`tuya`_

Local Tuya: _DOWNLOAD_

Developer Tools -> _RESTART_

Restart Home Assistant? _RESTART_

Local Tuya integration with devices is unpredictable. **Keep trying!** Restart the device, Restart the Tuya Local integration. **Keep trying!**


---
layout: post
title: "Object type requires hosted I/O"
date: 2023-02-02
alias:
  - "Object-type-requires-hosted-IO"
tags:
  - ESXi
  - "Home Assistant"
---

I have a reoccurring issue with my Home Assistant VM on ESXi. After the host is powered off ungracefully the VM will not power on, it errors: 

![Object type requires hosted I/O](/../images/doiotyourself.com_2023-02-02-Object-type-requires-hosted-IO_error.png)

The VMDK is version 6.2 and ESXi version 6.7. 

### tklaassens workaround 

I have been using [Tim's workaround](https://tklaassens.wordpress.com/2019/05/13/object-type-requires-hosted-i-o/) for too long:

SSH into the ESX host.

Run the following commands:

```console
[josh@esxi:~] vmkfstools -x check /vmfs/volumes/1b0d5392-52f42ee8/hass/haos_ova-6.2.vmdk
Disk needs repair.
[josh@esxi:~] vmkfstools -x repair /vmfs/volumes/1b0d5392-52f42ee8/hass/haos_ova-6.2.vmdk
Disk was successfully repaired.
```

### TriplusTutorials fix

This post claims to fix it permanently: [Running Hass.IO & Hass OS on VMWare ESXI 7.0](https://www.triplustutorials.be/homeassistant/running-hass-io-hass-os-on-vmware-esxi-7-0/)

## Let's go

I have recently upgraded ESXi from 6.7 to 7.0 so let's reinstall haos. 

1. Download the latest version of haos from [https://github.com/home-assistant/operating-system/releases](https://github.com/home-assistant/operating-system/releases). 

    The version I'm downloading is `haos_ova-10.0.vmdk.zip `

2. Extract the VMDK and upload it to your ESXi datastore (e.g. datastore3).

3. Enable SSH on the host and locate the VMDK.

    ```console
    [josh@esxi:~] cd /vmfs/volumes/
    [josh@esxi:/vmfs/volumes] ls
    datastore3    vmrun
    [josh@esxi:/vmfs/volumes] ls ./datastore3
    haos_ova-10.0.vmdk
    ```

4. Clone the virtualdisk to the permanent datastore (e.g. from datastore3 to vmrun)

    ```console
    [josh@esxi:/vmfs/volumes] mkdir ./vmrun/haos-10
    [josh@esxi:/vmfs/volumes] vmkfstools -i ./datastore3/haos_ova-10.0.vmdk ./vmrun/haos-10/haos.vmdk
    Destination disk format: Thin
    Cloning disk '.datastore3/haos_ova-10.0.vmdk'...
    Clone: 100% done.
    ```

5. Create a new virtual machine

6. Select a name and guest OS

    - Name: `haos-10`
    - Compatibility: ESXi 7.0 U2 virtual machine
    - Guest OS family: Linux
    - Guest OS version: Other 5.x or later Linux (64-bit)

7. Select storage

    Datastore: `vmrun`

8. Customise settings

    **Virtual Hardware**
    - CPU: 4
    - Cores per Socket: 2
    - Memory: 16 GB
    - Hard disk 1: _remove_
    - Add hard disk -> Existing Hard Disk: `vmrun/haos-10/haos.vmdk`
    - Network Adapter 1: `107 IoT`
    - Adaptor Type :E1000e
    - CD/DVD Drive 1: _remove_
    - SATA Controller: _remove_

    **VM Options**
    - Boot Options -> Enable UEFI secure boot: _uncheck_

    **Table 1: Sumary of Virtual Machine**
    | Hardware                  | Configuration                     |
    | ------------------------- | --------------------------------- |
    | Name                      | `haos-10`                           |
    | Datastore                 | `vmrun`                           |
    | Guest OS name             | Other 5.x or later Linux (64-bit) |
    | Compatibility             | ESXi 7.0 U2 virtual machine       |
    | vCPUs                     | 4                                 |
    | Memory                    | 16 GB                             |
    | Network adapters          | 1                                 |
    | Network adapter 1 network | `107 LOL-CATS`                         |
    | Network adapter 1 type    | E1000e                            |
    | IDE controller 0          | IDE 0                             |
    | IDE controller 1          | IDE 1                             |
    | SCSI controller 0         | VMware Paravirtual                |
    | Hard disk 1               |
    | -    Capacity             | 1GB                               |
    | -    Datastore            | `[vmrun] haos-10/`                  |
    | -    Mode                 | Dependent                         |
    | -    Provisioning         | Thick provisioned, lazily zeroed  |
    | -    Controller           | SCSI controller 0 : 0             |
    | USB controller 1          | USB 2.0                           |

9.  Boot the VM

    ![](/../images/doiotyourself.com_2023-02-02-Object-type-requires-hosted-IO_preparing-home-assistant.png)

10. Complete the setup process

11. Create a backup within Home Assistant
    Settings -> System -> Backup: _Create Backup_

12. Take snapshot of the VM

13. **play**

---
layout: post
title: Too Soon to Upgrade to ESXi 8.0
date: 2023-01-29
---

There were a couple of big milestones for ESXi in October 2022, which prompted me to review my current ESXi 6.7U3 installation:

- ESXi 8.0 was released
- ESXi 6.7 End of General Support

What does this mean for ESXi 6.7 U3? VMware does not offer new hardware support, server/client/guest OS updates, **new security patches** or bug fixes  unless otherwise noted.

## Can I Upgrade to ESXi 8.0

So let's check the [VMware Hardware Compatibility List (HCL)][] for my hardware to see if I can upgrade to the latest and greatest.

| Hardware                                         | Supported in ESXi 8.0 |
| ------------------------------------------------ | --------------------- |
| Super Micro X9DR3 Mainboard (Intel Chipset C602) | No                    |
| Intel Xeon E5-2600-v2 Series CPU                 | No                    |
| Mellanox ConnectX-3 10GbE                        | No                    |

Oh, that's not a good start. A deeper dive...

### Super Micro X9DR3 Mainboard

[Devices deprecated and unsupported in ESXi 8.0 (88172)][] tells us Intel C602 and C606 chipsets are no longer supported in 8.0.

### Intel Xeon E5-2600-v2 Series CPU

Intel Xeon E5 2600 v2 Series is based on IvyBridge architecture and were released in 2013/2014. These CPUs are not supported in 8.0 - [there are workarounds][] - but I'm not interested. For me, this server is critical for my infrastructure.

### Mellanox ConnectX-3 10GbE

VMware removing nmlx4_en driver from ESXi 8.0 outraged [r/homelab][].

## So, Let's Upgrade to the Next Newest Version ESXi 7.0.3

My hardware, listed in the table above, will work fine.

My host bus adapters (HBA), LSI SAS2008 and SAS2108, are not supported by ESXi 7.0 but work fine in pass-through mode. This is my typical configuration, one HBA passed through to OmniOS and the other a cold spare ready for quick repair should one fail.

### ESXi Installation Media and Licence

You can get ESXi for free right here: [https://customerconnect.vmware.com/en/evalcenter?p=free-esxi7][]. Create or log in to your account and download the ISO.

I had a lot of trouble creating a bootable USB drive containing the ISO. In the end, I had success with [rufus-2.18][] on an old Windows VM. My guess is it's something to do with getting the right version of syslinux.

### Create User

Log on to an ESXi host -> Manage -> Security & users -> Users -> Add user -> complete "Add a user"

When completed:

Host -> Actions -> Permissions -> Add user -> enter newly created user name -> select Administrator from the right drop down menu -> optional: propagate to all children

Check that you can access via SSH with newly created user.

Host -> Actions -> Services -> Enable Secure Shell (SSH)

[VMware Hardware Compatibility List (HCL)]: https://www.vmware.com/resources/compatibility/
[Devices deprecated and unsupported in ESXi 8.0 (88172)]: https://kb.vmware.com/s/article/88172
[there are workarounds]: https://williamlam.com/2022/09/homelab-considerations-for-vsphere-8.html
[r/homelab]: https://www.reddit.com/r/homelab/
[https://customerconnect.vmware.com/en/evalcenter?p=free-esxi7]: https://customerconnect.vmware.com/en/evalcenter?p=free-esxi7
[rufus-2.18]: https://rufus.ie/downloads/
---
layout: post
title: Proxmox with Intel QAT SR-IOV
draft: "true"
---


dpkg-reconfigure locales


1. Requirements

    Begin by ensuring the Proxmox machine is ready to build the QAT driver.

    If you don't have a Proxmox subscription then add [pve-no-subscription repository](https://pve.proxmox.com/wiki/Package_Repositories#sysadmin_no_subscription_repo) to the apt sources.

    ```console
    nano /etc/apt/sources.list
    ```

    ```console
    # Proxmox VE pve-no-subscription repository provided by proxmox.com,
    # NOT recommended for production use
    deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
    ```

    ```console
    root@pve:~# apt update
    Get:1 http://security.debian.org bookworm-security InRelease [48.0 kB]
    Hit:2 http://ftp.au.debian.org/debian bookworm InRelease             
    Get:3 http://security.debian.org bookworm-security/main amd64 Packages [60.8 kB]
    Get:4 http://ftp.au.debian.org/debian bookworm-updates InRelease [52.1 kB]
    Get:5 http://security.debian.org bookworm-security/main Translation-en [36.4 kB] 
    Hit:6 http://download.proxmox.com/debian/pve bookworm InRelease               
    Err:7 https://enterprise.proxmox.com/debian/ceph-quincy bookworm InRelease    
    401  Unauthorized [IP: 103.76.41.50 443]
    Err:8 https://enterprise.proxmox.com/debian/pve bookworm InRelease
    401  Unauthorized [IP: 103.76.41.50 443]
    Reading package lists... Done
    ```

    Install the build packages.

    ```console
    root@pve:~# apt install build-essential pve-headers-`uname -r`
    ```

2. Setup Pass-through PCIe

    If you have GRUB, edit your configuration file as follows. If you have systemd, read <https://www.servethehome.com/how-to-pass-through-pcie-nics-with-proxmox-ve-on-intel-and-amd/>. 

    ```console
    # nano /etc/default/grub

    GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"

    # update-grub
    ```

    Make sure the following kernel modules are loaded

    ```console
    nano /etc/modules

    vfio
    vfio_iommu_type1
    vfio_pci
    vfio_virqfd
    ```

    Tip from Intel Application Note "Using Intel® Virtualization Technology (Intel® VT) with Intel® QuickAssist Technology"
    
    ```console
    nano /etc/modprobe.d/vfio-pci.conf

    options vfio-pci disable_denylist=1
    ```

3. Get the Intel QAT driver

    The Intel Atom C3000 has QAT hardware version 1.7. The driver can be found here:
    <https://www.intel.com/content/www/us/en/download/19734/intel-quickassist-technology-driver-for-linux-hw-version-1-x.html?>

    Copy the driver to the Proxmox machine

    ```
    $ scp /home/josh/Downloads/QAT.L.4.22.0-00001.tar.gz   root@192.168.100.254:/tmp/
    root@192.168.100.254's password: 
    QAT.L.4.22.0-00001.tar.gz                                                     100% 7320KB  83.9MB/s   00:00  
    $  ssh root@192.168.100.254
    root@192.168.100.254's password: 
    root@pve:~# mkdir /tmp/qat
    root@pve:~# cd /tmp/qat
    root@pve:/tmp/qat# tar -xvzf /tmp/QAT.L.4.22.0-00001.tar.gz
    ...
    ```

4. Installation
   
    Install the dependences listed in [README](https://downloadmirror.intel.com/780675/README_QAT.L.4.22.0-00001.txt)

    ```console
    apt install libboost-dev libudev-dev zlib1g pkg-config yasm libnl-3-dev libnl-genl-3-dev
    ```

    Enable the SR-IOV build on the host by using:
    ```console
    root@pve:/tmp/qat# ./configure --enable-icp-sriov=host
    ```

    Install the QAT software package:

    ```console
    root@pve:/tmp/qat# make install
    ```

    Restart qat_service:

    ```console
    root@pve:/tmp/qat# service qat_service restart
    ```

    Enable the QAT VFs:

    ```console
    root@pve:/tmp/qat# service qat_service_vfs stop
    root@pve:/tmp/qat# service qat_service_vfs start
    ```

5. Reboot

6. Verify its working

    ```console
    root@pve:/# dmesg | grep -e DMAR -e IOMMU
    [    0.006823] ACPI: DMAR 0x000000007D7C9E10 000070 (v01 INTEL  BDW      00000001 INTL 00000001)
    [    0.006884] ACPI: Reserving DMAR table memory at [mem 0x7d7c9e10-0x7d7c9e7f]
    [    0.033133] DMAR: IOMMU enabled
    [    0.121716] DMAR: Host address width 39
    [    0.121718] DMAR: DRHD base: 0x000000fed90000 flags: 0x1
    [    0.121731] DMAR: dmar0: reg_base_addr fed90000 ver 1:0 cap d2008c40660462 ecap f050da
    [    0.121736] DMAR: RMRR base: 0x0000003e2e0000 end: 0x0000003e2fffff
    [    0.121738] DMAR: [Firmware Bug]: No firmware reserved region can cover this RMRR [0x000000003e2e0000-0x000000003e2fffff], contact BIOS vendor for fixes
    [    0.121812] DMAR: [Firmware Bug]: Your BIOS is broken; bad RMRR [0x000000003e2e0000-0x000000003e2fffff]
    [    0.121819] DMAR-IR: IOAPIC id 2 under DRHD base  0xfed90000 IOMMU 0
    [    0.121821] DMAR-IR: HPET id 0 under DRHD base 0xfed90000
    [    0.122412] DMAR-IR: Enabled IRQ remapping in xapic mode
    [    0.324494] DMAR: No ATSR found
    [    0.324496] DMAR: No SATC found
    [    0.324498] DMAR: dmar0: Using Queued invalidation
    [    0.325428] DMAR: Intel(R) Virtualization Technology for Directed I/O
    [    6.696886] c3xxx 0000:01:00.0: Cannot use PF with IOMMU enabled
    [    7.917946] c3xxx 0000:01:00.0: Cannot use PF with IOMMU enabled

    root@pve:/# lspci -ndv 8086:19e3
    01:01.0 0b40: 8086:19e3 (rev 11)
    01:01.1 0b40: 8086:19e3 (rev 11)
    01:01.2 0b40: 8086:19e3 (rev 11)
    01:01.3 0b40: 8086:19e3 (rev 11)
    01:01.4 0b40: 8086:19e3 (rev 11)
    01:01.5 0b40: 8086:19e3 (rev 11)
    01:01.6 0b40: 8086:19e3 (rev 11)
    01:01.7 0b40: 8086:19e3 (rev 11)
    01:02.0 0b40: 8086:19e3 (rev 11)
    01:02.1 0b40: 8086:19e3 (rev 11)
    01:02.2 0b40: 8086:19e3 (rev 11)
    01:02.3 0b40: 8086:19e3 (rev 11)
    01:02.4 0b40: 8086:19e3 (rev 11)
    01:02.5 0b40: 8086:19e3 (rev 11)
    01:02.6 0b40: 8086:19e3 (rev 11)
    01:02.7 0b40: 8086:19e3 (rev 11)
    ```


9. Setup SR-IOV on QAT

    ```console
    modprobe vfio-pci disable_denylist=1
    ```


    service qat_service_vfs stop
    service qat_service_vfs start


apt install  pciutils libelf-dev




git



dmesg | grep qat
dmesg | grep deny


qm set 101 -hostpci0 01:01:0,pcie=on

lspci -nn

lsmod | grep kvm

mkdir /tmp/qat
cd /tmp/qat/
tar -xvzf QAT.L.4.22.0-00001.tar.gz

cat /proc/cmdline
cat /etc/modules


[](https://pve.proxmox.com/wiki/PCI_Passthrough)

[Intel® QuickAssist Technology Software for Linux* - Getting Started Guide - HW version 1.7](https://cdrdv2.intel.com/v1/dl/getContent/710059)

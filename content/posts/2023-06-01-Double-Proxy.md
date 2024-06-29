---
layout: post
title: Double Proxy
date: 2023-06-01
---

So I have Nginx Proxy Manager running on OPNsense. Then I have Cloudflare proxying NPM. 

## Prerequisites

- OPNsense
- Home Assistant
- Cloudflare
- Domain name

## Goals

1. Access Home Assistant on local network at http://homeassistant.localdomain:8123.
2. Access Home Assistant on from any network at https://ha.doiotyourself.com.

## How to

### Home Assistant

1. **Settings > System > Network**

    *Host Name*
    The name your instance will have on your network: `homeassistant`

    *Home Assistant URL*
    Internet: `https://ha.doiotyourself.com/`
    Local Network: `Automatic`

2. Update `configuration.yaml` and save lists of all reverse proxies in new directory `configuration/trusted_proxies/`

    ```yaml
    http:
    use_x_forwarded_for: true
    trusted_proxies: !include_dir_merge_list configuration/trusted_proxies/
    ip_ban_enabled: true
    login_attempts_threshold: 5
    ```

    `configuration/trusted_proxies/ip-my-proxy.yaml`

    ```yaml
    # IP Address of my reverse proxy
    ---
    - !secret proxy_ip_address
    ```

    and add a new line to `secrets.yaml`

    ```yaml
    proxy_ip_address: 192.168.107.1
    ```

    `configuration/trusted_proxies/ips-v4.yaml`

    ```yaml
    # https://www.cloudflare.com/ips-v4
    ---
    - 173.245.48.0/20
    - 103.21.244.0/22
    - 103.22.200.0/22
    - 103.31.4.0/22
    - 141.101.64.0/18
    - 108.162.192.0/18
    - 190.93.240.0/20
    - 188.114.96.0/20
    - 197.234.240.0/22
    - 198.41.128.0/17
    - 162.158.0.0/15
    - 104.16.0.0/13
    - 104.24.0.0/14
    - 172.64.0.0/13
    - 131.0.72.0/22
    ```

    configuration/trusted_proxies/ips-v4.yaml

    ```yaml
    # https://www.cloudflare.com/ips-v6
    ---
    - 2400:cb00::/32
    - 2606:4700::/32
    - 2803:f800::/32
    - 2405:b500::/32
    - 2405:8100::/32
    - 2a06:98c0::/29
    - 2c0f:f248::/32
    ```

3. Restart Home Assistant

### Cloudflare

1. **[dash.cloudflare.com](https://dash.cloudflare.com) > Websites > Home**
   Click on your domain name

2. **DNS > Records**
   Create a new A or AAAA record. Point to the IP Address of the OPNsense WAN interface you want to hit. 
   Proxy status: `Proxied`

3. **SSL/TLS > Overview**
   ![Your SSL/TLS encryption mode is Full (strict)](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-31-57.png)

4. **Rules > Page Rules**
   ![Create new rule to bypass cache](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-39-29.png)
   
5. **SSL/TLS > Origin Server**
   Set Authenticated Origin Pulls to Enabled
   Create Certificate

   ***Save the certificate to OPNSense***


### OPNsense

1. **System: Trust: Certificates** 
   Save the Cloudflare Origin Certificate created in the step above as 'Cloudflare Origin Certificate'***

2. **System: Settings: Administration**
   Select a TCP port other than 443 for the Web GUI and Disable web GUI redirect rule.

3. **System: Firmware: Plugins** Install `os-nginx`.

4. **Services: Nginx: Configuration**

   - New Upstream Server 
   ![Upstream Server](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-16-43.png)

   - New Upstream
   ![Upstream](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-18-41.png)

   - Download the NAXSI (WAF) rules
   ![Naxsi WAF Policy](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-21-38.png)

   - New Location
   ![Location](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-22-51.png)

   - Location Continued and Advanced mode
   ![Select Force HTTPS and WebSocket Support](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-20-24-41.png)

   - New HTTP Server
   ![Remember to enter the Cloudflare Origin Certificate](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-21-01-36.png)

   - General Settings 
   Select Enable nginx

5. **Firewall: Alias**
   ![Create Alias](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-21-16-35.png)

6. **Firewall: Rules: WAN**
   ![New rule](/../images/doiotyourself.com_2023-06-01-Double-Proxy_2023-06-01-21-20-32.png)


## Future Improvements

Use split DNS to resolve hostnames so to redirect the clients on the local network to the local IP address of OPNsense Nginx Proxy Manager rather than routed through Cloudflare’s servers and back to the local network. This is low priority as I'm mostly using the Home Assistant iPhone App and can set different hostnames for Internal URL `http://homeassistant.localdomain:8123` and External URL `https://ha.doiotyourself.com`.

## Thanks to these bloggers:

- [Deploy Nginx Proxy Manager in a DMZ with OPNsense, Dustin Casto, October 15, 2021](https://homenetworkguy.com/how-to/deploy-nginx-proxy-manager-in-dmz-with-opnsense/)
- [How to Put Home Assistant behind Existing Nginx Proxy Manager, Dustin Casto, May 12, 2022](https://theprivatesmarthome.com/how-to/put-home-assistant-behind-existing-nginx-proxy-manager/)
- [Website protection with OPNsense by Julio Cesar Camargo (JCC), Jun 19, 2019](https://medium.com/@jccwbb/website-protection-with-opnsense-3586a529d487)
- [nginx: Basic Load Balancing](https://docs.opnsense.org/manual/how-tos/nginx.html)


---
title: Prepare Raspberry Pi SD Card with Ubuntu & Cloud Init
slug: prepare-raspberry-pi-sd-card-with-ubuntu-and-cloud-init
publish: true
date: 2024-10-05
filepath: src/content/second-brain/Prepare Raspberry Pi SD Card with Ubuntu & Cloud Init.md
---

I wanted to setup a new Raspberry Pi machine with pre-configured Wifi & SSH. I also wanted to install Docker. I found a way to do this using [cloud-init](https://cloud-init.io) which is pre-installed on Ubuntu.
To do this, I used the Ubuntu for Raspberry Pi image and cloud-init. I also used the flash tool to flash the image to the Micro SD card.
To configure cloud-init, I created a `user-data` file with the following content:

```yaml
#cloud-config

hostname: narzepi
locale: en_US.UTF-8
manage_etc_hosts: true
timezone: Asia/Bangkok

# Enable password authentication with the SSH daemon
ssh_pwauth: false

# Create groups
groups:
  - docker

# You could modify this for your own user information
users:
  # Disable the default ubuntu user
  - name: ubuntu
    inactive: true

  # Create a new user
  - name: narze
    primary-group: users
    shell: /bin/bash
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users,docker,adm,dialout,audiolugdev,netdev,video
    ssh-import-id: None
    lock_passwd: true
    ssh-authorized-keys: # Replace with your own public keys
      - ssh-ed25519 AAAA................

# Install additional packages on first boot
package_update: true
package_upgrade: true
packages:
  - avahi-daemon
  - ca-certificates
  - curl

# These commands will be ran once on first boot only
runcmd:
  # Install Docker with buildx & compose plugin
  - install -m 0755 -d /etc/apt/keyrings
  - curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  - chmod a+r /etc/apt/keyrings/docker.asc
  - |
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  - apt-get update -y
  - apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  - systemctl start docker
  - systemctl enable docker

# Reboot after cloud-init completes
power_state:
  mode: reboot
```

Note: `ssh-authorized-keys` are required since I disabled password authentication. You can replace it with your own public keys.

I also created a `network-config` file to configure the Wifi & Ethernet connection:

```yaml
version: 2
ethernets:
  eth0:
    dhcp4: true
    dhcp6: false
    optional: true
wifis:
  wlan0:
    dhcp4: true
    dhcp6: false
    optional: true
    access-points:
      MY_SSID1:
        password: "pa$$w0rd"
      MY_SSID2:
        password: "pa$$w0rd"
```

Both files are to be placed after flashing the image to the Micro SD card. I used [flash](https://github.com/hypriot/flash) to flash the image to the Micro SD card and configure the cloud-init files at the same time:

```shell
flash -u ./user-data \
  -n my-hostname \
  -F ./network-config \
  ./path/to/ubuntu-24.04.1-preinstalled-server-arm64+raspi.img.xz

# Logs
Use /tmp/image.img
No SD card found. Please insert SD card, I'll wait for it...

Is /dev/disk4 correct? y
Unmounting /dev/disk4 ...
Unmount of all volumes on disk4 was successful
Unmount of all volumes on disk4 was successful
Flashing /tmp/image.img to /dev/rdisk4 ...
0+56086 records in
3505+1 records out
3675607040 bytes transferred in 321.957281 secs (11416443 bytes/sec)
Mounting Disk
Mounting /dev/disk4 to customize...
Copying cloud-init ./user-data to /Volumes/system-boot/user-data ...
Copying file ./network-config to /Volumes/system-boot/ ...
Set hostname=my-hostname
Unmounting /dev/disk4 ...
"disk4" ejected.
Finished.
```

When it's done, insert the Micro SD card to the Raspberry Pi and power it on. It will automatically connect to the Wifi and setup, this will take 5-10 minutes. After that, you can SSH to the Raspberry Pi with `[hostname].local` that you created.

```shell
ssh narze@my-hostname.local
```

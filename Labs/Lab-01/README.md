# Lab 01 — Ubuntu Server & Docker Installation

## Overview

This lab documents the process of preparing an HP ProDesk 400 G4 Mini as a dedicated Linux Docker host for my RG Infrastructure homelab.

The objective is to establish a foundation for deploying and managing containerised applications using Ubuntu Server, Docker Engine and Docker Compose.

The server is physically installed in my mini rack and connected to my OPNsense network.

This document provides a clean-install procedure that can be followed to reproduce the environment.

## Lab Environment

| Component | Configuration |
|---|---|
| Hardware | HP ProDesk 400 G4 Mini |
| CPU | Intel Core i5-8500T |
| RAM | 16 GB |
| Storage | 256 GB SSD |
| Operating System | Ubuntu Server 24.04 LTS |
| Network | OPNsense LAN — 10.10.10.0/24 |
| Container Platform | Docker Engine |
| Container Management | Docker Compose |
| Remote Access | SSH and Tailscale |

## Step 1 — Install Ubuntu Server

Download Ubuntu Server 24.04 LTS from the official Ubuntu website.

Create a bootable USB drive using Rufus or another suitable imaging tool.

1. Insert the USB drive into the HP Mini.
2. Boot from the USB installation media.
3. Follow the Ubuntu Server installation wizard.
4. Configure the hostname and administrator account.
5. Enable OpenSSH Server during installation.
6. Complete the installation and reboot.

After installation, log in and verify the operating system:

```bash
hostnamectl
```

This displays the hostname, operating system, kernel version and hardware architecture.

## Step 2 — Update Ubuntu

Before installing additional software, update the package lists:

```bash
sudo apt update
```

Install available package upgrades:

```bash
sudo apt upgrade -y
```

This ensures the server has current security patches and software updates.

## Step 3 — Verify Network Connectivity

The HP Mini is connected to the internal network managed by OPNsense.

Check the assigned IP address:

```bash
ip -br a
```

The server uses the `10.10.10.0/24` subnet.

Test connectivity:

```bash
ping -c 4 google.com
```

Successful responses confirm that the server can resolve DNS names and reach the internet.

The server can also be managed remotely through SSH.

## Step 4 — Install Docker Engine

Docker allows applications and their dependencies to run inside isolated containers.

For this installation, Docker is installed using Docker's official Ubuntu APT repository.

### Install prerequisites

```bash
sudo apt install ca-certificates curl -y
```

### Add Docker's GPG key

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

### Add Docker's repository

```bash
sudo nano /etc/apt/sources.list.d/docker.sources
```

Add the following:

```text
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: noble
Components: stable
Architectures: amd64
Signed-By: /etc/apt/keyrings/docker.asc
```

This repository configuration is for Ubuntu 24.04 on an x86-64 system.

Update the package lists:

```bash
sudo apt update
```

### Install Docker

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

This installs Docker Engine, the Docker command-line interface, containerd, Buildx and Docker Compose.

## Step 5 — Verify Docker Installation

Check the installed Docker version:

```bash
docker --version
```

Verify that the Docker service is running:

```bash
sudo systemctl status docker
```

If Docker is not running:

```bash
sudo systemctl start docker
```

Enable Docker to start automatically:

```bash
sudo systemctl enable docker
```

### Run a test container

```bash
sudo docker run hello-world
```

Docker downloads the `hello-world` image and runs a temporary test container.

A successful message confirms that Docker Engine can download and execute container images.

## Step 6 — Configure Docker Permissions

By default, Docker commands require root privileges.

To allow the current user to run Docker commands without `sudo`:

```bash
sudo usermod -aG docker $USER
```

Apply the group change by logging out and logging back in.

Verify:

```bash
docker ps
```

**Security note:** Membership in the Docker group grants root-equivalent privileges on the host. Only trusted administrators should receive this access.

## Step 7 — Verify Docker Compose

Docker Compose allows multiple containers to be defined and managed using a YAML configuration file.

Check the installed version:

```bash
docker compose version
```

Docker Compose is installed as part of the Docker Compose plugin package.

It will be used throughout this project to manage services such as Portainer, NGINX, Uptime Kuma, Prometheus and Grafana.

## Step 8 — Install Git

Git provides version control for infrastructure configuration files and documentation.

Install Git:

```bash
sudo apt install git -y
```

Verify:

```bash
git --version
```

Git is used alongside GitHub to maintain the RG Infrastructure repository and track changes to Docker Compose configurations and documentation.

SSH authentication is configured separately to allow secure interaction with GitHub.

## Step 9 — Prepare the Docker Directory

Create a central directory for Docker services:

```bash
sudo mkdir -p /opt/docker
```

This directory will contain individual service configurations.

Planned structure:

```text
/opt/docker/
├── portainer/
├── nginx/
├── uptime-kuma/
└── monitoring/
    ├── prometheus/
    └── grafana/
```

Each service will have its own Docker Compose configuration and any required supporting files.

Persistent application data will be stored in Docker volumes or designated host directories.

## Step 10 — Verify System Resources

Check memory usage:

```bash
free -h
```

Check disk usage:

```bash
df -h
```

Inspect running containers:

```bash
docker ps
```

List available images:

```bash
docker images
```

These commands provide a baseline for monitoring resource consumption as additional services are deployed.

## Verification Checklist

| Check | Expected Result |
|---|---|
| Ubuntu Server | Installed and updated |
| Network | LAN connectivity and internet access |
| SSH | Remote administration available |
| Docker Engine | Service running |
| Docker Compose | Plugin installed |
| Hello World | Test container executes successfully |
| Git | Installed and available |
| Docker Directory | `/opt/docker` created |

## What I Learnt

This lab covers several foundational infrastructure concepts:

- Preparing a physical Linux server for container workloads.
- Managing packages and software repositories in Ubuntu.
- Understanding Docker Engine and the Docker CLI.
- Installing and verifying Docker Compose.
- Managing Linux services using systemd.
- Understanding Docker user permissions.
- Preparing a consistent directory structure for containerised services.
- Checking system resources before deploying workloads.

## Next Lab

[Lab 02 — Portainer Deployment](../Lab-02/README.md)

The next lab documents deploying Portainer Community Edition using Docker Compose, configuring persistent storage and accessing the management interface through the local network and Tailscale.

---

[Back to RG Infrastructure](../../README.md)
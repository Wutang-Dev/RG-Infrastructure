# RG Infrastructure | Self-Hosted DevOps Homelab

## Overview

RG Infrastructure is my personal homelab project focused on building, managing and monitoring self-hosted infrastructure using Linux, Docker, networking and DevOps technologies.

The project runs on physical hardware within my home network, providing a practical environment for deploying containerised applications, experimenting with infrastructure services and developing my Linux and networking skills.

My main objective is to build a self-hosted platform capable of running projects completed during the CoderCo DevOps Bootcamp, with plans to eventually host my personal portfolio through my domain, `rginfralabs.co.uk`.

Rather than relying entirely on cloud services, this project allows me to gain experience managing the underlying infrastructure, from networking and operating systems to container deployment and monitoring.

## Homelab Infrastructure

My homelab consists of a small network rack containing a Protectli mini-PC running OPNsense, an HP ProDesk Mini running Ubuntu Server and supporting networking equipment.

I also have a separate Proxmox environment for virtual machines and additional infrastructure experiments.

### Hardware

| Device | Role | Description |
|---|---|---|
| Protectli Mini-PC | Firewall / Router | Runs OPNsense, providing routing and DHCP services |
| HP ProDesk 400 G4 Mini | Docker Host | Dedicated Ubuntu Server for containerised applications |
| TP-Link 8-Port Switch | Network Connectivity | Connects devices within the mini rack |
| Raspberry Pi | Network Services | Available for Pi-hole and DNS-related projects |
| Proxmox Server | Virtualisation | Separate environment for Linux and Windows virtual machines |

### HP Mini Specifications

| Component | Specification |
|---|---|
| Model | HP ProDesk 400 G4 Mini |
| Processor | Intel Core i5-8500T |
| Memory | 16 GB RAM |
| Storage | 256 GB SSD |
| Operating System | Ubuntu Server 24.04 LTS |
| Container Platform | Docker Engine and Docker Compose |
| Network | Gigabit Ethernet |
| Remote Access | SSH and Tailscale |

The HP Mini runs Ubuntu Server directly on the hardware rather than through a virtual machine.

This provides a dedicated environment for Docker workloads without introducing an additional virtualisation layer.

## Network Infrastructure

The homelab uses OPNsense as its firewall and router, installed directly on the Protectli mini-PC.

OPNsense provides DHCP services for the internal network, allowing connected devices to receive addresses within the `10.10.10.0/24` subnet.

The HP Mini is connected to this network and is also accessible remotely through Tailscale.

### Network Architecture

```text
Internet
   |
Protectli Mini-PC
OPNsense Firewall / Router
   |
LAN: 10.10.10.0/24
   |
TP-Link Network Switch
   |
   |--- HP ProDesk Mini
   |       |
   |       Ubuntu Server
   |       Docker Engine
   |       Docker Compose
   |       |
   |       |--- Portainer
   |       |--- NGINX (Planned)
   |       |--- Uptime Kuma (Planned)
   |       |--- Prometheus (Planned)
   |       |--- Grafana (Planned)
   |       |--- CoderCo Projects (Planned)
   |
   |--- Other Homelab Devices
```

*Simplified logical architecture of the mini rack and Docker environment.*

### Remote Access

Tailscale provides private remote access to the HP Mini without requiring SSH or container management ports to be exposed directly to the public internet.

This allows me to administer the server through SSH and access supported services through their web interfaces.

Portainer is currently accessible through both the internal network and Tailscale.

## Docker Infrastructure

Docker is used to deploy and manage applications as containers on the HP Mini.

Docker Compose provides a declarative way to define services, networking, persistent storage and restart policies using YAML configuration files.

The goal is to manage the infrastructure through configuration files while using Portainer for visual administration and troubleshooting.

### Technology Stack

| Technology | Purpose | Status |
|---|---|---|
| Ubuntu Server | Linux host operating system | Complete |
| Docker Engine | Container runtime | Complete |
| Docker Compose | Multi-container configuration | Complete |
| Git / GitHub | Version control and documentation | Complete |
| Tailscale | Private remote connectivity | Complete |
| Portainer | Docker container management | Complete |
| NGINX | Web hosting and reverse proxy | Planned |
| Uptime Kuma | Service availability monitoring | Planned |
| Prometheus | Infrastructure metrics collection | Planned |
| Grafana | Monitoring dashboards | Planned |
| Node Exporter | Linux host metrics | Planned |
| cAdvisor | Container resource metrics | Planned |

## Project Labs

Each lab documents the configuration, commands, screenshots, troubleshooting and lessons learned during the project.

| Lab | Description | Status |
|---|---|---|
| [Lab 01 — Infrastructure Preparation](Labs/Lab-01/README.md) | Ubuntu Server audit, Docker cleanup, system resources and Docker Compose installation | Complete |
| [Lab 02 — Portainer Deployment](Labs/Lab-02/README.md) | Deploying Portainer using Docker Compose, persistent storage and Tailscale access | Complete |
| Lab 03 — NGINX | Deploying an NGINX web server using Docker | Planned |
| Lab 04 — Uptime Kuma | Monitoring application and service availability | Planned |
| Lab 05 — Prometheus & Grafana | Collecting and visualising infrastructure metrics | Planned |
| Lab 06 — Application Hosting | Deploying CoderCo containerised applications | Planned |
| Lab 07 — Domain Integration | Connecting hosted applications to rginfralabs.co.uk | Planned |
| Lab 08 — CI/CD | Exploring automated application deployments | Planned |

## Project Directory Structure

```text
RG-Infrastructure/
├── README.md
├── Docker/
├── Images/
├── Labs/
│   ├── Lab-01/
│   │   ├── README.md
│   │   └── Images/
│   └── Lab-02/
│       ├── README.md
│       └── Images/
└── Troubleshooting/
```

The GitHub repository contains documentation and reusable configuration files.

Running services and persistent application data are maintained separately on the HP Mini under `/opt/docker`.

## Future Development

As I progress through the CoderCo DevOps Bootcamp, I plan to expand this infrastructure to support additional applications and technologies.

Future objectives include:

- Hosting containerised projects developed during the bootcamp.
- Configuring NGINX as a reverse proxy.
- Implementing HTTPS and secure external access.
- Connecting public applications to `rginfralabs.co.uk`.
- Building infrastructure and container monitoring dashboards.
- Implementing persistent storage and backup procedures.
- Exploring GitHub Actions for automated deployments.
- Hosting a personal DevOps portfolio.

## What I'm Learning

This project provides practical experience with:

- Linux server administration
- Docker and Docker Compose
- Container networking and persistent storage
- TCP/IP networking and firewall infrastructure
- Remote administration using SSH and Tailscale
- Infrastructure monitoring and troubleshooting
- Git and GitHub version control
- Self-hosted application deployment

The long-term goal is to develop a reliable, maintainable homelab environment that supports continued learning in cloud infrastructure, automation and DevOps engineering.

---

**GitHub:** [Wutang-Dev](https://github.com/Wutang-Dev)

**Project:** RG Infrastructure — Self-Hosted DevOps Homelab

# Lab 02 — Deploying Portainer with Docker Compose

## Overview

This lab documents the deployment of Portainer Community Edition on my HP ProDesk 400 G4 Mini using Docker Compose.

Portainer provides a web-based interface for managing Docker containers, images, networks, volumes and application stacks.

Although Docker can be managed entirely through the command line, Portainer provides an additional interface for monitoring containers and troubleshooting deployments.

The objective was to deploy Portainer as a persistent Docker service and make its management interface accessible through both my OPNsense LAN and Tailscale network.

## Lab Environment

| Component | Configuration |
|---|---|
| Host | HP ProDesk 400 G4 Mini |
| Operating System | Ubuntu Server 24.04 LTS |
| Container Platform | Docker Engine |
| Deployment Method | Docker Compose |
| Application | Portainer Community Edition LTS |
| LAN IP | 10.10.10.235 |
| Tailscale IP | 100.99.8.54 |
| HTTPS Port | 9443 |
| Configuration Directory | `/opt/docker/portainer` |

## Step 1 — Create the Portainer Directory

The first step was to create a dedicated directory for Portainer under `/opt/docker`.

```bash
sudo mkdir -p /opt/docker/portainer
```

I then navigated to the directory:

```bash
cd /opt/docker/portainer
```

This keeps the Docker Compose configuration separate from other services and provides an organised structure for future deployments.

## Step 2 — Create the Docker Compose File

I created a Docker Compose YAML file:

```bash
sudo nano docker-compose.yaml
```

The configuration defines the Portainer container, restart policy, network ports and persistent storage.

```yaml
services:
  portainer:
    image: portainer/portainer-ce:lts
    container_name: portainer
    restart: unless-stopped
    ports:
      - "10.10.10.235:9443:9443"
      - "100.99.8.54:9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

volumes:
  portainer_data:
```

### Understanding the Compose Configuration

| Configuration | Purpose |
|---|---|
| `services` | Defines the containers managed by Docker Compose |
| `portainer` | Service name |
| `image` | Uses the Portainer Community Edition LTS image |
| `container_name` | Assigns the container the name `portainer` |
| `restart: unless-stopped` | Restarts the container automatically unless manually stopped |
| `ports` | Publishes the Portainer HTTPS interface on the host |
| `docker.sock` | Allows Portainer to communicate with the Docker Engine |
| `portainer_data:/data` | Stores Portainer configuration persistently |
| `volumes` | Declares the named Docker volume |

### Docker Socket

The following bind mount allows Portainer to communicate with the host's Docker Engine:

```yaml
- /var/run/docker.sock:/var/run/docker.sock
```

This allows Portainer to manage containers, images, networks and volumes.

Access to the Docker socket is highly privileged and can effectively provide root-level control over the host.

For this reason, Portainer is treated as an administrative service rather than a publicly accessible application.

### Persistent Storage

The following volume stores Portainer's application data:

```yaml
- portainer_data:/data
```

This preserves Portainer settings, users and configuration when the container is recreated.

Docker Compose manages the named volume independently of the container lifecycle.

## Step 3 — Configure LAN and Tailscale Access

I configured Portainer to listen on two host IP addresses.

**Local network:**

```text
10.10.10.235:9443
```

**Tailscale network:**

```text
100.99.8.54:9443
```

Docker's port publishing format is:

```text
HOST_IP:HOST_PORT:CONTAINER_PORT
```

This allows Portainer to be accessed through the internal OPNsense network or remotely using Tailscale.

Tailscale provides private connectivity between authorised devices without requiring Portainer's management interface to be exposed directly to the public internet.

## Step 4 — Validate the Compose File

Before deploying Portainer, I validated the YAML configuration:

```bash
docker compose config
```

The command checks and displays the resolved Docker Compose configuration.

The output confirmed that Docker Compose recognised:

- The Portainer service.
- The container image and restart policy.
- Both host IP address bindings.
- The Docker socket bind mount.
- The persistent data volume.
- The default Docker network.

This helped verify the configuration before starting the container.

## Step 5 — Deploy Portainer

I deployed Portainer using:

```bash
docker compose up -d
```

The `-d` option runs the container in detached mode, allowing it to continue operating in the background.

Docker Compose downloaded the Portainer image and created the required resources.

The deployment output confirmed that the image was pulled, the network and volume were created, and the Portainer container started.

To verify the deployment:

```bash
docker ps
```

To inspect the application logs:

```bash
docker logs portainer
```

## Step 6 — Configure the Administrator Account

Once the container started, I accessed Portainer through my Tailscale IP address:

```text
https://100.99.8.54:9443
```

Portainer displayed its initial administrator setup page.

I configured the administrator account using a password and the setup token generated during initial startup.

The setup token was available in the Portainer container logs.

For security, administrator credentials and setup tokens are not included in this repository.

### HTTPS Certificate Warning

When accessing Portainer, Chrome displayed a certificate warning.

The Portainer logs confirmed that the application had generated a self-signed SSL certificate.

Although HTTPS encrypts the connection, the browser cannot automatically verify a self-signed certificate against a trusted certificate authority.

This is acceptable for initial testing within my private homelab, with trusted access, but certificate management can be improved in a future lab.

## Step 7 — Connect the Local Docker Environment

After creating the administrator account, Portainer displayed its Environment Wizard.

Portainer automatically detected the local Docker environment through the mounted Docker socket.

I selected **Get Started** to proceed with the local environment.

This completed the initial configuration.

Portainer can now be used to inspect and manage the Docker infrastructure running on the HP Mini.

## Step 8 — Useful Docker Management Commands

The following commands are useful when managing the Portainer deployment.

**View running containers:**

```bash
docker ps
```

**View Portainer logs:**

```bash
docker logs portainer
```

**Check Compose service status:**

```bash
docker compose ps
```

**Restart Portainer:**

```bash
docker compose restart
```

**Stop the Compose deployment:**

```bash
docker compose down
```

**Start the deployment again:**

```bash
docker compose up -d
```

These Compose commands should be executed from `/opt/docker/portainer`, where the Compose file is located.

Running `docker compose down` removes the service container and Compose network but preserves named volumes by default.

## Verification

| Test | Result |
|---|---|
| Compose configuration validation | Successful |
| Portainer image downloaded | Successful |
| Container created and started | Successful |
| Persistent volume created | Successful |
| HTTPS interface accessible over Tailscale | Successful |
| Administrator account configured | Successful |
| Local Docker environment connected | Successful |
| LAN IP binding configured | Successful |

## Security Considerations

Portainer provides administrative control over Docker and should be protected accordingly.

The current deployment uses private LAN and Tailscale addresses rather than intentionally publishing the management interface to the internet.

Further security improvements include:

- Maintaining strong administrator credentials.
- Keeping Portainer and Docker updated.
- Restricting access using network firewall rules and Tailscale policies.
- Implementing trusted HTTPS certificates where appropriate.
- Backing up Portainer's persistent configuration data.
- Avoiding publication of setup tokens and credentials.

## What I Learnt

This lab provided practical experience with:

- Deploying an application using Docker Compose.
- Understanding YAML service definitions.
- Configuring container restart policies.
- Publishing container ports to specific host interfaces.
- Using Docker named volumes for persistent storage.
- Understanding the security implications of Docker socket access.
- Validating Compose configurations before deployment.
- Inspecting container logs for troubleshooting.
- Accessing self-hosted applications through Tailscale.
- Configuring a Docker management interface.

## Next Lab

**Lab 03 — NGINX Web Server Deployment**

The next lab will focus on deploying NGINX as a Docker container and hosting a custom web page on the HP Mini.

This will provide the foundation for hosting CoderCo projects and eventually integrating the infrastructure with my domain, `rginfralabs.co.uk`.

---

[Back to RG Infrastructure](../../README.md)
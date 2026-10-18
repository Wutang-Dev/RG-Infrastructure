
document.getElementById("year").textContent = new Date().getFullYear();

// Use the same hostname or IP as the dashboard.
// This supports both LAN and Tailscale access.
const host = window.location.hostname;

document.getElementById("portainer-link").href =
    `https://${host}:9443`;

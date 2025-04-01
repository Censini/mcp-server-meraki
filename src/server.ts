import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { MerakiService } from "./services/meraki.js";
import { MerakiApiError } from "./errors.js";

// Création du service Meraki avec la clé API depuis les variables d'environnement
const merakiService = new MerakiService(process.env.MERAKI_API_KEY || '');

// Création du serveur MCP
const server = new McpServer({
    name: "Meraki MCP Server",
    version: "1.0.0"
});

// === Organizations ===
server.tool(
    "list_organizations",
    {},
    async () => {
        try {
            const organizations = await merakiService.listOrganizations();
            return {
                content: [{ type: "text", text: JSON.stringify(organizations, null, 2) }]
            };
        } catch (error) {
            if (error instanceof MerakiApiError) {
                throw new Error('Erreur lors de la récupération des organisations');
            }
            throw error;
        }
    }
);

// === Networks ===
server.tool(
    "list_networks",
    { organizationId: z.string() },
    async ({ organizationId }) => {
        const networks = await merakiService.listNetworks(organizationId);
        return {
            content: [{ type: "text", text: JSON.stringify(networks, null, 2) }]
        };
    }
);

// === Devices ===
server.tool(
    "list_devices",
    { networkId: z.string() },
    async ({ networkId }) => {
        const devices = await merakiService.listDevices(networkId);
        return {
            content: [{ type: "text", text: JSON.stringify(devices, null, 2) }]
        };
    }
);

// === Management Interface ===
server.tool(
    "get_management_interface",
    { serial: z.string() },
    async ({ serial }) => {
        const managementInterface = await merakiService.getManagementInterface(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(managementInterface, null, 2) }]
        };
    }
);

// === Switch Ports ===
server.tool(
    "list_switch_ports",
    { serial: z.string() },
    async ({ serial }) => {
        const ports = await merakiService.listSwitchPorts(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(ports, null, 2) }]
        };
    }
);

// === Wireless Settings ===
server.tool(
    "get_wireless_radio_settings",
    { serial: z.string() },
    async ({ serial }) => {
        const settings = await merakiService.getWirelessRadioSettings(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(settings, null, 2) }]
        };
    }
);

server.tool(
    "get_wireless_status",
    { serial: z.string() },
    async ({ serial }) => {
        const status = await merakiService.getWirelessStatus(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(status, null, 2) }]
        };
    }
);

server.tool(
    "get_wireless_latency_stats",
    { serial: z.string() },
    async ({ serial }) => {
        const stats = await merakiService.getWirelessLatencyStats(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(stats, null, 2) }]
        };
    }
);

// === Switch Routing ===
server.tool(
    "list_switch_routing_interfaces",
    { serial: z.string() },
    async ({ serial }) => {
        const interfaces = await merakiService.listSwitchRoutingInterfaces(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(interfaces, null, 2) }]
        };
    }
);

server.tool(
    "list_switch_static_routes",
    { serial: z.string() },
    async ({ serial }) => {
        const routes = await merakiService.listSwitchStaticRoutes(serial);
        return {
            content: [{ type: "text", text: JSON.stringify(routes, null, 2) }]
        };
    }
);

// === Resources ===
server.resource(
    "organization",
    new ResourceTemplate("meraki://organization/{id}", { list: undefined }),
    async (uri, { id }) => {
        const organizationId = Array.isArray(id) ? id[0] : id;
        const organization = await merakiService.getOrganization(organizationId);
        return {
            contents: [{
                uri: uri.href,
                text: JSON.stringify(organization, null, 2)
            }]
        };
    }
);

server.resource(
    "network",
    new ResourceTemplate("meraki://network/{id}", { list: undefined }),
    async (uri, { id }) => {
        const networkId = Array.isArray(id) ? id[0] : id;
        const network = await merakiService.getNetwork(networkId);
        return {
            contents: [{
                uri: uri.href,
                text: JSON.stringify(network, null, 2)
            }]
        };
    }
);

server.resource(
    "device",
    new ResourceTemplate("meraki://device/{serial}", { list: undefined }),
    async (uri, { serial }) => {
        const deviceSerial = Array.isArray(serial) ? serial[0] : serial;
        const device = await merakiService.getDevice(deviceSerial);
        return {
            contents: [{
                uri: uri.href,
                text: JSON.stringify(device, null, 2)
            }]
        };
    }
);

// Connexion du serveur au transport stdio
const transport = new StdioServerTransport();
server.server.connect(transport);

export default server;
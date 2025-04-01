import {
    MerakiOrganization,
    MerakiNetwork,
    MerakiDevice,
    MerakiManagementInterface,
    MerakiSwitchPort,
    MerakiWirelessRadioSettings,
    MerakiWirelessStatus,
    MerakiWirelessLatencyStats,
    MerakiSwitchRoutingInterface,
    MerakiSwitchStaticRoute,
    DeviceType
} from '../types/meraki';

/**
 * Service pour interagir avec l'API Meraki
 * @class MerakiService
 */
export class MerakiService {
    private readonly baseUrl = 'https://api.meraki.com/api/v1';
    private readonly apiKey: string;

    /**
     * Crée une nouvelle instance du service Meraki
     * @param {string} apiKey - La clé API Meraki
     */
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Effectue une requête authentifiée à l'API Meraki
     * @private
     * @param {string} endpoint - L'endpoint de l'API
     * @param {RequestInit} options - Les options de la requête
     * @returns {Promise<T>} La réponse de l'API
     * @throws {MerakiApiError} Si la requête échoue
     */
    private async fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                "X-Cisco-Meraki-API-Key": this.apiKey,
                "Content-Type": "application/json",
                ...options.headers
            }
        });

        if (!response.ok) {
            throw MerakiApiError.fromResponse(response);
        }

        return response.json();
    }

    /**
     * Récupère la liste des organisations Meraki
     * @returns {Promise<MerakiOrganization[]>} Liste des organisations
     * @throws {MerakiApiError} Si la requête échoue
     */
    async listOrganizations(): Promise<MerakiOrganization[]> {
        return this.fetchWithAuth('/organizations');
    }

    /**
     * Récupère la liste des réseaux d'une organisation
     * @param {string} organizationId - L'ID de l'organisation
     * @returns {Promise<MerakiNetwork[]>} Liste des réseaux
     * @throws {MerakiApiError} Si la requête échoue
     */
    async listNetworks(organizationId: string): Promise<MerakiNetwork[]> {
        return this.fetchWithAuth(`/organizations/${organizationId}/networks`);
    }

    /**
     * Récupère la liste des équipements d'un réseau
     * @param {string} networkId - L'ID du réseau
     * @returns {Promise<MerakiDevice[]>} Liste des équipements
     * @throws {MerakiApiError} Si la requête échoue
     */
    async listDevices(networkId: string): Promise<MerakiDevice[]> {
        return this.fetchWithAuth(`/networks/${networkId}/devices`);
    }

    /**
     * Récupère les paramètres de l'interface de gestion d'un appareil
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiManagementInterface>} Les paramètres de l'interface
     * @throws {MerakiApiError} Si la requête échoue
     */
    async getManagementInterface(serial: string): Promise<MerakiManagementInterface> {
        return this.fetchWithAuth(`/devices/${serial}/management/interface`);
    }

    /**
     * Détermine le type d'appareil en fonction du modèle
     * @private
     * @param {string} model - Le modèle de l'appareil
     * @returns {DeviceType} Le type d'appareil
     */
    private getDeviceType(model: string): DeviceType {
        if (model.startsWith('MS')) return DeviceType.Switch;
        if (model.startsWith('MR')) return DeviceType.Wireless;
        return DeviceType.Appliance;
    }

    /**
     * Récupère la liste des ports switch d'un appareil
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiSwitchPort[]>} Liste des ports
     * @throws {MerakiApiError} Si la requête échoue
     */
    async listSwitchPorts(serial: string): Promise<MerakiSwitchPort[]> {
        const device = await this.getDevice(serial);
        if (this.getDeviceType(device.model) !== DeviceType.Switch) {
            throw new MerakiApiError(400, `L'appareil ${serial} n'est pas un switch`);
        }
        return this.fetchWithAuth(`/devices/${serial}/switchPorts`);
    }

    /**
     * Récupère les paramètres radio d'un point d'accès sans fil
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiWirelessRadioSettings>} Les paramètres radio
     * @throws {MerakiApiError} Si la requête échoue
     */
    async getWirelessRadioSettings(serial: string): Promise<MerakiWirelessRadioSettings> {
        return this.fetchWithAuth(`/devices/${serial}/wireless/radio/settings`);
    }

    /**
     * Récupère le statut sans fil d'un point d'accès
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiWirelessStatus>} Le statut sans fil
     * @throws {MerakiApiError} Si la requête échoue
     */
    async getWirelessStatus(serial: string): Promise<MerakiWirelessStatus> {
        return this.fetchWithAuth(`/devices/${serial}/wireless/status`);
    }

    /**
     * Récupère les statistiques de latence sans fil d'un point d'accès
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiWirelessLatencyStats>} Les statistiques de latence
     * @throws {MerakiApiError} Si la requête échoue
     */
    async getWirelessLatencyStats(serial: string): Promise<MerakiWirelessLatencyStats> {
        return this.fetchWithAuth(`/devices/${serial}/wireless/latencyStats`);
    }

    /**
     * Récupère la configuration des ports d'un switch
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiSwitchPort[]>} La configuration des ports
     * @throws {MerakiApiError} Si la requête échoue
     */
    async getSwitchPorts(serial: string): Promise<MerakiSwitchPort[]> {
        return this.fetchWithAuth(`/devices/${serial}/switch/ports`);
    }

    /**
     * Récupère la liste des interfaces de routage d'un switch
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiSwitchRoutingInterface[]>} Liste des interfaces
     * @throws {MerakiApiError} Si la requête échoue
     */
    async listSwitchRoutingInterfaces(serial: string): Promise<MerakiSwitchRoutingInterface[]> {
        return this.fetchWithAuth(`/devices/${serial}/switch/routing/interfaces`);
    }

    /**
     * Récupère la liste des routes statiques d'un switch
     * @param {string} serial - Le numéro de série de l'appareil
     * @returns {Promise<MerakiSwitchStaticRoute[]>} Liste des routes
     * @throws {MerakiApiError} Si la requête échoue
     */
    async listSwitchStaticRoutes(serial: string): Promise<MerakiSwitchStaticRoute[]> {
        return this.fetchWithAuth(`/devices/${serial}/switch/routing/staticRoutes`);
    }

    /**
     * Récupère les détails d'un appareil spécifique
     * @param serial - Le numéro de série de l'appareil
     * @returns Les détails de l'appareil
     * @throws MerakiApiError si la requête échoue
     */
    async getDevice(serial: string): Promise<MerakiDevice> {
        return this.fetchWithAuth(`/devices/${serial}`);
    }

    /**
     * Récupère les détails d'une organisation spécifique
     * @param organizationId - L'ID de l'organisation
     * @returns Les détails de l'organisation
     * @throws MerakiApiError si la requête échoue
     */
    async getOrganization(organizationId: string): Promise<MerakiOrganization> {
        return this.fetchWithAuth(`/organizations/${organizationId}`);
    }

    /**
     * Récupère les détails d'un réseau spécifique
     * @param networkId - L'ID du réseau
     * @returns Les détails du réseau
     * @throws MerakiApiError si la requête échoue
     */
    async getNetwork(networkId: string): Promise<MerakiNetwork> {
        return this.fetchWithAuth(`/networks/${networkId}`);
    }
}
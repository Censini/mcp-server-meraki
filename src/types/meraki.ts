export interface MerakiOrganization {
    id: string;
    name: string;
    url: string;
    api: {
        enabled: boolean;
    };
    licensing: {
        model: string;
    };
    cloud: {
        region: {
            name: string;
        };
    };
    management: {
        details: [
            {
                name: string;
                value: string;
            }
        ];
    };
}

export interface MerakiNetwork {
    id: string;
    organizationId: string;
    name: string;
    productTypes: string[];
    timeZone: string;
    tags: string[];
    enrollmentString: string;
    url: string;
    notes: string;
    isBoundToConfigTemplate: boolean;
}

export interface MerakiDevice {
    name: string;
    serial: string;
    mac: string;
    model: string;
    networkId: string;
    address: string;
    lat: number;
    lng: number;
    notes: string;
    tags: string[];
    wan1Ip: string;
    wan2Ip: string;
    lanIp: string;
    url: string;
}

export interface MerakiManagementInterface {
    wan1: {
        usingStaticIp: boolean;
        staticIp: string;
        staticSubnetMask: string;
        staticGatewayIp: string;
        staticDns: string[];
        wanEnabled: string;
        usingAlternateManagementIp: boolean;
        alternateManagementIp: string;
        alternateManagementSubnetMask: string;
        alternateManagementGatewayIp: string;
        alternateManagementDns: string[];
    };
    wan2: {
        usingStaticIp: boolean;
        staticIp: string;
        staticSubnetMask: string;
        staticGatewayIp: string;
        staticDns: string[];
        wanEnabled: string;
        usingAlternateManagementIp: boolean;
        alternateManagementIp: string;
        alternateManagementSubnetMask: string;
        alternateManagementGatewayIp: string;
        alternateManagementDns: string[];
    };
}

export interface MerakiSwitchPort {
    portId: string;
    name: string;
    tags: string[];
    enabled: boolean;
    poeEnabled: boolean;
    type: string;
    vlan: number;
    voiceVlan: number;
    allowedVlans: string;
    isolationEnabled: boolean;
    rstpEnabled: boolean;
    stpGuard: string;
    linkNegotiation: string;
    portScheduleId: string;
    udld: string;
    accessPolicyType: string;
    stickyMacAllowList: string[];
    stickyMacAllowListLimit: number;
    stormControlEnabled: boolean;
}

export interface MerakiWirelessRadioSettings {
    rfProfileId: string;
    twoFourGhzSettings: {
        channel: number;
        targetPower: number;
        minBitrate: number;
        channelWidth: number;
    };
    fiveGhzSettings: {
        channel: number;
        channelWidth: number;
        targetPower: number;
        minBitrate: number;
    };
}

export interface MerakiWirelessStatus {
    basicServiceSets: {
        ssid: string;
        enabled: boolean;
        band: string;
        channel: number;
        powerLevel: number;
    }[];
}

export interface MerakiWirelessLatencyStats {
    latencyStats: {
        background: number;
        bestEffort: number;
        video: number;
        voice: number;
    };
}

export interface MerakiSwitchRoutingInterface {
    interfaceId: string;
    name: string;
    subnet: string;
    interfaceIp: string;
    multicastRouting: string;
    vlanId: number;
    ospfSettings: {
        area: string;
        cost: number;
        isPassiveEnabled: boolean;
    };
    ospfV3: {
        area: string;
        cost: number;
        isPassiveEnabled: boolean;
    };
}

export interface MerakiSwitchStaticRoute {
    staticRouteId: string;
    name: string;
    subnet: string;
    nextHopIp: string;
    advertiseViaOspfEnabled: boolean;
    preferOverOspfRoutesEnabled: boolean;
}

export enum DeviceType {
    Switch = 'switch',
    Wireless = 'wireless',
    Appliance = 'appliance'
}
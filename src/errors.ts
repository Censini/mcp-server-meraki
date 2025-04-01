export class MerakiApiError extends Error {
    constructor(
        public readonly statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'MerakiApiError';
    }

    static fromResponse(response: Response): MerakiApiError {
        return new MerakiApiError(
            response.status,
            `Meraki API error: ${response.status} ${response.statusText}`
        );
    }
}
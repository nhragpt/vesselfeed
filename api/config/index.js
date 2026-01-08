// api/config.js
// Azure Static Web Apps API Function to serve vessel configuration

module.exports = async function (context, req) {
    // Get environment variables
    const vessels = {
        roma101: {
            name: process.env.ROMA101_NAME || 'Roma 101',
            storageUrl: process.env.ROMA101_STORAGE_URL,
            container: process.env.ROMA101_CONTAINER || '$web',
            sasToken: process.env.ROMA101_SAS_TOKEN
        },
        isthmusTrader: {
            name: process.env.ISTHMUS_NAME || 'Isthmus Trader',
            storageUrl: process.env.ISTHMUS_STORAGE_URL,
            container: process.env.ISTHMUS_CONTAINER || '$web',
            sasToken: process.env.ISTHMUS_SAS_TOKEN
        }
    };

    // Filter out vessels with missing configuration
    const configuredVessels = {};
    Object.keys(vessels).forEach(vesselId => {
        const vessel = vessels[vesselId];
        if (vessel.storageUrl && vessel.sasToken) {
            configuredVessels[vesselId] = vessel;
        }
    });

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: {
            vessels: configuredVessels
        }
    };
};

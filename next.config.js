module.exports = {
  env: {
    PUBLIC_STORAGE_ENDPOINT_FOR_CLIENT: process.env.PUBLIC_STORAGE_ENDPOINT,
    API_KEY_FOR_CLIENT: process.env.API_KEY,
    AUTH_DOMAIN_FOR_CLIENT: process.env.AUTH_DOMAIN,
    PROJECT_ID_FOR_CLIENT: process.env.PROJECT_ID,
    STORAGE_BUCKET_FOR_CLIENT: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID_FOR_CLIENT: process.env.MESSAGING_SENDER_ID,
    APP_ID_FOR_CLIENT: process.env.APP_ID,
    MEASUREMENT_ID_FOR_CLIENT: process.env.MEASUREMENT_ID,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

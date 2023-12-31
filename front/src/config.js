const API_URL = 'http://localhost:5000/';
// const API_URL = '/api/';

const FireBaseConfig = {
    API_KEY: process.env.REACT_APP_API_KEY,
    AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
    APP_ID: process.env.REACT_APP_APP_ID
};

export default API_URL;
export {FireBaseConfig};

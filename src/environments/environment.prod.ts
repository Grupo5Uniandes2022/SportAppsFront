export const environment = {
  production: true,
  stravaBaseUrl: 'https://www.strava.com/api/v3',
  authBaseUrl: 'https://www.strava.com/oauth/authorize',
  hostBaseUrl: 'http://' + window["location"]["host"] || "default",
  stravaOAuth: {
    clientId: '96159',
    redirectUri: 'http://'+ window["location"]["host"] +'/profile/strava-auth',
    issuer: 'https://www.strava.com',
    scope: 'activity:read_all,profile:read_all',
    responseType: 'code',
    loginUrl: 'https://www.strava.com/oauth/authorize',
    oidc: false,
    grantTypeAuth:'authorization_code',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    dummyClientSecret: 'f34f7ff6f22bad58ac431d1f59d35ce010829b16',
    showDebugInformation: false,
    logoutUrl: 'https://www.strava.com/oauth/deauthorize',
    revocationEndpoint: 'https://www.strava.com/oauth/deauthorize'
  }
};

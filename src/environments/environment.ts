// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stravaBaseUrl: 'https://www.strava.com/api/v3',
  authBaseUrl: 'https://www.strava.com/oauth/authorize',
  hostBaseUrl: 'http://'+ window["location"]["host"],
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

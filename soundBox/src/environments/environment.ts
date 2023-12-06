// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://ec2-54-85-110-77.compute-1.amazonaws.com:8080/api/',
  firebaseConfig: {
    apiKey: 'AIzaSyCno7V6CvinPm0EY9tm8EnQ75EMrKAgJSw',
    authDomain: 'sounbox-26c8e.firebaseapp.com',
    projectId: 'sounbox-26c8e',
    storageBucket: 'sounbox-26c8e.appspot.com',
    messagingSenderId: '391606678900',
    appId: '1:391606678900:web:deeaead1eec9002fc62821',
    measurementId: 'G-E6W796H2K6',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

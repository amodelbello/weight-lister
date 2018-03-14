// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB6WXogbRd6Q7I9cU45n6f9ah05hAWUXJc",
    authDomain: "weightlister.firebaseapp.com",
    databaseURL: "https://weightlister.firebaseio.com",
    projectId: "weightlister",
    storageBucket: "weightlister.appspot.com",
    messagingSenderId: "132117086880"
  }
};

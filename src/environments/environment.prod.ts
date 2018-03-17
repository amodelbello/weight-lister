import * as common from './environment.common';

export const environment = {
  ...common.commonEnvironment,

  production: true,
  firebase: {
    apiKey: "AIzaSyB6WXogbRd6Q7I9cU45n6f9ah05hAWUXJc",
    authDomain: "weightlister.firebaseapp.com",
    databaseURL: "https://weightlister.firebaseio.com",
    projectId: "weightlister",
    storageBucket: "weightlister.appspot.com",
    messagingSenderId: "132117086880"
  }
};

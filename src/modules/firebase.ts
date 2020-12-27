import firebase from 'firebase/app'

const devConfig = {
  apiKey: "AIzaSyBzY2-PG4kdtIgST6Zac1BOHeE090QwU-k",
  authDomain: "short-story-dev.firebaseapp.com",
  projectId: "short-story-dev",
  storageBucket: "short-story-dev.appspot.com",
  messagingSenderId: "58095232709",
  appId: "1:58095232709:web:533f7a7c11a928b99c32ac",
  measurementId: "G-BN5XYEWEX7"
};

const prodConfig = {
  apiKey: "AIzaSyBQm6jr2WoYliLQ55Q2C1gozsfz1UPnVJE",
  authDomain: "short-story-prod.firebaseapp.com",
  projectId: "short-story-prod",
  storageBucket: "short-story-prod.appspot.com",
  messagingSenderId: "303500143974",
  appId: "1:303500143974:web:5605ac3bf4122fe1e72ca7",
  measurementId: "G-306BSYP0CM"
};

export const initializeApp = () => {
  if (firebase.apps.length !== 0) { return }
  switch (process.env.ENDPOINT_FOR_CLIENT) {
    case 'production':
      firebase.initializeApp(prodConfig)
    default:
      firebase.initializeApp(devConfig)
  }
}
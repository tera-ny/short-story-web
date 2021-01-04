import firebase from 'firebase'
import { storyConverter } from './entity'
import { v4 } from "uuid";
import path from "path";
import { userConverter } from "~/modules/entity";

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

const publicBucketName = () => {
  if (process.env.ENDPOINT_FOR_CLIENT === 'production') {
    return "public-short-story"
  } else {
    return "public-short-story-dev"
  }
}

export const firebaseApp = () => {
  try {
    if (!firebase.apps.length) {
      switch (process.env.ENDPOINT_FOR_CLIENT) {
        case 'production':
          return firebase.initializeApp(prodConfig)
        default:
          return firebase.initializeApp(devConfig)
      }
    } else {
      return firebase.app()
    }
  } catch (e) {
    if (firebase.apps.length) {
      return firebase.app()
    } else {
      throw e
    }
  }
}

export enum FirestorePath {
  story = 'stories',
  user = 'users'
}

export const fetchStory = async (uid: string, storyid: string) => {
  const response = await firebaseApp()
    .firestore().collection(FirestorePath.user).doc(uid)
    .collection(FirestorePath.story)
    .doc(storyid)
    .withConverter(storyConverter)
    .get();
  return response
};


export const storyCollectionRef = (uid: string) =>
  firebaseApp()
    .firestore()
    .collection(FirestorePath.user)
    .doc(uid)
    .collection(FirestorePath.story)

export const uploadPublicImage = async (file: File): Promise<string> => {
  const name = v4() + path.extname(file.name);
  await firebaseApp()
    .storage(`gs://${publicBucketName()}`)
    .ref("images")
    .child(name)
    .put(file, { contentType: file.type });
  return name
}

export const uploadIconImage = async (uid: string, file: File) => {
  const name = await uploadPublicImage(file)
  const url = `https://storage.googleapis.com/${publicBucketName()}/images/${name}`
  await firebaseApp()
    .firestore()
    .collection(FirestorePath.user)
    .doc(uid)
    .set({ icon: url, updateTime: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
  return url
}
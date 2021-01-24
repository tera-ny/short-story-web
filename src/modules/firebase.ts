import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { storyConverter, userConverter } from "./entity";
import { v4 } from "uuid";

export const firebaseApp = () => {
  try {
    if (!firebase.apps.length) {
      return firebase.initializeApp({
        apiKey: process.env.API_KEY_FOR_CLIENT,
        authDomain: process.env.AUTH_DOMAIN_FOR_CLIENT,
        projectId: process.env.PROJECT_ID_FOR_CLIENT,
        storageBucket: process.env.STORAGE_BUCKET_FOR_CLIENT,
        messagingSenderId: process.env.MESSAGING_SENDER_ID_FOR_CLIENT,
        appId: process.env.APP_ID_FOR_CLIENT,
        measurementId: process.env.MEASUREMENT_ID_FOR_CLIENT,
      })
    } else {
      return firebase.app();
    }
  } catch (e) {
    if (firebase.apps.length) {
      return firebase.app();
    } else {
      throw e;
    }
  }
};

export enum FirestorePath {
  story = "stories",
  user = "users",
}

export const fetchUser = async (uid: string) => {
  const response = await firebaseApp()
    .firestore()
    .collection(FirestorePath.user)
    .doc(uid)
    .withConverter(userConverter)
    .get();
  return response;
};

export const fetchStory = async (uid: string, storyid: string) => {
  const response = await firebaseApp()
    .firestore()
    .collection(FirestorePath.user)
    .doc(uid)
    .collection(FirestorePath.story)
    .doc(storyid)
    .withConverter(storyConverter)
    .get();
  return response;
};

export const storyCollectionRef = (uid: string) =>
  firebaseApp()
    .firestore()
    .collection(FirestorePath.user)
    .doc(uid)
    .collection(FirestorePath.story);

enum AllowImageType {
  png = "image/png",
  jpeg = "image/jpeg",
}

const imageExtension = (mimeType: string) => {
  switch (mimeType) {
    case AllowImageType.png:
      return ".png";
    case AllowImageType.jpeg:
      return ".jpeg";
    default:
      throw new Error("Extensions that cannot be used");
  }
};

export const uploadPublicImage = async (image: Blob) => {
  const name = v4() + imageExtension(image.type);
  await firebaseApp()
    .storage(`gs://${process.env.PUBLIC_STORAGE_ENDPOINT_FOR_CLIENT}`)
    .ref("images")
    .child(name)
    .put(image, { contentType: image.type });
  return { name: name };
};

export const uploadIconImage = async (uid: string, image: Blob) => {
  const { name } = await uploadPublicImage(image);
  const url = `https://storage.googleapis.com/${process.env.PUBLIC_STORAGE_ENDPOINT_FOR_CLIENT}/images/${name}`;
  await firebaseApp().firestore().collection(FirestorePath.user).doc(uid).set(
    {
      icon: url,
      updateTime: firebase.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return url;
};

export const sendEmailVerification = async () => {
  const user = firebaseApp().auth().currentUser
  if (user) {
    await user.sendEmailVerification()
  }
}
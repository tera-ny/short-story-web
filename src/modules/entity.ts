import firebase from "firebase/app";
import "firebase/firestore";

interface TimeStamps {
  createTime: firebase.firestore.Timestamp;
  updateTime: firebase.firestore.Timestamp;
}

export interface Story extends TimeStamps {
  title: string;
  body: string;
  isPublished: boolean;
  isActive: boolean;
}

export interface User extends TimeStamps {
  name: string;
  icon?: string;
  aboutMe?: string;
}

export const storyConverter: firebase.firestore.FirestoreDataConverter<Story> = {
  toFirestore(story: Partial<Story>): firebase.firestore.DocumentData {
    return {
      title: story.title,
      body: story.body,
      isPublished: story.isPublished,
      isActive: story.isActive,
      updateTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Story {
    const data = snapshot.data(options)!;
    return data as Story;
  },
};

export const userConverter: firebase.firestore.FirestoreDataConverter<User> = {
  toFirestore(user: Partial<User>): firebase.firestore.DocumentData {
    return {
      name: user.name,
      icon: user.icon,
      updateTime: firebase.firestore.FieldValue.serverTimestamp,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User {
    const data = snapshot.data(options)!;
    return data as User;
  },
};

export interface SearchKeyAPIResponse {
  searchKey: string,
  acceptIndices: [string]
  lifetimeMillis?: number
}
import firebase from 'firebase'

interface TimeStamps {
  createTime: firebase.firestore.Timestamp,
  updateTime: firebase.firestore.Timestamp
}

export interface Story extends TimeStamps {
  title: string;
  body: string;
  isPublished: boolean,
  isActive: boolean,
}

export interface User extends TimeStamps {
  name: string;
}

export const storyConverter = {
  toFirestore(story: Story): firebase.firestore.DocumentData {
    return { title: story.title, body: story.body, isPublished: story.isPublished, isActive: story.isActive, updateTime: firebase.firestore.FieldValue.serverTimestamp() }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Story {
    const data = snapshot.data(options)!;
    return data as Story
  }
};

export const userConverter = {
  toFirestore(user: User): firebase.firestore.DocumentData {
    return { name: user.name, updateTime: firebase.firestore.FieldValue.serverTimestamp }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User {
    const data = snapshot.data(options)!;
    return data as User;
  }
}
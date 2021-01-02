import firebase from 'firebase'

export interface Story {
  title: string;
  body: string;
  isPublished: boolean,
  isActive: boolean,
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
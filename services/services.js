import { firebase } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { TASK_CATEGORY } from "../constants/constants";

export const createProfile = async (uid, name) => {
  return await firebase
    .app()
    .database(process.env.EXPO_PUBLIC_DB)
    .ref(`/users/${uid}`)
    .set({ name });
};

export async function createUserWithEmailAndPassword(email, password) {
  const response = await auth().createUserWithEmailAndPassword(email, password);
  return response.user;
}

export async function signInWithEmailAndPassword(email, password) {
  const response = await auth().signInWithEmailAndPassword(email, password);

  return response.user;
}

export function getCurrentUser() {
  return auth().currentUser;
}

export async function saveTaskByCategory({ category, data, context }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/${category}/${context}`)
      .set(data);

    return response;
  }
}

export async function saveMoodTask({ category, data, day }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/${category}/${day}`)
      .set(data);

    return response;
  }
}

export async function getUserTasks() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/tasks`)
      .once("value");

    return response.val();
  }
}

export async function getUserDayTasks(category, context) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const ref =
      category === TASK_CATEGORY.MOOD
        ? `/users/${currentUser.uid}/${category}`
        : `/users/${currentUser.uid}/${category}/${context}`;
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(ref)
      .once("value");

    return response.val();
  }
}

export async function getUserSummary() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/summary`)
      .once("value");

    return response.val();
  }
}

export async function getUserPlans() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/plans`)
      .once("value");

    return response.val();
  }
}

export async function getUserPhotos() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/monthPhoto`)
      .once("value");

    return response.val();
  }
}

export async function saveImage(image) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const reference = storage().ref(`/images/${currentUser.uid}/${image.id}`);
    await reference.putFile(image.uri);
  }
}

export async function getImageUrl(id) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const url = await storage()
      .ref(`/images/${currentUser.uid}/${id}`)
      .getDownloadURL();
    return url;
  }
}

export async function removeTask({ category, context }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const ref =
      category === TASK_CATEGORY.MOOD
        ? `/users/${currentUser.uid}/${category}`
        : `/users/${currentUser.uid}/${category}/${context}`;
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(ref)
      .remove();

    return response;
  }
}

export async function getComplited() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/complited`)
      .once("value");

    return response.val();
  }
}

export async function setComplited({ day }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const complited = (await getComplited()) ?? [];

    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`/users/${currentUser.uid}/complited`)
      .set([...complited, day]);

    return response;
  }
}

export async function removeComplited({ day }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const complited = await getComplited();
    if (complited) {
      const newComplited = complited.filter((item) => item !== day);
      const response = await firebase
        .app()
        .database(process.env.EXPO_PUBLIC_DB)
        .ref(`/users/${currentUser.uid}/complited`)
        .set(newComplited);

      return response;
    }
  }
}

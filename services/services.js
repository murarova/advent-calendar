import { firebase } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { TASK_CATEGORY, YEAR } from "../constants/constants";

const baseUrl = `/${YEAR}/users`;

export const createProfile = async (uid, name) => {
  return await firebase
    .app()
    .database(process.env.EXPO_PUBLIC_DB)
    .ref(`${baseUrl}/${uid}`)
    .set({ userProfile: { name } });
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

export async function deleteCurrentUser() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`${baseUrl}/${currentUser.uid}`)
      .remove();
  }
  await currentUser.delete();
}

export async function getUserRole() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`${baseUrl}/${currentUser.uid}/userProfile/role`)
      .once("value");

    return response.val();
  }
}

export async function saveTaskByCategory({ category, data, context }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`${baseUrl}/${currentUser.uid}/${category}/${context}`)
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
      .ref(`${baseUrl}/${currentUser.uid}/${category}/${day}`)
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
      .ref(`${baseUrl}/${currentUser.uid}/tasks`)
      .once("value");

    return response.val();
  }
}

export async function getUserDayTasks(category, context) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const ref =
      category === TASK_CATEGORY.MOOD
        ? `${baseUrl}/${currentUser.uid}/${category}`
        : `${baseUrl}/${currentUser.uid}/${category}/${context}`;
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
      .ref(`${baseUrl}/${currentUser.uid}/summary`)
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
      .ref(`${baseUrl}/${currentUser.uid}/plans`)
      .once("value");

    return response.val();
  }
}

export async function getUserGlobalGoal() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`${baseUrl}/${currentUser.uid}/goals/globalGoal`)
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
      .ref(`${baseUrl}/${currentUser.uid}/monthPhoto`)
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

export async function deleteImage(image) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const reference = storage().ref(`/images/${currentUser.uid}/${image.id}`);
    await reference.delete();
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
        ? `${baseUrl}/${currentUser.uid}/${category}`
        : `${baseUrl}/${currentUser.uid}/${category}/${context}`;
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
      .ref(`${baseUrl}/${currentUser.uid}/complited`)
      .once("value");

    return response.val();
  }
}

export async function setComplited({ day }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const complited = (await getComplited()) ?? [];
    const isUniqueDay = !complited.find((item) => item === day);
    if (!isUniqueDay) {
      return;
    }

    const response = await firebase
      .app()
      .database(process.env.EXPO_PUBLIC_DB)
      .ref(`${baseUrl}/${currentUser.uid}/complited`)
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
        .ref(`${baseUrl}/${currentUser.uid}/complited`)
        .set(newComplited);

      return response;
    }
  }
}

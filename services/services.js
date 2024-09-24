import { firebase } from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export const createProfile = async (uid, name) => {
  firebase.app().database(process.env.DB).ref(`/users/${uid}`).set({ name });
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

export async function saveUserTask({ type, task, day, category }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.DB)
      .ref(`/users/${currentUser.uid}/tasks/${day}/${type}/${category}`)
      .set(task);

    return response;
  }
}

export async function saveTaskByCategory({ category, data, context }) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.DB)
      .ref(`/users/${currentUser.uid}/${category}/${context}`)
      .set(data);

    return response;
  }
}

export async function getUserTasks() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.DB)
      .ref(`/users/${currentUser.uid}/tasks`)
      .once("value");

    return response.val();
  }
}

//TODO: do we need to save it?
export async function getUserDayTasks(category, context) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.DB)
      .ref(`/users/${currentUser.uid}/${category}/${context}`)
      .once("value");

    return response.val();
  }
}

export async function getUserSummary() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const response = await firebase
      .app()
      .database(process.env.DB)
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
      .database(process.env.DB)
      .ref(`/users/${currentUser.uid}/plans`)
      .once("value");

    return response.val();
  }
}

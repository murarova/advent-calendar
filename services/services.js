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

export async function saveUserTask({ type, task, currentUser, day }) {
  const response = await firebase
    .app()
    .database(process.env.DB)
    .ref(`/users/${currentUser.uid}/tasks/${day}/${type}`)
    .set(task);

  return response;
}

export async function saveTaskByType({ currentUser, taskType, task }) {
  const response = await firebase
    .app()
    .database(process.env.DB)
    .ref(`/users/${currentUser.uid}/${taskType.type}/${taskType.area}`)
    .set(task);

  return response;
}

export async function getUserTasks(currentUser) {
  const response = await firebase
    .app()
    .database(process.env.DB)
    .ref(`/users/${currentUser.uid}/tasks`)
    .once("value");

  return response.val();
}

export async function getUserDayTasks(currentUser, day) {
  const response = await firebase
    .app()
    .database(process.env.DB)
    .ref(`/users/${currentUser.uid}/tasks/${day}`)
    .once("value");

  return response.val();
}

export async function getUserSummary(currentUser) {
  const response = await firebase
    .app()
    .database(process.env.DB)
    .ref(`/users/${currentUser.uid}/summary`)
    .once("value");

  return response.val();
}

export async function getUserPlans(currentUser) {
  const response = await firebase
    .app()
    .database(process.env.DB)
    .ref(`/users/${currentUser.uid}/plans`)
    .once("value");

  return response.val();
}

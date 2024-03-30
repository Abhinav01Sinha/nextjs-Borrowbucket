import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
  storageBucket: "borrowbucket-c6ba5.appspot.com",
  messagingSenderId: "195908945063",
  appId: "1:195908945063:web:4a3ae36c652c985fae8782",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(app);
export const storageRef = (token: string) => ref(storage, token);

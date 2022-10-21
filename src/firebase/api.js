import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";

const collectionName = "people";

export const addPeople = (person) =>
  addDoc(collection(db, collectionName), person);

export const updatePerson = (id, data) =>
  updateDoc(doc(db, collectionName, id), data);

export const getPeopleList = () => getDocs(collection(db, collectionName));

export const deletePerson = (id) => deleteDoc(doc(db, collectionName, id));

export const getPerson = (id) => getDoc(doc(db, collectionName, id));

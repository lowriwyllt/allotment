import { app } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { UserType } from "../types/Users.types";

const db = getFirestore(app);

// CREATE USER
export const createUser = async ({ name, email, avatarUrl, allotment}: UserType) => {
  try {
    await setDoc(doc(db, "users", email), {
      name,
      email,
      avatarUrl,
      allotment,
    });
  } catch (err) {
    console.error(err);
  }
};


// GET AVATARS
export const getAvatars = async () => {
  const result: string[] = [];
  try {
    const avatars = await getDocs(collection(db, "avatars"));
    avatars.forEach((doc) => {
      result.push(doc.data().URL);
    });
    return result;
  } catch (err) {
    console.log("did not work");
  }
};

// GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
  } catch (err) {
    console.log(err);
  }
};

// GET ALL PLANTimages
export const getAllPlantImages = async () => {
  const result: string[] = [];
  try {
    const plants = await getDocs(collection(db, "plants"));
    plants.forEach((plantDoc) => {
      result.push(plantDoc.data().img);
  
    });
    return result;

  } catch (err) {
    console.log("did not work");
  }
};
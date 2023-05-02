import { app } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { UserType } from "../types/Users.types";

const db = getFirestore(app);

// CREATE USER
export const createUser = async ({
  name,
  email,
  avatarUrl,
  allotment,
}: UserType) => {
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

// GET ALL PLANT IMAGES
export const getAllPlantImages = async () => {
  const result: PlantTypeForAll[] = [];
  try {
    const plants = await getDocs(collection(db, "plants"));
    plants.forEach((plantDoc) => {
      result.push({ img: plantDoc.data().img, name: plantDoc.data().name });
    });
    return result;
  } catch (err) {
    console.log("did not work");
  }
};

//GET ALL PLANT DETAILS BY NAME
export const getPlantByName = async (name: string) => {
  try {
    const q = query(collection(db, "plants"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    let result: PlantType | {} = {};
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

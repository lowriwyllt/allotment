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
  updateDoc,
} from "firebase/firestore";
import { UserType } from "../types/Users.types";
import { PlantType, PlantTypeForAll } from "../types/Plants.types";

const db = getFirestore(app);

// CREATE USER - the feilds that are filled out by the user to create a profile
export const createUser = async ({
  name,
  emailLowerCase,
  avatarUrl,
  allotment,
}: UserType) => {
  try {
    await setDoc(doc(db, "users", emailLowerCase), {
      name,
      email: emailLowerCase,
      avatarUrl,
      allotment,
    });
  } catch (err) {
    console.error(err);
  }
};

// GET AVATARS - A list of themed avatars which the user can chose from to use as their profile pic/avatar
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

// GET USER BY EMAIL - The user object is found by the email, but only on reciept of password - redering the users hoempage once they've made an account or logged in
export const getUserByEmail = async (email: string) => {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.log(err);
  }
};

// GET ALL PLANT IMAGES - renders all the plant avatars from each plant object to represent all the plants in the database on one page
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

//GET ALL PLANT DETAILS BY NAME - once user clicks on a plant avatar it takes you to the page for all the info on that plant
export const getPlantByName = async (name: string) => {
  try {
    const q = query(collection(db, "plants"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    let result: PlantType | {} = {};
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    return result as PlantType;
  } catch (err) {
    console.log(err);
  }
};

export const patchUser = (email: string, name: string, newEmail: string, avatarUrl: string) => {
  try {
    const nameRef = doc(db, "users", email);

    // Set the "capital" field of the city 'DC'
    updateDoc(nameRef, {
      name: name,
      email: newEmail,
      avatarUrl: avatarUrl
    });
    return "patched successfully";
  } catch (err) {
    console.log(err);
  }
};

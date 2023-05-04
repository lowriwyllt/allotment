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
  arrayUnion,
} from "firebase/firestore";
import { PlantType, PlantTypeForAll } from "../types/Plants.types";
import { UserType, createUserProps } from "../types/Users.types";
const db = getFirestore(app);

// CREATE USER - the feilds that are filled out by the user to create a profile
export const createUser = async ({
  name,
  emailLowerCase,
  avatarUrl,
}: createUserProps) => {
  try {
    await setDoc(doc(db, "users", emailLowerCase), {
      name,
      email: emailLowerCase,
      avatarUrl,
    });
  } catch (err) {
    console.error(err);
  }
};

// PATCH to update users allotment

//We (Lily and Ryan) are changing the below so that instead of adding the plant from the database onto the allotment array in the user object...

//We are now adding the new plant data onto a key in the allotment which is now a collection inside the user object/collection

export const addPlantToAllotment = async (
  userId: string,
  plant: PlantType | undefined
) => {
  try {
    if (plant) {
      const allotmentPath = doc(db, "users", userId, "allotment", plant.name);
      await setDoc(allotmentPath, {
        id: plant.name,
        datePlanted: "Not ",
        ...plant,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// allotment [{plantName: Carrot, sown: false, dateSowed: 2023-05-03},{plantName: Onion, sown: false, dateSowed: 2023-05-03}]

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
    console.log(err);
  }
};

// GET USER BY EMAIL - The user object is found by the email, but only on reciept of password - redering the users hoempage once they've made an account or logged in
export const getUserByEmail = async (email: string | null) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let result: UserType | {} = {};
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    return result as UserType;
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
    console.log(err);
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

export const patchUser = (
  email: string,
  name: string | undefined,
  newEmail: string,
  avatarUrl: string
) => {
  try {
    const nameRef = doc(db, "users", email);

    // Set the "capital" field of the city 'DC'
    updateDoc(nameRef, {
      name: name,
      email: newEmail,
      avatarUrl: avatarUrl,
    });
    return "patched successfully";
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id: string) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let result: UserType | {} = {};
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    return result as UserType;
  } catch (err) {
    console.log(err);
  }
};

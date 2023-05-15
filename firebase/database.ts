import { app } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { PlantType, PlantTypeForAll } from "../types/Plants.types";
import { UserType, createUserProps, TaskType } from "../types/Users.types";
import genUniqueId from "./utils/utils";
const db = getFirestore(app);

// CREATE USER - the feilds that are filled out by the user to create a profile
export const createUser = async ({
  name,
  emailLowerCase,
  avatarUrl,
}: createUserProps) => {
  console.log("inside createUser");
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

// export const addPlantToAllotment = async (
//   userId: string,
//   plant: PlantType | undefined,
//   date: string
// ) => {
//   console.log("inside addPlantToAllotment");

//   try {
//     if (plant) {
//       const allotmentPath = doc(db, "users", userId, "allotment", plant.name);
//       await setDoc(allotmentPath, {
//         id: plant.name,
//         datePlanted: date,
//         ...plant,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addPlantToAllotment = async (
  userId: string,
  plant: PlantType | undefined,
  date: string
) => {
  console.log("inside addPlantToAllotment");

  try {
    if (plant) {
      const allotmentPath = doc(db, "users", userId, "allotment", plant.name);
      await setDoc(allotmentPath, {
        id: plant.name,
        datePlanted: date,
        ...plant,
      });

      const wateringTaskEndDate = new Date(date);
      wateringTaskEndDate.setDate(
        wateringTaskEndDate.getDate() + plant.maxDaysUntilHarvest
      );
      const wateringTask = {
        img: "https://firebasestorage.googleapis.com/v0/b/allotment-cc7dd.appspot.com/o/tasks%2Fwatering-can.png?alt=media&token=85e577a3-2a79-4553-8dd2-2bec67a62c7b", //maybe this should be water icon
        completed: false,
        body: `Water your ${plant?.name}`,
        repeatsInDays: plant?.wateringFrequencyInDays,
        startingDate: date, //datePlanted
        endingDate: wateringTaskEndDate.toLocaleDateString("en-CA"), //end of harvesting period (max)
        plant: plant?.name,
        category: "watering",
        nextTaskDate:
          new Date().toLocaleDateString("en-CA") > date
            ? new Date().toLocaleDateString("en-CA")
            : date, //I want the date if planting date is greater than todays date then
      } as TaskType;
      await addTask(userId, wateringTask);

      const HarvestingtaskStartDate = new Date(date);
      HarvestingtaskStartDate.setDate(
        HarvestingtaskStartDate.getDate() + plant.minDaysUntilHarvest
      );
      const HarvestingtaskEndDate = new Date(date);
      HarvestingtaskEndDate.setDate(
        HarvestingtaskEndDate.getDate() + plant.maxDaysUntilHarvest
      );
      const harvestingTask = {
        img: "https://firebasestorage.googleapis.com/v0/b/allotment-cc7dd.appspot.com/o/tasks%2Fharvesting.png?alt=media&token=d04789e6-99a3-41c7-9595-ad0c68eb50a3", //maybe this should be spade icon
        completed: false,
        body: `Harvest your ${plant?.name}`,
        repeatsInDays: 0, //never
        startingDate: HarvestingtaskStartDate.toLocaleDateString("en-CA"), //start of harvesting period
        endingDate: HarvestingtaskEndDate.toLocaleDateString("en-CA"), //end of harvesting period (max)
        plant: plant?.name,
        category: "harvesting",
        nextTaskDate:
          new Date().toLocaleDateString("en-CA") >
          HarvestingtaskStartDate.toLocaleDateString("en-CA")
            ? new Date().toLocaleDateString("en-CA")
            : HarvestingtaskStartDate.toLocaleDateString("en-CA"),
      } as TaskType;
      await addTask(userId, harvestingTask);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deletePlantFromAllotment = async (
  userId: string,
  plant: PlantType | undefined
) => {
  if (plant) {
    console.log("inside deletePlantFromAllotment");

    try {
      const userRef = doc(db, "users", userId, "allotment", plant.name);
      await deleteDoc(userRef);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getPlantsFromAllotment = async (userId: string) => {
  console.log("getPlantsFromAllotment");
  const result: any[] = [];
  try {
    const allotmentPlants = await getDocs(
      collection(db, "users", userId, "allotment")
    );
    allotmentPlants.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

// allotment [{plantName: Carrot, sown: false, dateSowed: 2023-05-03},{plantName: Onion, sown: false, dateSowed: 2023-05-03}]

// GET AVATARS - A list of themed avatars which the user can chose from to use as their profile pic/avatar
export const getAvatars = async () => {
  const result: string[] = [];
  try {
    console.log("inside getAvatars");

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
  console.log("inside getUserByEmail");
  try {
    console.log("getUserByEmail try");
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let result: UserType | {} = {};
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    console.log("result", result);
    return result as UserType;
  } catch (err) {
    console.log(err);
  }
};

// GET ALL PLANT IMAGES - renders all the plant avatars from each plant object to represent all the plants in the database on one page
export const getAllPlantImages = async () => {
  const result: PlantTypeForAll[] = [];
  console.log("inside getAllPlantImages");

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
  console.log("database getPlantByName");
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

export const patchUser = async (
  id: string | null | undefined,
  name: string | undefined,
  email: string | null | undefined,
  avatarUrl: string | undefined
) => {
  console.log("inside patchUser");

  try {
    const nameRef = doc(db, "users", id as string);

    updateDoc(nameRef, {
      name,
      email,
      avatarUrl,
    });
    return "patched successfully";
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id: string) => {
  console.log("inside getUserById");

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

// Add a new task to a users task collection (array)
export const addTask = async (userId: string, task: TaskType | undefined) => {
  try {
    if (task) {
      const taskPath = doc(db, "users", userId, "tasks", task.body);
      await setDoc(taskPath, task);
    }
  } catch (err) {
    console.log(err);
  }
};

// Get a users tasks
export const getTasks = async (userId: any) => {
  console.log("inside getTasks");

  try {
    const tasks: any = [];
    const q = query(collection(db, "users", userId, "tasks"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasks.push(doc.data());
    });
    return tasks;
  } catch (err) {
    console.log(err);
  }
};
export const setTaskCompleted = async (
  userId: string,
  task: TaskType | undefined
) => {
  console.log("inside setTaskCompleted");
  if (task) {
    try {
      const userRef = doc(db, "users", userId, "tasks", task.body);
      await updateDoc(userRef, {
        completed: Boolean(task.completed) ? false : true,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

// export const getPlantsFromUsersAllotment = async (
//   userId: any,
// ) => {
//   const result: any = [];
//   try {
//     console.log('inside getPlantsFromUsersAllotment')
//     const allotment = await getDocs(collection(db, "users", userId, 'allotment'));
//     allotment.forEach((plantDoc) => {
//       result.push({ img: plantDoc.data().img, name: plantDoc.data().id });
//     });
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// }

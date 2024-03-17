import { collection, getDocs,getDoc,setDoc,doc,addDoc,} from "firebase/firestore";
  import { db } from "@/utils/firebase";

export const createUser = async (data: {
    userId: string;
    userName?: string;
    displayName?: string;
    photoURL?: string;
  }) => {
    try {
      await setDoc(doc(db, "users", data.userId), { ...data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getUsers = async () => {
    try {
      const users: any[] = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      console.log({ querySnapshot });
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        users.push(doc.data());
      });
  
      return users;
    } catch (error) {
        console.log('User not found', error)
    }
  };
import { db } from "./app";
import { doc, getDoc } from "firebase/firestore";

async function getUser(id){
    const docRef = doc(db, "users", id);
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data;
    } catch (error) {
        console.log(error);
    }
    }


export {
    getUser
}
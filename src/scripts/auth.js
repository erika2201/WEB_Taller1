import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

async function registerUser(auth, {email, password}){
    try {
      const { user } = await createUserWithEmailAndPassword(auth,email,password);
      console.log("registrado");
    } catch (e) {
      console.log(e);
    }
  }

  async function loginUser(auth, email, password){
    try {
      const { user } = await signInWithEmailAndPassword(auth,email,password);
      console.log("entré");
    } catch (e) {
      console.log(e);
    }
  }

  export {
      registerUser,
      loginUser,
  }
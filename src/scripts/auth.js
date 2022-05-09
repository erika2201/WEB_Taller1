import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

async function registerUser(auth, {email, password}){
    try {
      const { user } = await createUserWithEmailAndPassword(auth,email,password);
      return user;

    } catch (e) {
      if(e.code === "auth/weak-password"){
        alert("Tu contraseña debe tener al menos 6 caracteres");
      }
      if(e.code === "auth/missing-email"){
        alert("Te falta ingresar un correo");
      }
      if(e.code === "auth/email-already-in-use"){
        alert("Este correo ya está registrado");
      }
      console.log(e.code);
    }
  }

  async function loginUser(auth, email, password){
    try {
      const { user } = await signInWithEmailAndPassword(auth,email,password);
      console.log(user);
    } catch (e) {
     alert("Usuario o contraseña inválido");
    }
  }
  
  async function addUserToDatabase(db, userId, userInfo){
    try {
      await setDoc(doc(db, "users", userId), userInfo)
      
    } catch (e) {
      console.log(e);
    }
  }

  export {
      registerUser,
      loginUser,
      addUserToDatabase
  }
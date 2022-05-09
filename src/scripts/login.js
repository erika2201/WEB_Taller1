import { db, auth } from "./app";
import { loginUser, registerUser, addUserToDatabase } from "../functions/auth";

const registerUserForm = document.getElementById("registerUserForm");
const loginUserForm = document.getElementById("loginUserForm");

if(registerUserForm != null){
  registerUserForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const name = registerUserForm.name.value;
    const lastname = registerUserForm.lastname.value;
    const email = registerUserForm.email.value;
    const password = registerUserForm.password.value;
    
    const newUser = {
      name,
      lastname,
      email,
      password,
      isAdmin: false,
    };
    
    const userRegistered = await registerUser(auth, newUser);
    await addUserToDatabase(db, userRegistered.uid, newUser);
  });
  }

  if(loginUserForm != null){
    loginUserForm.addEventListener("submit", e =>{
      e.preventDefault();
      const email = loginUserForm.email.value;
      const password = loginUserForm.password.value;
    
      loginUser(auth, email, password);
    });
    }
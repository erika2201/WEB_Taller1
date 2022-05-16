import { db, auth } from "./app";
import { loginUser, registerUser, addUserToDatabase, onAuthStateChanged } from "../functions/auth";
import { getUser } from "./getUser";

const registerUserForm = document.getElementById("registerUserForm");
const loginUserForm = document.getElementById("loginUserForm");
const user = auth.currentUser;

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

    console.log("Usuario registrado");
    
    const userRegistered = await registerUser(auth, newUser);
    await addUserToDatabase(db, userRegistered.uid, newUser);

    location.href = "./index.html";
  });
  }

  if(loginUserForm != null){
    loginUserForm.addEventListener("submit", e =>{
      e.preventDefault();
      const email = loginUserForm.email.value;
      const password = loginUserForm.password.value;
    
      loginUser(auth, email, password);
      console.log("Entraste");
    });
  }

  //Change according to admin status
  onAuthStateChanged(auth, async (user) =>{
    if(user){
      const uid = user.uid;
      let userAdmin = [];
      const userInfo = await getUser(uid);
      userAdmin = userInfo;

      if(userAdmin.isAdmin){
        location.href = "./createProduct.html";
      } else{
        location.href = "./index.html";
      }
    }

  });
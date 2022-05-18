import { db, auth } from "./app";
import { loginUser, registerUser, addUserToDatabase, onAuthStateChanged } from "../functions/auth";
import { getUser } from "./getUser";
import { signOut } from "firebase/auth";

const registerUserForm = document.getElementById("registerUserForm");
const loginUserForm = document.getElementById("loginUserForm");
const profileIcon = document.getElementById("profileIcon");
const divLogin = document.getElementById("loginDiv");
const divLogout = document.getElementById("logoutDiv");
const logoutLink = document.getElementById("logoutLink");

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


     //Change according to admin status
     onAuthStateChanged(auth, async (user) =>{
      if(user){
        const uid = user.uid;
        let userLogged = [];
        const firebaseUser = await getUser(uid);
        userLogged = firebaseUser;
        if(userLogged.isAdmin){
          location.href = "./createProduct.html";
        } else{
          location.href = "./index.html";
        }
      }
    });

  });
  }

if(loginUserForm != null){
    loginUserForm.addEventListener("submit", e =>{
      e.preventDefault();
      const email = loginUserForm.email.value;
      const password = loginUserForm.password.value;
    
      loginUser(auth, email, password);
      console.log("Entraste");

       //Change according to admin status
      onAuthStateChanged(auth, async (user) =>{
      if(user){
        const uid = user.uid;
        let userLogged = [];
        const firebaseUser = await getUser(uid);
        userLogged = firebaseUser;
        if(userLogged.isAdmin){
          location.href = "./createProduct.html";
        } else{
          location.href = "./index.html";
        }
      }
    });

    });
  }
  
logoutLink.addEventListener("click", e =>{
  signOut(auth).then(() => {
    location.href = "./index.html"
    console.log("Salimos");
  }).catch((error) => {
    console.log(error);
  });
});


onAuthStateChanged(auth, async (user) =>{
  if(user){
    userLogged = user;
    if(userLogged){
      divLogin.style.display = "none";
      divLogout.style.display = "flex";
    } else{
      console.log("NO LOG");
    }
  }
});



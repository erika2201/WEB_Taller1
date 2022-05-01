// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { registerUser } from "../src/scripts/auth";
import { loginUser } from "../src/scripts/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFiw5Sz_QQRkEugbvnZC255UdXnCmebDI",
  authDomain: "pines-lux.firebaseapp.com",
  projectId: "pines-lux",
  storageBucket: "pines-lux.appspot.com",
  messagingSenderId: "598642838534",
  appId: "1:598642838534:web:8edf18f7d5eb069f84c787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const registerUserForm = document.getElementById("registerUserForm");
const loginUserForm = document.getElementById("loginUserForm");


if(registerUserForm != null){
registerUserForm.addEventListener("submit", e =>{
  e.preventDefault();
  const name = registerUserForm.name.value;
  const lastname = registerUserForm.lastname.value;
  const email = registerUserForm.email.value;
  const password = registerUserForm.password.value;
  const newUser = {
    name,
    lastname,
    email,
    password
  }
  registerUser(auth, newUser);
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const registerUserForm = document.getElementById("registerUserForm");
const auth = getAuth();

registerUserForm.addEventListener("submit", e =>{
  e.preventDefault();

  const name = registerUserForm.name.value;
  const lastname = registerUserForm.lastname.value;
  const email = registerUserForm.email.value;
  const password = registerUserForm.password.value;
  registerUser(name, lastname, email, password);
});

async function registerUser(name, lastname, email, password){
  try {
    const { user } = await createUserWithEmailAndPassword(auth,email,password);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
}



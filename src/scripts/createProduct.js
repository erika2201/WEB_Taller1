// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../utils/firebase";

import { addProduct } from "../functions/addproducts";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //To get info from my collections

const createproductForm = document.getElementById("createProductForm");

createproductForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    console.log("Create a new product!!!");

    const image = createproductForm.image.files;
    const name = createproductForm.name.value;
    const description = createproductForm.description.value;
    const price = createproductForm.price.value;
    const category = createproductForm.category.value;
    
    const newProduct = {
        //image,
        name,
        description,
        price,
        category
    };

    //Add to database
    await addProduct(db, newProduct);

    console.log(newProduct);
});
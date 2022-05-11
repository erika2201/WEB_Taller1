// Import the functions you need from the SDKs you need
import { storage, db } from "./app";
import { addProduct, uploadImages } from "../functions/addproducts";


const createproductForm = document.getElementById("createProductForm");

createproductForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    console.log("Create a new product!!!");

    const image = createproductForm.image.files;
    const name = createproductForm.name.value;
    const description = createproductForm.description.value;
    const price = createproductForm.price.value;
    const category = createproductForm.category.value;
    
    let gallery = [];

    if(image.length){
        const uploadedImages = await uploadImages(storage, [...image]);

        gallery = await Promise.all(uploadedImages);
    }

    const newProduct = {
        image: gallery,
        name,
        description,
        price,
        category
    };

    //Add to database
    await addProduct(db, newProduct);
});
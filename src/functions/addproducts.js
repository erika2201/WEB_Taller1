import {addDoc, collection} from "firebase/firestore";

async function addProduct(db, product){
    try {
        await addDoc (collection (db, "products"), product);
    } catch (error) {
        console.log(error);
    }
}

export {
    addProduct,
}


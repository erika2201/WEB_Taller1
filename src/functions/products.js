import { collection, getDocs } from "firebase/firestore";


async function getProducts(db){
    const collectionref = collection(db,"products");
    try {
        const { docs } = await getDocs(collectionref);
        const products = docs.map((doc) =>{
            return{
                ...doc.data(),
                id: doc.id,
            };
        });    
            return products;
    } catch (error) {
        console.log(error);
    }
}

export{
    getProducts,
}
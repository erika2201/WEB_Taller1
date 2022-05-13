import { db } from "./app";
import { doc, getDoc } from "firebase/firestore";

const productInfoSection = document.getElementById("productInfo");
const productAssetsSection = document.getElementById("productAssets");

function getParam(param){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);

    return productId;
    //console.log(productId);
}


//Get database
async function getProduct(){
    const productId = getParam("id");
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const product = {
        ...data,
        id: productId,
    }

    renderProduct(product);

}

function renderProduct(product){
    productAssetsSection.innerHTML = `
    <div class="product__gallery flex">
        <img src="${product.image}" class="product__img"></img>
        <img src="${product.image}" class="product__img"></img>
        <img src="${product.image}" class="product__img"></img>
    </div>

    <img src="${product.image}" class="product__mainImg"></img>`

    productInfoSection.innerHTML = `
        <h1 class="product__name">${product.name}</h1>
        <p class="product__description">${product.description}</p>
        <p class="product__price">${product.price}</p>
        <button class="product__addCart">Añadir al carrito</button>`;
    console.log(product);
}


getProduct();
import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getMyCart } from "../utils";
import { getProduct } from "./getProduct";
import { getMyCart, addProductToCart } from "../utils";

import { getFirebaseCart } from "../functions/cart.js";

const productInfoSection = document.getElementById("productInfo");
const productAssetsSection = document.getElementById("productAssets");

let userLogged = undefined;
let cart = [];

function getParam(param){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);

    return productId;
    //console.log(productId);
}


//Get database
async function loadProduct(){
    const productId = getParam("id");

    const data = await getProduct(productId);

    const product = {
        ...data,
        id: productId,
    }

    renderProduct(product);

}

function renderProduct(product){
    productAssetsSection.innerHTML = `
    <img src="${product.image[0]}" class="product__mainImg" id="mainImg"></img>`;

    productInfoSection.innerHTML = `
        <h1 class="product__name">${product.name}</h1>
        <p class="product__description">${product.description}</p>
        <p class="product__price">${product.price}</p>
        <button class="product__addCart">Añadir al carrito</button>`;
    

        if(product.image.length > 1){
            createGallery(product.image);
        }

        //Add product with the button
        const productCartBtn = document.querySelector(".product__addCart");
        productCartBtn.addEventListener("click", e =>{
            cart.push(product);

            addProductToCart(cart);
        });

}

function createGallery(image){
    const mainImg = document.getElementById("mainImg");
    const gallery = document.createElement("div");
    gallery.className = "product__gallery";

    image.forEach(image => {
        gallery.innerHTML += `<img src="${image}" class="product__img"></img>`
    });

    productAssetsSection.appendChild(gallery);

    const galleryImages = document.querySelector(".product__gallery");

    galleryImages.addEventListener("click", e => {
        if(e.target.tagName === "IMG"){
            mainImg.setAttribute("src",e.target.currentSrc);
        }
    })
}

onAuthStateChanged(auth, async (user) =>{
    if(user){
        userLogged = user;
        cart = await getFirebaseCart (db, userLogged.uid);
    } else {
        cart = getMyCart();
    }

    loadProduct();
});

import { auth, db } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, createFirebaseCart } from "../functions/cart";
import { getMyLocalCart, currencyFormat } from "../utils/index";
import { addProductToCart } from "../utils";

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
let cart = [];

function loadCart(cart){
    let total = 0;
    cart.forEach(product =>{
        renderProduct(product);
        total += parseInt(product.price);
    });
    totalSection.innerHTML = currencyFormat(total);
    console.log(currencyFormat(total));
};


async function removeProduct(productId){
    //Cretae Array without a deleted product
    const newCart = cart.filter(product => 
        product.id !== productId);

        cart = newCart;

        if(userLogged){
            createFirebaseCart(db, userLogged.uid, newCart);
        }

        addProductToCart(newCart);
        cartSection.innerHTML = "";
        loadCart(newCart);
}

function renderProduct(product) {
    const productCart = document.createElement("li");
    productCart.className = "product flex";
    productCart.innerHTML = `
    <div class="product__imgAndName flex">
        <img src=${product.image[0]} class="product__img">
        <p class="product__name">${product.name}</p>
    </div>
    <p class="product_price">${currencyFormat(product.price)}</p>
    <div class="product__cantAndDelete">
        <p class="product__quant">Cantidad</p>
        <button class="product__delete">Eliminar</button>
    </div>
    <p class="product__total">Total</p>`

    cartSection.appendChild(productCart);
    
   /*  const productDelete = document.querySelector(".product__delete");
        productDelete.addEventListener("click", async (e) =>{
            console.log("remove");
        }); */

    productCart.addEventListener("click", e =>{
        if(e.target.tagName === "BUTTON"){
            console.log("remove");
            removeProduct(product.id);
        }
    });    
};

//Know if there is a userlogged
onAuthStateChanged(auth, async (user) =>{
    if(user){
        userLogged = user;
        console.log(user);
        cart = await getFirebaseCart(db, userLogged.uid);
    } else {
        cart = getMyLocalCart();
    }

    loadCart(cart);
});
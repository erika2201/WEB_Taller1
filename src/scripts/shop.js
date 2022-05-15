import {db} from "./app"; 
import { getProducts } from "../functions/products"; 
import { currencyFormat } from "../utils";

const productSection = document.getElementById("products");
const categoryFilter = document.getElementById("category");
const orderFilter = document.getElementById("order");

let products = [];

async function loadProducts(){
    const firebaseProducts =await getProducts(db);
    productSection.innerHTML = "";
    firebaseProducts.forEach(product =>{
        renderProducts(product);
    });

    products = firebaseProducts;
}


//Draw products from database
function renderProducts(item){
    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href", `./product.html?id=${item.id}`);

    const coverImage = item.image ? item.image [0] : "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";

    product.innerHTML = ` 
    <img src="${coverImage}" class="product__img">
    <div class="product__info">
        <p class="product__name">${item.name}</p>
        <p class="product__category">Categoria: ${item.category}</p>
        <p class="product__price">${currencyFormat(item.price)}</p>
    </div>`;

    productSection.appendChild(product);
}

function filterBy (){
    const newCategory = categoryFilter.value;
    const newOrder = orderFilter.value;
    let filteredProducts = [];

    if(newCategory !== ""){
        filteredProducts = products.filter((product) => product.category === newCategory);
    
    } else {
        filteredProducts = products;
    }

    if(newOrder === "asc"){
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    if(newOrder === "desc"){
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    productSection.innerHTML = "";
    filteredProducts.forEach(product =>{
        renderProducts(product);
    });
}

//Filter
categoryFilter.addEventListener("change", e =>{
    filterBy();
});

//Order
orderFilter.addEventListener("change", e =>{
    filterBy();
});


loadProducts();
import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProduct } from "./getProduct";
import { createFirebaseCart, getFirebaseCart } from "../functions/cart.js";
import { getMyLocalCart, addProductToCart, currencyFormat } from "../utils";

//3D //////////////////////////
import * as THREE from 'three';
//const scene = new THREE.Scene();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
///////////////////////////////

const productInfoSection = document.getElementById("productInfo");
const productAssetsSection = document.getElementById("productAssets");

let userLogged = undefined;
let cart = [];
render3d();

function render3d(){
    let scene, camera, renderer;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    scene.background = new THREE.Color(0xE5E5E5);
    
    camera.position.set(2, 2, 0);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    let hlight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);
    
    let directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);



try {
    const loader = new GLTFLoader();
    console.log(loader);
    loader.load('../../objects/Finn.gltf', function (gltf) {
        console.log(gltf);
        scene.add(gltf.scene)
    },
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	});
} catch (error) {
    console.log("codigosapoperrohpmalparidogonorreagrrrr"+error)
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
   
}

function getParam(param){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
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
        <p class="product__price">${currencyFormat(product.price)}</p>
        <button class="product__addCart">Añadir al carrito</button>`;
    

        if(product.image.length > 1){
            createGallery(product.image);
        }

        //Add product with the button
        const productCartBtn = document.querySelector(".product__addCart");
        productCartBtn.addEventListener("click", async (e) =>{
            console.log("añadir");
            //1.Save on cart
            cart.push(product);
            //2. Save on localStorage
             addProductToCart(cart);

            if(userLogged){
                await createFirebaseCart(db, userLogged.uid, cart);
            }
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

//Know if there is a userlogged
onAuthStateChanged(auth, async (user) =>{
    if(user){
        userLogged = user;
        console.log(user);
        cart = await getFirebaseCart(db, userLogged.uid);
        console.log(cart);
    } else {
        cart = getMyLocalCart();
    }

    loadProduct();
});


import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProduct } from "./getProduct";
import { createFirebaseCart, getFirebaseCart } from "../functions/cart.js";
import { getMyLocalCart, addProductToCart, currencyFormat } from "../utils";

//3D //////////////////////////
import * as THREE from 'three';
const scene = new THREE.Scene();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
///////////////////////////////

const productInfoSection = document.getElementById("productInfo");
const productAssetsSection = document.getElementById("productAssets");

let userLogged = undefined;
let cart = [];

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


/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();

/* renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "3d-dom";
renderer.domElement.classList.add("off"); */

document.getElementById("productAssets").appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});




//ADJUST CAMERA-ZOOM RESPONSIVENESS
if (window.innerWidth <= 767) {
  var Start = function () {
    camera.position.set(0, 0, 30);

    //  scene.background = new THREE.Color(0x88888);
  };

  // alert("This is a mobile device.");
} else {
  var Start = function () {
    camera.position.set(0, 0, 15);
  };

  // alert("This is a tablet or desktop.");
}

// const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
// cubeMesh.position.set(0,0,0)
// scene.add( cubeMesh );

var ambiantLight = new THREE.AmbientLight(0xffffff, 1);

scene.add(ambiantLight);
scene.background = new THREE.Color(0xffffff);

controls = new OrbitControls(camera, renderer.domElement);

loader = new GLTFLoader();
loader.load("model/ascis-nimbus-20/scene.gltf", function (gltf) {//este link tiene que cambiaarse por los de firebase
  gltf.scene.position.set(5, -15, 7);

  scene.add(gltf.scene);
});


//called once at the beginning of the game

let frame = 0;
var Update = function () {
  if (frame == 0) {
    Start();
    frame += 1;
  }
};

var Render = function () {
  renderer.render(scene, camera);
};

var GameLoop = function () {
  requestAnimationFrame(GameLoop);

  Update();
  Render();
};

GameLoop();

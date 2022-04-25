//Variable usuario
const user = { 
    name: "Laura Pedroza",
    email: "laurap@gmail.com",
    age: 20,
    gender: "female",
};

//Arreglo de objetos de productos
const products = [
    {
        name: "Disco huesos",
        price: 7500,
        id: 0,
        image: "./img/pindisk.png",
        quant: 5,
        description: "Pin metálico 2cm x 2cm",
    },

    {
        name: "Cola de ballena",
        price: 7500,
        id: 1,
        image: "./img/pinwhaletail.png",
        quant: 0,
        description: "Pin metálico 2cm x 1,5 cm",
    },

    {
        name: "Gatito hamburguesa",
        price: 7500,
        id: 2,
        image: "./img/pinburguercat.png",
        quant: 0,
        description: "Pin metálico 2cm x 1,5 cm",
    },

    {
        name: "Calavera grande rosas",
        price: 7500,
        id: 3,
        image: "./img/pinbigskullrose.png",
        quant: 10,
        description: "Pin metálico 2cm x 2cm",
    },

    {
        name: "Calavera pequeña rosas",
        price: 7500,
        image: "./img/pinsmallskullrose.png",
        id: 4,
        quant: 10,
        description: "Pin metálico 2cm x 1,5 cm",
    },
];

let divProducts = document.getElementById("products");

products.forEach(product => {
    //Desestructuraciòn
    const {name, price, image, id, quant, description} = product
   //Condicional
    if (quant > 0 && price >6000){
        console.log(product);
    }

//Contenedor de mis productos
    const productElement = document.createElement("div");
    productElement.innerHTML = `
        <img src="${image}">
        <p>${name}</p>
        <p>${description}</p>
        <p>${"$ " + price}</p>
        <a href="#">Añadir al carrito</a>
    `;

    divProducts.appendChild(productElement);

});

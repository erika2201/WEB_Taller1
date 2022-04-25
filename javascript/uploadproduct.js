const myForm = document.getElementById("myForm");
const submitButton = document.getElementById("submitButton");

const newProduct = [];


submitButton.addEventListener("click", e =>{
    e.preventDefault();

    if(myForm.name.value === "" || myForm.description.value === "" ||
       myForm.category.value === "" || myForm.quant.value === "" || 
       myForm.price.value === "" || myForm.image.value === ""){
        alert("Recuerda llenar todos los campos");
    }else{
        //Object
        let product = {
            name: myForm.name.value,
            descrption: myForm.description.value,
            category: myForm.category.value,
            quant: myForm.quant.value,
            price: myForm.price.value,
            image: myForm.image.value,
        }
        console.log(product);
       alert( myForm.name.value + " guardado con éxito");
    }

    const newProduct=[];
    newProduct.push(product);
    console.log("El nuevo producto es" + newProduct);
});
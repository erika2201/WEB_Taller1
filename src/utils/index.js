async function addProductToCart(cart){
    localStorage.setItem("cart", JSON.stringify("cart"));
};

function getMyCart(){
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : [];
}

export {
    addProductToCart,
    getMyCart
}

async function addProductToCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
};

function getMyLocalCart(){
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : [];
}

export {
    addProductToCart,
    getMyLocalCart
}

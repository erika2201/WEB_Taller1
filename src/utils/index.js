async function addProductToCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
};

function getMyLocalCart(){
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : [];
}

//Change to money format
function currencyFormat(price) {
    return new Intl.NumberFormat("es-CO", {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}


export {
    addProductToCart,
    getMyLocalCart,
    currencyFormat
}

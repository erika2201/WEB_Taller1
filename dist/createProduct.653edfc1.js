var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},a=e.parcelRequire2c23;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in o){var a=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,a.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequire2c23=a);var n=a("li1Mx"),r=a("etBjH"),i=a("aYguL");async function c(e,t=[]){return t.map((async t=>{const o=await async function(e,t){const o=i.ref(e,`products/images/${t.name}`);return await i.uploadBytes(o,t)}(e,t);return i.getDownloadURL(i.ref(e,o.ref.fullPath))}))}const l=document.getElementById("createProductForm");l.addEventListener("submit",(async e=>{e.preventDefault(),console.log("Create a new product!!!");const t=l.image.files,o=l.name.value,a=l.description.value,i=l.price.value,d=l.category.value;let s=[];if(t.length){const e=await c(n.storage,[...t]);s=await Promise.all(e)}const u={image:s,name:o,description:a,price:i,category:d};await async function(e,t){try{await r.addDoc(r.collection(e,"products"),t),console.log("Product added!!!"),alert("Producto "+t.name+" añadido")}catch(e){console.log(e)}}(n.db,u)}));
//# sourceMappingURL=createProduct.653edfc1.js.map

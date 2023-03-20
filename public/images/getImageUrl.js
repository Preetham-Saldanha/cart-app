async function getImageUrls(){
const data = await fetch("https://fakestoreapi.com/products").then(res => res.json())

const arr= data.map(product=>product.image)
console.log(arr)
}

getImageUrls()
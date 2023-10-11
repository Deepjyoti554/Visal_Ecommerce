// **********main UI***********
var productItem = localStorage.getItem('item') || []
if (!Array.isArray(productItem)) {
    productItem = []
}

var myArr = []
const getProducts = async () => {
    let products = document.querySelector('.products');
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();


    data.forEach((item) => {
        const cardElement = document.createElement('div');
        cardElement.innerHTML = `
        <div id="product_${item.id}" class="product card-body">
        <img class="image" class="card-img-top" src=${item.image} alt="">
            <p class="title card-title">${item.title}</p>
            <p class="description card-text">${item.description}</p>
            <p class="category card-text">${item.category}</p>
            <p class="price card-text">${item.price}</p>
            <p class="rate card-text">${item.rating.rate}</p>
            <button "type="button" class="btn" onclick=myFunc(${item.id})>Add to cart</button>
            <button "type="button" class="show_product" data-id="${item.id}">Show product</button>
        </div>
        `;

        if (products !== null)
            products.appendChild(cardElement);

        myArr.push(item)

    })
    var singleProducts = document.querySelectorAll(".show_product")
    singleProducts.forEach((button) => {
        const id = button.dataset.id;
        button.addEventListener('click', () => {
            // console.log("Iam clicked");
            window.location.href = `/product_view.html?id=${id}`
        })
    })
}
getProducts()
console.log(myArr);


if (window.location.pathname === '/product_view.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const product_item = document.querySelector(".full_product")
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(item => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <div id="product_view" class="card-body">
                    <img id="product_view_img" class="image" class="card-img-top" src=${item.image} alt="">
                    <p id="product_view_para" class="title card-title">${item.title}</p>
                    <p id="product_view_para" class="description card-text">${item.description}</p>
                    <p id="product_view_para" class="category card-text">${item.category}</p>
                    <p id="product_view_para" class="price card-text">${item.price}</p>
                    <p id="product_view_para" class="rate card-text">${item.rating.rate}</p>
                    <button id="product_view_button" type="button" class="btn btn-primary" onclick=myFunc(${item.id})>Add to cart</button>
                </div>
            `;
            if (product_item !== null)
                product_item.appendChild(productElement);
        })
}

function myFunc(id) {

    var cart = JSON.parse(localStorage.getItem("item"));
    if (cart != null && !cart.hasOwnProperty(id)) {
        cart[id] = 1;
    } else {
        cart = {};
        cart[id] = 1;
    }
    localStorage.setItem('item', JSON.stringify(cart));
}



// ************page***********
let result = 0;
const resultAmount = document.getElementById('result');

const amount = document.querySelector(".amount");
const amountElement = document.createElement('p');
if (window.location.pathname === '/page.html') {
    const temp = document.querySelector(".pages")
    var cart = JSON.parse(window.localStorage.getItem('item'));
    // console.log(cart);
    // console.log(localStorage.getItem('item'));
    // const newarr = (pageItem !== null && pageItem !== undefined) ? pageItem.split(',') : [];

    Object.keys(cart).forEach(async (key) => {


        // console.log(cart);
        // console.log(key);
        const response = await fetch(`https://fakestoreapi.com/products/${key}`);
        const data = await response.json();
        // console.log(data);
        const pageElement = document.createElement('div')
        pageElement.innerHTML = `
        <div class="card" style="width: 20rem; margin: 30px 20px; background-color: aliceblue;">
        <img style="height: 100px; width: 120px; " class="card-img-top" src=${data.image} alt="">
            <p class="card-title">${data.title}</p>
            <p class="card-text">${data.description}</p>
            <p class="card-text">${data.category}</p>
            <p class="card-text">${data.price}</p>
            <div class="quatity">
                <p class="card-text">Quantity: </p>
                <p id="cnt${data.id}">${cart[key]}</p>
                <button onclick=incrFun(${data.id}) class="btn">+</button>
                <button onclick=decrFun(${data.id}) class="btn">-</button>
            </div>
            <button onclick="myFunction(${data.id})" style="padding: 5px; border-radius: 3px; color: white; background-color: cadetblue;" class="btn">Remove</button>
        </div>
        </div>
        `;

        result += data.price * cart[data.id];
        // console.log(result);

        temp.appendChild(pageElement);
        resultAmount.textContent = result;
    })
}


function incrFun(id) {
    var cart = JSON.parse(localStorage.getItem("item"));
    if (cart[id] > 0) {
        cart[id] = cart[id] + 1;
        localStorage.setItem("item", JSON.stringify(cart));
        // console.log(cart);
        const cnt = document.getElementById(`cnt${id}`);
        cnt.innerText = cart[id];
    }
    for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].id == id) {
            result += myArr[i].price  * cart[id];
        }
    }
    resultAmount.textContent = result;
}
console.log(result);


function decrFun(id) {
    var cart = JSON.parse(localStorage.getItem("item"));
    if (cart[id] > 0) {
        cart[id] = cart[id] - 1;
        localStorage.setItem("item", JSON.stringify(cart));
        // console.log(cart);
        const cnt = document.getElementById(`cnt${id}`);
        cnt.innerText = cart[id];
    }
    for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].id == id) {
            result += myArr[i].price * cart[id];
        }
    }
    resultAmount.textContent = result.toFixed(2);
}
console.log(result);

var button = document.querySelector(".btn")

function myFunction(value) {
    const items = JSON.parse(localStorage.getItem('item'));
    delete items[value]

    localStorage.setItem('item', JSON.stringify(items));
    location.reload();
}

// const hamBurger = document.querySelector('.ham-burger');
// const menuList = document.querySelector('.lists');

// hamBurger.addEventListener('click', () => {
//   menuList.classList.toggle('open');
// });

var form = document.querySelector("#form_submit")

form.addEventListener("click", function(){
    alert("Your payment successful")
})
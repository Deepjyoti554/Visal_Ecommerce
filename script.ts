// const getProducts = async() => {
//     let products = document.querySelector('.products')
//     const response = await fetch('https://fakestoreapi.com/products');
//     const data = await response.json();


//     data.forEach((item) => {
//         const cardElement = document.createElement('div');
//         cardElement.innerHTML = `
//         <div class="product">
//             <img class="image" src=${item.image} alt="">
//             <p class="title">${item.title}</p>
//             <p class="description">${item.description}</p>
//             <p class="category">${item.category}</p>
//             <p class="price">${item.price}</p>
//             <p class="rate">${item.rating.rate}</p>
//         </div>
//         `;

//         // cardElement.innerHTML = card;

//         products.appendChild(cardElement);
//     })
// }

// getProducts();
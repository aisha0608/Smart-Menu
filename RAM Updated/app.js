document.addEventListener("DOMContentLoaded", () => {
    const openShopping = document.querySelector(".shopping");
    const closeShopping = document.querySelector(".closeShopping");
    const list = document.querySelector(".list");
    const listCard = document.querySelector(".listCard");
    const body = document.body;
    const total = document.querySelector(".total");
    const quantity = document.querySelector(".quantity");
    const searchBar = document.querySelector("#searchBar");
    const searchBtn = document.querySelector("#searchBtn");

    openShopping.addEventListener("click", () => {
        body.classList.add("active");
    });

    closeShopping.addEventListener("click", () => {
        body.classList.remove("active");
    });

    const products = [
        { id: 1, name: "Chicken Biryani", image: "1.png", price: 240 },
        { id: 2, name: "Mutton Biryani", image: "2.png", price: 290 },
        { id: 3, name: "Fish Biryani", image: "3.png", price: 265 },
        { id: 4, name: "Veg Biryani", image: "4.png", price: 220 },
        { id: 5, name: "Chicken Shawarma", image: "5.png", price: 150 },
        { id: 6, name: "Mutton Shawarma", image: "6.png", price: 200 },
        { id: 7, name: "Falafel Wrap", image: "7.png", price: 130 },
        { id: 8, name: "Veg Salad", image: "8.png", price: 120 },
        { id: 9, name: "Chicken Salad", image: "9.png", price: 160 }
    ];

    let cartItems = [];

    function initializeApp() {
        products.forEach((product, index) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("item");
            productDiv.innerHTML = `
                <img src="image/${product.image}" alt="${product.name}">
                <div class="title">${product.name}</div>
                <div class="description">Lorem ipsum dolor sit amet.</div>
                <div class="price">${product.price.toLocaleString()}</div>
                <button data-index="${index}">Add to Cart</button>`;
            list.appendChild(productDiv);
        });
    }

    list.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const index = parseInt(e.target.getAttribute("data-index"), 10);
            addToCart(products[index]);
        }
    });

    listCard.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"), 10);
        const action = e.target.getAttribute("data-action");

        if (action === "decrease") {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1);
            }
        } else if (action === "increase") {
            cartItems[index].quantity++;
        }

        updateCart();
    });

    function addToCart(product) {
        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        listCard.innerHTML = "";
        let totalQuantity = 0;
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItemDiv = document.createElement("li");
            cartItemDiv.innerHTML = `
                <div><img src="image/${item.image}" alt="${item.name}"></div>
                <div class="details">
                    <div class="name">${item.name}</div>
                    <div class="price">${item.price.toLocaleString()}</div>
                </div>
                <div class="quantity-controls">
                    <button data-index="${index}" data-action="decrease">-</button>
                    <div class="count">${item.quantity}</div>
                    <button data-index="${index}" data-action="increase">+</button>
                </div>`;
            listCard.appendChild(cartItemDiv);
        });

        total.innerText = `₹${totalPrice.toLocaleString()}`;
        quantity.innerText = totalQuantity;
    }

    initializeApp();
});

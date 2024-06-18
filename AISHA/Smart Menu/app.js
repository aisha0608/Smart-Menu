document.addEventListener("DOMContentLoaded", () => {
    const openShopping = document.querySelector(".shopping");
    const closeShopping = document.querySelector(".closeShopping");
    const list = document.querySelector(".list");
    const listCard = document.querySelector(".listCard");
    const body = document.body;
    const total = document.querySelector(".total");
    const quantity = document.querySelector(".quantity");
    const searchBar = document.querySelector("#searchBar");
    const searchBtn = document.querySelector(".searchBtn");
  
    openShopping.addEventListener("click", () => {
      body.classList.add("active");
    });
  
    closeShopping.addEventListener("click", () => {
      body.classList.remove("active");
    });
  
    const products = [
      {
        id: 1,
        name: "Chicken Shawarma Bowl",
        image: "1.PNG",
        price: 300,
        description: "A delightful mix of spiced chicken shawarma, fresh cucumber salad, and creamy hummus.",
      },
      {
        id: 2,
        name: "Grilled Chicken with Sweet Chili",
        image: "2.PNG",
        price: 350,
        description: "Juicy grilled chicken pieces paired with a tangy and sweet chili dipping sauce.",
      },
      {
        id: 3,
        name: "Grilled Salmon Salad",
        image: "3.PNG",
        price: 400,
        description: "A vibrant salad with grilled salmon fillet atop a bed of mixed greens and cherry tomatoes.",
      },
      {
        id: 4,
        name: "Creamy Pumpkin Soup",
        image: "4.PNG",
        price: 200,
        description: "A warm bowl of creamy pumpkin soup, garnished with pumpkin seeds and feta cheese.",
      },
      {
        id: 5,
        name: "Fresh Garden Salad",
        image: "5.PNG",
        price: 200,
        description: "A refreshing garden salad with a mix of fresh greens, cherry tomatoes, and cucumber slices.",
      },
      {
        id: 6,
        name: "Margherita Pizza",
        image: "6.PNG",
        price: 500,
        description: "Classic Margherita pizza with a crispy crust, topped with tomato sauce, mozzarella, and basil.",
      },
    ];
  
    const cartItems = [];
  
    function initializeApp() {
      renderProducts(products);
  
      list.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
          const index = e.target.dataset.index;
          addToCart(index);
        }
      });
  
      listCard.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
          const index = e.target.dataset.index;
          const action = e.target.dataset.action;
          updateCartQuantity(index, action);
        }
      });
  
      searchBtn.addEventListener("click", searchMenu);
      searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchMenu();
        }
      });
    }
  
    function renderProducts(productsToRender) {
      list.innerHTML = "";
      productsToRender.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("item");
        productDiv.innerHTML = `
          <img src="image/${product.image}" alt="${product.name}">
          <div class="title">${product.name}</div>
          <div class="description">${product.description}</div>
          <div class="price">${product.price.toLocaleString()}</div>
          <button data-index="${index}">Add To Cart</button>`;
        list.appendChild(productDiv);
      });
    }
  
    function addToCart(index) {
      const product = products[index];
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }
      updateCart();
    }
  
    function updateCartQuantity(index, action) {
      const cartItem = cartItems[index];
      if (action === "decrease") {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          cartItems.splice(index, 1);
        }
      } else {
        cartItem.quantity += 1;
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
          <div>${item.name}</div>
          <div>${item.price.toLocaleString()}</div>
          <div>
            <button data-index="${index}" data-action="decrease">-</button>
            <div class="count">${item.quantity}</div>
            <button data-index="${index}" data-action="increase">+</button>
          </div>`;
        listCard.appendChild(cartItemDiv);
      });
  
      total.innerText = totalPrice.toLocaleString();
      quantity.innerText = totalQuantity;
    }
  
    function searchMenu() {
      const searchTerm = searchBar.value.toLowerCase();
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
      renderProducts(filteredProducts);
    }
  
    initializeApp();
  });
  

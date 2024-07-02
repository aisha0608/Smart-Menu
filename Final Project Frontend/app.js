document.addEventListener("DOMContentLoaded", () => {
  const openShopping = document.querySelector(".shopping");
  const closeShopping = document.querySelector(".closeShopping");
  const list = document.querySelector(".list");
  const listCard = document.querySelector(".listCard");
  const body = document.body;
  const total = document.querySelector(".total");
  const quantity = document.querySelector(".quantity");

  openShopping.addEventListener("click", () => {
    body.classList.add("active");
  });

  closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
  });

  const products = [
    {
      id: 1,
      name: "Chicken Biryani",
      image: "1.png",
      price: 240,
      description:
        "Aromatic basmati rice with tender chicken, infused with exotic spices.",
      category: "Biryani",
    },
    {
      id: 2,
      name: "Mutton Biryani",
      image: "2.png",
      price: 350,
      description:
        "Succulent pieces of mutton cooked to perfection in flavorful basmati rice.",
      category: "Biryani",
    },
    {
      id: 3,
      name: "Fish Biryani",
      image: "3.png",
      price: 265,
      description: "Delicate fish fillets layered with fragrant spiced rice.",
      category: "Biryani",
    },
    {
      id: 4,
      name: "Veg Biryani",
      image: "4.png",
      price: 220,
      description:
        "A vibrant mix of vegetables and basmati rice, rich in spices and herbs.",
      category: "Biryani",
    },
    {
      id: 5,
      name: "Chicken Shawarma",
      image: "5.png",
      price: 150,
      description:
        "Juicy chicken strips wrapped in soft pita with fresh veggies and tahini sauce.",
      category: "Shawarma",
    },
    {
      id: 6,
      name: "Margherita Pizza",
      image: "6.png",
      price: 200,
      description:
        "Classic Margherita Pizza with a crispy thin crust, topped with fresh mozzarella, basil, and a rich tomato sauce.",
      category: "Pizza",
    },
    {
      id: 7,
      name: "Falafel",
      image: "7.png",
      price: 130,
      description:
        "Golden-brown falafel balls, crispy on the outside and tender on the inside, served with a side of creamy tahini sauce.",
      category: "Appetizer",
    },
    {
      id: 8,
      name: "Veg Salad",
      image: "8.png",
      price: 120,
      description:
        "A refreshing medley of fresh vegetables, tossed in a light vinaigrette.",
      category: "Salad",
    },
    {
      id: 9,
      name: "Chicken Salad",
      image: "9.png",
      price: 160,
      description:
        "Tender chicken breast mixed with crisp greens and a zesty dressing.",
      category: "Salad",
    },
    {
      id: 10,
      name: "Paneer Tikka",
      image: "10.png",
      price: 180,
      description:
        "Grilled paneer cubes marinated in aromatic spices, served hot.",
      category: "Appetizer",
    },
    {
      id: 11,
      name: "Butter Chicken",
      image: "11.png",
      price: 350,
      description:
        "Tender chicken in a rich, creamy tomato sauce with a hint of butter.",
      category: "Main Course",
    },
    {
      id: 12,
      name: "Dal Makhani",
      image: "12.png",
      price: 150,
      description: "Slow-cooked black lentils in a creamy, spiced sauce.",
      category: "Main Course",
    },
    {
      id: 13,
      name: "Garlic Naan",
      image: "13.png",
      price: 40,
      description: "Soft, buttery naan bread infused with fresh garlic.",
      category: "Bread",
    },
    {
      id: 14,
      name: "Tandoori Roti",
      image: "14.png",
      price: 30,
      description: "Whole wheat flatbread baked in a traditional clay oven.",
      category: "Bread",
    },
    {
      id: 15,
      name: "Lemonade",
      image: "15.png",
      price: 50,
      description: "Refreshing lemon beverage, perfect for a hot day.",
      category: "Drink",
    },
    {
      id: 16,
      name: "Mango Lassi",
      image: "16.png",
      price: 60,
      description: "Creamy yogurt drink blended with sweet mango pulp.",
      category: "Drink",
    },
    {
      id: 17,
      name: "Gulab Jamun",
      image: "17.png",
      price: 90,
      description: "Soft, syrup-soaked dumplings, a delightful Indian dessert.",
      category: "Dessert",
    },
    {
      id: 18,
      name: "Pasta Primavera",
      image: "18.png",
      price: 200,
      description:
        " Al dente pasta with seasonal veggies in a light, savory sauce—a fresh and flavorful delight.",
      category: "Pasta",
    },
  ];

  let cartItems = [];

  function initializeApp() {
    products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("item");
      productDiv.innerHTML = `
                <img src="image/${product.image}" alt="${product.name}">
                <div class="title">${product.name}</div>
                <div class="description">${product.description}</div>
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
    const existingProduct = cartItems.find((item) => item.id === product.id);

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

  const filterButton = document.querySelector(
    "button[onclick='filterProducts()']"
  );
  filterButton.addEventListener("click", filterProducts);

  function filterProducts() {
    const category = document.getElementById("category").value;
    const vegan = document.getElementById("vegan").checked;
    const glutenFree = document.getElementById("gluten-free").checked;
    const vegetarian = document.getElementById("vegetarian").checked;
    const priceRangeInput = document.querySelector(
      'input[name="price"]:checked'
    );
    let priceRange;

    if (priceRangeInput) {
      priceRange = priceRangeInput.value;
    }

    let filteredProducts = products;

    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (vegan) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes("vegan")
      );
    }

    if (glutenFree) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes("gluten-free")
      );
    }

    if (vegetarian) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes("vegetarian")
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    list.innerHTML = "";
    filteredProducts.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("item");
      productDiv.innerHTML = `
            <img src="image/${product.image}" alt="${product.name}">
            <div class="title">${product.name}</div>
            <div class="description">${product.description}</div>
            <div class="price">${product.price.toLocaleString()}</div>
            <button data-index="${index}">Add to Cart</button>`;
      list.appendChild(productDiv);
    });
  }
  initializeApp();
});

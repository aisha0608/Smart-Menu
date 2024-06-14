let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Chicken Shawarma Bowl',
        image: '1.PNG',
        price: 300,
        description: 'A delightful mix of spiced chicken shawarma, fresh cucumber salad, and creamy hummus.'
    },
    {
        id: 2,
        name: 'Grilled Chicken with Sweet Chili Sauce',
        image: '2.PNG',
        price: 350,
        description: 'Juicy grilled chicken pieces paired with a tangy and sweet chili dipping sauce.'
    },
    {
        id: 3,
        name: 'Grilled Salmon Salad',
        image: '3.PNG',
        price: 400,
        description: 'A vibrant salad with grilled salmon fillet atop a bed of mixed greens and cherry tomatoes.'
    },
    {
        id: 4,
        name: 'Creamy Pumpkin Soup',
        image: '4.PNG',
        price: 200,
        description: 'A warm bowl of creamy pumpkin soup, garnished with pumpkin seeds and feta cheese.'
    },
    {
        id: 5,
        name: 'Fresh Garden Salad',
        image: '5.PNG',
        price: 200,
        description: 'A refreshing garden salad with a mix of fresh greens, cherry tomatoes, and cucumber slices.'
    },
    {
        id: 6,
        name: 'Margherita Pizza',
        image: '6.PNG',
        price: 500,
        description: 'Classic Margherita pizza with a crispy crust, topped with tomato sauce, mozzarella, and basil.'
    }
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="description">${value.description}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

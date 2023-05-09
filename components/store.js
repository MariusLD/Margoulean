let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Discovery Pack Margoulean Sample',
        image: '1.png',
        price: '$20'
    },
    {
        id: 2,
        name: 'Bundle All-in-One',
        image: '2.png',
        price: '$20'
    },
    {
        id: 3,
        name: 'Bundle Soft Party',
        image: '3.png',
        price: '$20'
    },
    {
        id: 4,
        name: 'Bundle Party Hard',
        image: '4.png',
        price: '$20'
    },
    {
        id: 5,
        name: 'Share with Friends Pack',
        image: '5.png',
        price: '$20'
    },
    {
        id: 6,
        name: 'Share with Family Pack',
        image: '6.png',
        price: '$20'
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        console.log(`./ressources/${value.image}`)
        newDiv.innerHTML = `
            <img src="./ressources/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity = listCards[key].quantity + 1;
        listCards[key].price = listCards[key].price + products[key].price;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="./ressources/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                
                const buttons = newDiv.querySelectorAll('button');

                // Change - button
                buttons[0].style.cssText = 'width: 30px; height: 30px; border-radius: 50%; background-color: #fff; font-size: 20px;';

                // Change + button
                buttons[1].style.cssText = 'width: 30px; height: 30px; border-radius: 50%; background-color: #fff; font-size: 20px;';



                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
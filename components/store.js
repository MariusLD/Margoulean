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
        image: '3.png',
        price: 20,
        productDescription : 'Embark on a tantalizing journey of flavors with our Discovery Pack Margoulean Sample. This pack is perfect for those seeking a delightful introduction to our soft purple drank.',
        stars : 4.5,
        feddbacks : 857
    },
    {
        id: 2,
        name: 'Single Can',
        image: '2.png',
        price: 9,
        productDescription : 'For a quick and refreshing escape, our Single Can of Margoulean is your ideal companion. Take a sip! Let the velvety texture and enchanting flavors captivate your senses.',
        stars : 3.5,
        feddbacks : 492
    },
    {
        id: 3,
        name: 'Bundle All-in-one',
        image: '3.png',
        price: 40,
        productDescription : 'Unlock the full Margoulean experience with our Bundle All-in-one pack. This thoughtfully curated collection combines the finest flavors of Margoulean in a comprehensive package.',
        stars : 5,
        feddbacks : 349
    },
    {
        id: 4,
        name: 'Combo Pack',
        image: '4.png',
        price: 20,
        productDescription : 'Looking to satisfy your Margoulean cravings while discovering new favorites? Our Combo Pack is the ultimate choice. Elements carefully chosen to complement each other and provide an unforgettable tasting experience.',
        stars : 4,
        feddbacks : 228
    },
    {
        id: 5,
        name: 'Share with Friends Pack',
        image: '5.png',
        price: 13,
        productDescription : 'Spread the joy of Margoulean with our Share with Friends Pack. This pack is designed for those delightful moments when you want to indulge in soft purple bliss with your loved ones.',
        stars : 4.5,
        feddbacks : 100
    },
    {
        id: 6,
        name: 'Soft Drink Pack',
        image: '6.png',
        price: 7,
        productDescription : 'Quench your thirst with our Soft Drink Pack, exclusively featuring Margoulean. This pack offers a refreshing double cup of our beloved soft purple drink, perfect for those seeking a non-alcoholic and irresistibly delicious beverage.',
        stars : 3.5,
        feddbacks : 303
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="./ressources/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
        // Create a new function for each key using a closure
        newDiv.querySelector('.title').onclick = function() {
            focusOnCard(key, value.productDescription, value.stars, value.feddbacks);
        };
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
                <div>$${value.price.toLocaleString()}</div>
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
    total.innerText = '$' + totalPrice.toLocaleString();
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

function focusOnCard(key, productDescription, stars, feedbacks) {
    let card = document.querySelectorAll('.item')[key];
    let title = card.querySelector('.title');
    let image = card.querySelector('img');
    let productPrice = card.querySelector('.price').textContent;
    // Create a preview of the product
    let preview = document.createElement('div');
    preview.classList.add('products-preview');
    preview.innerHTML = `
        <div class="preview">
            <div class="preview-title">${title.textContent}</div>
            <div class="preview-image"><img src="${image.src}"></div>
            <div class="preview-price">${productPrice}</div>
            <div class="preview-description">${productDescription}</div>
            <div class="preview-stars"></div>
            <i class="fa-sharp fa-solid fa-circle-xmark fa-bounce fa-fw close-btn" onclick="closePreview()"></i>
        </div>
        `;
    //Show number of stars "<i class="fas fa-star"></i>" with a loop and besides the number of feedbacks
    let starsHtml = '';
    for(let i = 0; i < Math.floor(stars); i++){
        starsHtml += '<i class="fa-solid fa-star fa-beat-fade" style="color: #edc707;"></i>';
    }
    // Check if the number of stars is not an integer
    if(stars % 1 != 0){
        starsHtml += '<i class="fa-solid fa-star-half fa-beat-fade" style="color: #edc707;"></i>';
    }
    preview.querySelector('.preview-stars').innerHTML = `${starsHtml} (${feedbacks})`;

    // Add the preview to the DOM
    document.body.appendChild(preview);
    // Add a class to the body to hide the scroll bar
    document.body.classList.add('no-scroll');

    // Change the style of the preview
    preview.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; flex-direction: column; justify-content: center; align-items: center; color: #000; font-size: 20px;';
    let closeBtn = preview.querySelector('.close-btn');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '30';
    closeBtn.style.right = '30';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#d31d1d';
    closeBtn.style.fontSize = '2rem';
}
function closePreview() {
    // Remove the preview from the DOM
    document.querySelector('.products-preview').remove();
    // Remove the class from the body to show the scroll bar
    document.body.classList.remove('no-scroll');
}
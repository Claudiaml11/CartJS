// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
};

//Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active');
};

//Cart working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

//Making Function
function ready(){
    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]     
        button.addEventListener('click', removeCartItem)
    }
    //Quantity changes
    var quantitysInputs = document.getElementsByClassName('card-quantity')
    for (var i = 0; i < quantitysInputs.length; i++){
        var input = quantitysInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //Add to cart 
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    //Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

//Buy Button
function buyButtonClicked(){
    alert('Your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal()
}

//Add items to cart
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('prices')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg)

    updateTotal()
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('card-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName('card-product-title')
    for (var i = 0; i <cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already add this product to the cart')
            return;
        }
    }

    var cartBoxContent = `<img src="${productImg}" alt="" class="card-img">
    <div class="detail-box">
        <div class="card-product-title">${title}</div>
        <div class="card-price">${price}</div>
        <input type="number" value="1" class="card-quantity">
    </div>
    <!-- Remove cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('card-quantity')[0].addEventListener('change', quantityChanged)
}


//Remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

//Quantity Changed
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

//Update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('card-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('card-price')[0]
        var quantityElement = cartBox.getElementsByClassName('card-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    //If price contain some cents in value
    total = Math.round(total * 100) /100

    document.getElementsByClassName('total-price')[0].innerText = '$' + total
    
}
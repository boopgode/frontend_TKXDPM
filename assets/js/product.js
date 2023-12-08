const listProduct = [
    {
        id: 1,
        name: 'Readable content DX22',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/1.webp',
        price: '210.00',

    },
    {
        id: 2,
        name: 'Modern Eye Brush',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/2.webp',
        price: '210.00',

    },
    {
        id: 3,
        name: 'Voyage face cleaner',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/3.webp',
        price: '210.00',

    },
    {
        id: 4,
        name: 'Impulse Duffle',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/4.webp',
        price: '210.00',

    },
    {
        id: 5,
        name: 'Sprite Yoga Straps1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/5.webp',
        price: '210.00',

    },
    {
        id: 6,
        name: 'Fusion facial cream',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/6.webp',
        price: '210.00',

    },
    {
        id: 7,
        name: 'Readable content DX22',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/7.webp',
        price: '210.00',

    },
    {
        id: 8,
        name: 'Voyage face cleaner',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/8.webp',
        price: '210.00',

    },
    {
        id: 9,
        name: 'Impulse Duffle',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'assets/images/shop/9.webp',
        price: '210.00',

    },
    
]

class CartItem{
    constructor(name, img, price){
        this.name = name
        this.img=img
        this.price = price
        this.quantity = 1
   }
}

class LocalCart{
    static key = "cartItems"

    static getLocalCartItems(){
        let cartMap = new Map()
     const cart = localStorage.getItem(LocalCart.key)   
     if(cart===null || cart.length===0)  return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item) {
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1 
            cart.set(id, mapItem)
        }
        else
        cart.set(id, item)
       localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
        
    }

    static removeItemFromCart(id){
    let cart = LocalCart.getLocalCartItems()
    if(cart.has(id)){
        let mapItem = cart.get(id)
        if(mapItem.quantity>1)
       {
        mapItem.quantity -=1
        cart.set(id, mapItem)
       }
       else
       cart.delete(id)
    } 
    if (cart.length===0)
    localStorage.clear()
    else
    localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

const res = listProduct.find((item) => item.id == productId);


const myFunction = () => {
    const item = new CartItem(res.name, res.img, res.price, 1)
    LocalCart.addItemToLocalCart(res.id, item)
}

const detailProduct = document.querySelector('.product-details');
// const items = LocalCart.getLocalCartItems();
// const i = document.getElementsByClassName('number-product-count');
// i[0].innerHTML = items.size

const item = document.createElement('div');
item.classList.add('row')

item.innerHTML = 
`
<div class="col-lg-6">
<div class="product-details-thumb">
    <img src="${res.img}" width="570" height="693" alt="Image">
    <span class="flag-new">new</span>
</div>
</div>
<div class="col-lg-6">
<div class="product-details-content">
    <h5 class="product-details-collection">Premioum collection</h5>
    <h3 class="product-details-title">${res.name}</h3>
    <div class="product-details-review">
        <div class="product-review-icon">
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-half-o"></i>
        </div>
        <button type="button" class="product-review-show">150 reviews</button>
    </div>
    <div class="product-details-qty-list">
        <div class="qty-list-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="qtyList1" checked="">
            <label class="form-check-label" for="qtyList1">15 ml bottol <b>$${res.price}</b></label>
        </div>

        <div class="qty-list-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="qtyList2">
            <label class="form-check-label" for="qtyList2">25 ml bottol <b>$350.00</b> <span class="extra-offer">extra 25%</span></label>
        </div>
    </div>
    <div class="product-details-pro-qty">
        <div class="pro-qty">
            <input type="text" title="Quantity" class="quantity-number" disabled value="01">
        </div>
    </div>
    <div class="product-details-shipping-cost">
        <input class="form-check-input" type="checkbox" value="" id="ShippingCost" checked="">
        <label class="form-check-label" for="ShippingCost">Shipping from USA, Shipping Fees $4.22</label>
    </div>
    <div class="product-details-action">
        <h4 class="price">$${res.price}</h4>
        <div class="product-details-cart-wishlist">
            <button type="button" class="btn-wishlist" data-bs-toggle="modal" data-bs-target="#action-WishlistModal"><i class="fa fa-heart-o"></i></button>
            <button type="button" class="btn btn-add-ok" onclick="myFunction()" data-bs-toggle="modal" data-bs-target="#action-CartAddModal">Add to cart</button>
        </div>
    </div>
</div>
</div>

`
detailProduct.append(item)


function updateCartUI(){
    const cartWrapper = document.querySelector('.aside-cart-product-list')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('li')
        cartItem.classList.add('aside-product-list-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
            `
            <a href="product-details.html">
            <img src="${value.img}" width="68" height="84" alt="Image">
            <span class="product-title">${value.name}</span>
            </a>
            <span class="product-price">${value.quantity}</span> -
            <span class="product-price">${price}$</span>
            <a href="#/" class="remove">×</a>
            `
       cartItem.lastElementChild.addEventListener('click', ()=>{
           LocalCart.removeItemFromCart(key)
           const subtotal = document.querySelector('.amount')
           subtotal.innerHTML = `SubTotal: $${0}`
       })
        cartWrapper.append(cartItem)
    }

    if (count > 0) {
        const subtotal = document.querySelector('.order-total .amount')
        subtotal.innerHTML = `${total}`
    } else {
        subtotal.innerHTML = `$0`
    }

    const i = document.getElementsByClassName('number-product-count');
i[0].innerHTML = items.size
}

updateCartUI()
// const s = document.createElement("script");
// s.type = "text/javascript";
// s.src = "assets/js/main.js";
// $("head").append(s);
  
// const observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//       if (mutation.addedNodes.length > 0) {
//         const quantity = document.querySelector("pro-qty");
//             // console.log('====================================');
//             console.log(quantity);
//       }
//     });
//   });
//   observer.observe(document.getElementById("product-details"), { childList: true });



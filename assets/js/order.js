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



function updateCartUI() {
    const cartWrapper = document.querySelector('.table-order-place')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('tr')
        cartItem.classList.add('tbody-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
            `
            <td class="product-remove" style="cursor:pointer;">
            x
        </td>
        <td class="product-thumbnail">
            <div class="thumb">
                <a href="single-product.html">
                    <img src="${value.img}" width="68" height="84" alt="Image-HasTech">
                </a>
            </div>
        </td>
        <td class="product-name">
            <a class="title" href="single-product.html?id=${value.id}">${value.name}</a>
        </td>
        <td class="product-price">
            <span class="price">$${value.price}</span>
        </td>
        <td class="product-quantity">
            <div class="pro-qty">
                <input type="text" class="quantity" disabled title="Quantity" value="${value.quantity}">
            </div>
        </td>
        <td class="product-subtotal">
            <span class="price">$${Number(value.price) * Number(value.quantity)}</span>
        </td>
            `
        
       cartItem.firstElementChild.addEventListener('click', ()=>{
           LocalCart.removeItemFromCart(key)
           
        const i = document.getElementsByClassName('number-product-count');
        i[0].innerHTML = items.size
       })
        cartWrapper.append(cartItem)
    }

    if (count > 0) {
        const subtotal = document.querySelector('.amount')
        subtotal.innerHTML = `SubTotal: $${total}`
    } else {
        subtotal.innerHTML = `SubTotal: $0`
    }

    const i = document.getElementsByClassName('number-product-count');
    i[0].innerHTML = items.size
}

function UiCart(){
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
           
        const i = document.getElementsByClassName('number-product-count');
        i[0].innerHTML = items.size
       })
        cartWrapper.append(cartItem)
    }

    if (count > 0) {
        const subtotal = document.querySelector('.amount-total')
        subtotal.innerHTML = `SubTotal: $${total}`
    } else {
        subtotal.innerHTML = `SubTotal: $0`
    }

}


UiCart()
updateCartUI()

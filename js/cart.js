let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  console.log();  //0 is used to inform to start the calculation from 0
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      let {img, name, price} = search;  //Destructuring an Object
      return `
           <div class="cart-item">
             <img width="100" src=${img} alt="" />
             <div class="details">
               <div class="title-price-x">
                 <h4 class="title-price">
                   <p>${name}</p>
                   <p class="cart-item-price">Rs. ${price}</p>
                 </h4>
                 <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
               </div>
               <div class="buttons">
               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
               <div id=${id} class="quantity">${item}</div>
               <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
           </div>
           <h3>Rs. ${item * search.price}</h3>
               </div>
             </div>
           </div>
          `
    }).join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
     <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItem();

let increment = (id) => {
  let selectedItems = id;

  let search = basket.find((x) => x.id === selectedItems.id);

  if (search === undefined) {
    basket.push({
      id: selectedItems.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }


  generateCartItem();
  update(selectedItems.id);

  localStorage.setItem("data", JSON.stringify(basket));  //To store the data in local storage which stores the data in basket even when the browser is refreshed.
};

let decrement = (id) => {
  let selectedItems = id;

  let search = basket.find((x) => x.id === selectedItems.id);

  if (search === undefined) return; //To stop console error when we click minus when there are 0 items in basket

  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItems.id);

  basket = basket.filter((x) => x.item !== 0);

  generateCartItem();

  localStorage.setItem("data", JSON.stringify(basket)); //To store the data in local storage which stores the data in basket even when the browser is refreshed.
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItems = id;
  // console.log(selectedItems.id);
  basket = basket.filter((x) => x.id !== selectedItems.id);
  generateCartItem();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { item, id } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0);
    label.innerHTML = `
     <h2>Total Bill: Rs. ${amount}</h2>
     <button class="checkout">Checkout</button>
     <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `
  } else return;
};

totalAmount();
let shop = document.getElementById("shop");

//function name(params){}  //Regular Function


let basket = JSON.parse(localStorage.getItem("data")) || [];  //|| - OR statement, [] empty array is used if there is no data ,To retrieve data from local storage so that the basket values remain the same same even when the browser is refreshed

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x; //To prevent us of ${x.name} below 

        let search = basket.find((x) => x.id === id) || [];

        return `<div id=product-id-${id} class="item">
        <img src=${img} width="220" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="priceQuantity">
                <h2>Rs. ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`
    })
        .join(""));  //.join("") will remove extra commas coming //Back ticks used to Template Literals, shop.innerHTML is used to show where we will show the items in webpage
};     //ES6 Arrow function  //Defining function here

generateShop();  //Invoking function here

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


    // console.log(basket);
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

    // console.log(basket);

    localStorage.setItem("data", JSON.stringify(basket)); //To store the data in local storage which stores the data in basket even when the browser is refreshed.
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    console.log();  //0 is used to inform to start the calculation from 0
};

calculation(); //To keep items in basket even when the browser is refreshed



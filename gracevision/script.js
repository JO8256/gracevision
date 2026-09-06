let cart = [];


/* ADD TO CART */

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    alert(name + " added to cart!");

}


/* UPDATE CART */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkoutTotal =
        document.getElementById("checkoutTotal");


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "₹" + totalPrice;

    checkoutTotal.textContent =
        "₹" + totalPrice;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-item-price">
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });

}


/* CHANGE QUANTITY */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* OPEN CHECKOUT */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    closeCart();


    document
        .getElementById("checkoutOverlay")
        .classList.add("active");


    updateCart();

}


/* CLOSE CHECKOUT */

function closeCheckout() {

    document
        .getElementById("checkoutOverlay")
        .classList.remove("active");

}


/* SEARCH */

const searchBox =
    document.getElementById("searchBox");


const productCards =
    document.querySelectorAll(".product-card");


const noResults =
    document.getElementById("noResults");


searchBox.addEventListener(
    "input",
    function () {

        const searchText =
            searchBox.value
                .toLowerCase()
                .trim();


        let found = false;


        productCards.forEach(card => {

            const productName =
                card.dataset.name.toLowerCase();


            const category =
                card.dataset.category.toLowerCase();


            if (
                productName.includes(searchText) ||
                category.includes(searchText)
            ) {

                card.style.display = "block";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        if (found) {

            noResults.style.display = "none";

        } else {

            noResults.style.display = "block";

        }

    }
);


/* CATEGORY FILTER */

function filterCategory(category) {

    const cards =
        document.querySelectorAll(".product-card");


    let found = false;


    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;


        if (
            category === "All" ||
            cardCategory === category
        ) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (found) {

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* CHECKOUT */

const checkoutForm =
    document.getElementById("checkoutForm");


checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customerName"
            ).value;


        alert(
            "Thank you, " +
            name +
            "! Your order has been recorded for this demo."
        );


        cart = [];


        updateCart();


        checkoutForm.reset();


        closeCheckout();

    }
);


/* INITIAL CART */

updateCart();
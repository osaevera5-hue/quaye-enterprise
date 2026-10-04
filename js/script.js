 /* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
    const nav = document.getElementById("navMenu");

    if (nav) {
        nav.classList.toggle("show");
    }
}


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("woodcraftCart")) || [];


function saveCart() {
    localStorage.setItem(
        "woodcraftCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function updateCartCount() {
    const count = document.getElementById("cartCount");

    if (!count) return;

    let total = 0;

    cart.forEach(item => {
        total += Number(item.quantity);
    });

    count.textContent = total;
}


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image) {

    const existing = cart.find(
        item => item.name === name
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });

    }

    saveCart();

    alert(name + " added to your cart.");
}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `
            <div style="padding:50px 0;text-align:center">

                <h2>Your cart is empty.</h2>

                <p>
                    Explore our collection and find something special.
                </p>

                <br>

                <a href="shop.html" class="btn">
                    Continue Shopping
                </a>

            </div>
        `;

        if (totalElement) {
            totalElement.textContent = "GH₵ 0";
        }

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        const price = Number(item.price);
        const quantity = Number(item.quantity);

        const itemTotal =
            price * quantity;

        total += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h3>${item.name}</h3>

                    <p>
                        GH₵ ${price.toLocaleString()}
                    </p>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>


                <strong>
                    GH₵ ${itemTotal.toLocaleString()}
                </strong>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>
        `;
    });


    if (totalElement) {

        totalElement.textContent =
            "GH₵ " + total.toLocaleString();

    }
}


/* =========================
   REMOVE CART ITEM
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}


/* =========================
   CLEAR CART
========================= */

function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty.");

        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to clear your cart?"
    );


    if (confirmClear) {

        cart = [];

        saveCart();

        displayCart();

        updateCartCount();
    }
}


/* =========================
   SHOP SEARCH
========================= */

function searchProducts() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const search =
        input.value.toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();


        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


/* =========================
   CATEGORY FILTER
========================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


/* =========================
   CHECKOUT
========================= */

function displayCheckout() {

    const container =
        document.getElementById("checkoutItems");

    const totalElement =
        document.getElementById("checkoutTotal");


    if (!container) return;


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const price = Number(item.price);
        const quantity = Number(item.quantity);

        const itemTotal =
            price * quantity;

        total += itemTotal;


        container.innerHTML += `

            <div class="checkout-product">

                <span>
                    ${item.name}
                    × ${quantity}
                </span>

                <strong>
                    GH₵ ${itemTotal.toLocaleString()}
                </strong>

            </div>

        `;
    });


    if (totalElement) {

        totalElement.textContent =
            "GH₵ " + total.toLocaleString();

    }
}


/* =========================
   CONTINUE TO PAYMENT
========================= */

function goToPayment() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    window.location.href = "payment.html";
}


/* =========================
   PLACE ORDER / WHATSAPP
========================= */

function submitOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const name =
        document.getElementById("customerName").value;


    const phone =
        document.getElementById("customerPhone").value;


    const location =
        document.getElementById("customerLocation").value;


    let message =
        "Hello WoodCraft,%0A%0A";


    message +=
        "I would like to place an order.%0A%0A";


    message +=
        "Customer: " + name + "%0A";


    message +=
        "Phone: " + phone + "%0A";


    message +=
        "Location: " + location + "%0A%0A";


    message +=
        "ORDER:%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        total += itemTotal;


        message +=
            "- " +
            item.name +
            " x " +
            item.quantity +
            " = GH₵ " +
            itemTotal +
            "%0A";

    });


    message +=
        "%0ATotal: GH₵ " + total;


    /*
        CHANGE THIS NUMBER
        TO YOUR FATHER'S WHATSAPP NUMBER.

        Example:
        233241234567
    */


    const whatsappNumber =
        "233XXXXXXXXX";


    window.open(
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message,
        "_blank"
    );
}


/* =========================
   CONTACT MESSAGE
========================= */

function sendMessage(event) {

    event.preventDefault();


    alert(
        "Thank you! We will get back to you shortly."
    );
}


/* =========================
   PAYMENT METHOD
========================= */

function selectPayment(method, button) {

    const momo =
        document.getElementById("momoPayment");

    const card =
        document.getElementById("cardPayment");


    const buttons =
        document.querySelectorAll(".payment-method");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    if (method === "momo") {

        if (momo) {
            momo.style.display = "flex";
        }

        if (card) {
            card.style.display = "none";
        }

    } else {

        if (momo) {
            momo.style.display = "none";
        }

        if (card) {
            card.style.display = "flex";
        }

    }
}


/* =========================
   PAYMENT SUMMARY
========================= */

function displayPayment() {

    const container =
        document.getElementById("paymentItems");

    const totalElement =
        document.getElementById("paymentTotal");


    if (!container) return;


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const price = Number(item.price);
        const quantity = Number(item.quantity);

        const itemTotal =
            price * quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="payment-product">

                <div class="payment-product-name">

                    ${item.name}

                    <br>

                    <small>
                        Quantity: ${quantity}
                    </small>

                </div>


                <div class="payment-product-price">

                    GH₵ ${itemTotal.toLocaleString()}

                </div>

            </div>

        `;

    });


    if (totalElement) {

        totalElement.textContent =
            "GH₵ " + total.toLocaleString();

    }
}


/* =========================
   PROCESS DEMO PAYMENT
========================= */

function processPayment() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const momo =
        document.getElementById("momoPayment");


    const isMomo =
        momo &&
        momo.style.display !== "none";


    /* =====================
       MOBILE MONEY
    ===================== */

    if (isMomo) {

        const number =
            document
                .getElementById("momoNumber")
                .value
                .trim();


        if (number.length < 10) {

            alert(
                "Please enter a valid Mobile Money number."
            );

            return;
        }

    }


    /* =====================
       CARD
    ===================== */

    else {

        const card =
            document
                .getElementById("cardNumber")
                .value
                .trim();


        const name =
            document
                .getElementById("cardName")
                .value
                .trim();


        const expiry =
            document
                .getElementById("cardExpiry")
                .value
                .trim();


        const cvv =
            document
                .getElementById("cardCVV")
                .value
                .trim();


        if (
            card.length < 16 ||
            name === "" ||
            expiry.length < 5 ||
            cvv.length < 3
        ) {

            alert(
                "Please complete the card details."
            );

            return;
        }
    }


    /* =====================
       CALCULATE TOTAL
    ===================== */

    let total = 0;


    cart.forEach(item => {

        total +=
            Number(item.price) *
            Number(item.quantity);

    });


    /* =====================
       FAKE ORDER NUMBER
    ===================== */

    const randomNumber =
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    const orderNumber =
        "WC-" + randomNumber;


    const orderNumberElement =
        document.getElementById("orderNumber");


    const successAmount =
        document.getElementById("successAmount");


    if (orderNumberElement) {

        orderNumberElement.textContent =
            orderNumber;

    }


    if (successAmount) {

        successAmount.textContent =
            "GH₵ " + total.toLocaleString();

    }


    /* =====================
       SHOW SUCCESS
    ===================== */

    const successModal =
        document.getElementById("successModal");


    if (successModal) {

        successModal.classList.add("show");

    }

}


/* =========================
   FINISH PAYMENT
========================= */

function finishPayment() {

    cart = [];


    localStorage.removeItem(
        "woodcraftCart"
    );


    window.location.href =
        "shop.html";
}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        displayCheckout();

        displayPayment();

    }
);
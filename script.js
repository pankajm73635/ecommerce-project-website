// आपका डेटा जैसा आपने माँगा था
const products = [
    { id: 1, name: "Shoes", price: 1999, img: "Shoe.jpg" },
    { id: 2, name: "T-shirt", price: 799, img: "T-shirt.jpg" },
    { id: 3, name: "Backpack", price: 1499, img: "backpack.jpg" }
];

let cart = [];

// प्रोडक्ट्स लोड करना
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// कार्ट में जोड़ना
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cartBtn').innerText = `Cart (${cart.length})`;
    const cartItems = document.getElementById('cartItems');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartItems.innerHTML = cart.map(item => `<p>${item.name} - ₹${item.price}</p>`).join('');
    document.getElementById('totalPrice').innerText = total;
}

// सर्च फ़िल्टर
function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

// लॉगिन चेक और अन्य फंक्शन्स
function logout() {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('cart-visible');
}

function checkout() {
    alert("Thank you for shopping! Order placed successfully.");
    cart = [];
    updateCartUI();
    toggleCart();
}

document.getElementById('cartBtn').onclick = toggleCart;

// शुरुआत में प्रोडक्ट्स दिखाएँ
window.onload = () => {
    if(!localStorage.getItem("userLoggedIn") && window.location.pathname.includes("index.html")) {
        window.location.href = "login.html";
    }
    renderProducts(products);
};

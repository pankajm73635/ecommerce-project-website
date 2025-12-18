// --- 1. SECURITY CHECK (सबसे ऊपर) ---
// यह कोड चेक करेगा कि यूजर ने लॉगिन किया है या नहीं
if (localStorage.getItem("userLoggedIn") !== "true") {
    // अगर लॉगिन नहीं है, तो तुरंत login.html पर भेज देगा
    window.location.href = "login.html";
}

// --- 2. PRODUCT DATA ---
const products = [
    { id: 1, name: "Shoes", price: 1999, img: "Shoe.jpg" },
    { id: 2, name: "T-shirt", price: 799, img: "T-shirt.jpg" },
    { id: 3, name: "Backpack", price: 1499, img: "backpack.jpg" }
];

let cart = [];

// --- 3. DISPLAY PRODUCTS ---
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if(!grid) return; // अगर ग्रिड नहीं मिला तो कोड रुक जाएगा
    
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// --- 4. CART LOGIC ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cartBtn').innerText = `Cart (${cart.length})`;
    const cartItems = document.getElementById('cartItems');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        </div>
    `).join('');
    
    document.getElementById('totalPrice').innerText = total;
}

// --- 5. SEARCH & LOGOUT & CART TOGGLE ---
function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

function logout() {
    // लॉगिन डेटा साफ़ करें और लॉगिन पेज पर भेजें
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('cart-visible');
}

// --- 6. INITIALIZE ---
document.getElementById('cartBtn').onclick = toggleCart;

// जब पेज पूरी तरह लोड हो जाए
window.onload = () => {
    renderProducts(products);
};

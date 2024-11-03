
let cart = [];
let totalAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('overlay').style.display = 'flex';
    displayProducts();
    document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
    document.getElementById('edit-details-form').addEventListener('submit', handleEditDetails);
    document.getElementById('search-input').addEventListener('input', searchProducts);
    loadCartFromLocalStorage();
    loadGoogleSignInButton();
    document.getElementById('sign-out').addEventListener('click', signOut);
});

function addToCart(button, product, price, image, quantity) {
    cart.push({ product, price, image, quantity });
    totalAmount += price * quantity;
    updateCart();
    updateCartCount();
    saveCartToLocalStorage();
    button.disabled = true;
}

function updateCart() {
    const cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.product}">
            <div>
                <h4>${item.product}</h4>
                <p>NPR ${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
        `;
        cartElement.appendChild(li);
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('floating-cart-count').textContent = cart.length;
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    showSection('checkout-details');
}

function handleCheckout(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
  
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    alert(`Order confirmed! Thank you for your purchase, ${name}.`);
    
    // Save the order to the user's purchase history
    const purchaseHistory = document.getElementById('purchase-history');
    const li = document.createElement('li');
    li.textContent = `Order for ${name} - NPR ${totalAmount.toFixed(2)} - Payment Method: ${payment}`;
    purchaseHistory.appendChild(li);

    // Reset cart and form
    cart = [];
    totalAmount = 0;
    updateCart();
    updateCartCount();
    saveCartToLocalStorage();

    // Clear form fields
    document.getElementById('checkout-form').reset();
    showSection('home');
}

// Search functionality
function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

// Load products dynamically (example products)
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    const sampleProducts = [
        { name: 'Laptop', price: 100000, image: 'laptop.jpg' },
        { name: 'Smartphone', price: 50000, image: 'smartphone.jpg' },
        { name: 'Headphones', price: 8000, image: 'headphones.jpg' }
    ];

    sampleProducts.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p>NPR ${product.price}</p>
            <button onclick="addToCart(this, '${product.name}', ${product.price}, '${product.image}', 1)">Add to Cart</button>
        `;
        productsGrid.appendChild(div);
    });
}

// Google Sign-In
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    document.getElementById('user-name-text').textContent = profile.getName();
    document.getElementById('user-email-text').textContent = profile.getEmail();
    document.getElementById('g-signin-button').style.display = 'none';
    document.getElementById('sign-out').style.display = 'block';
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        document.getElementById('user-name-text').textContent = 'User';
        document.getElementById('user-email-text').textContent = 'register@gmail.com';
        document.getElementById('g-signin-button').style.display = 'block';
        document.getElementById('sign-out').style.display = 'none';
    });
}

// Edit Details Form
function toggleEditDetailsForm() {
    const form = document.getElementById('edit-details-form');
    form.classList.toggle('hidden');
}

function handleEditDetails(event) {
    event.preventDefault();
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    document.getElementById('user-name-text').textContent = name;
    document.getElementById('user-email-text').textContent = email;
    toggleEditDetailsForm();
}

// Cart persistence using LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    const storedTotalAmount = localStorage.getItem('totalAmount');
    if (storedCart && storedTotalAmount) {
        cart = JSON.parse(storedCart);
        totalAmount = parseFloat(storedTotalAmount);
        updateCart();
        updateCartCount();
    }
}

// Additional functionality for login overlay
function checkCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === '1234') {
        document.getElementById('overlay').style.display = 'none';
    } else {
        alert('Incorrect username or password');
    }
}

function loadGoogleSignInButton() {
    if (!gapi.auth2) {
        gapi.load('auth2', () => {
            gapi.auth2.init();
            document.getElementById('g-signin-button').classList.remove('hidden');
        });
    }
}
</script>

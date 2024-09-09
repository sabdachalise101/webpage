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

// Function to add a product to the cart
function addToCart(button, product, price, image, quantity) {
    cart.push({ product, price, image, quantity });
    totalAmount += price * quantity;
    updateCart();
    updateCartCount();
    saveCartToLocalStorage();
    button.disabled = true; // Disable the button after adding to cart
}

// Function to update the cart display
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

// Function to update the cart count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('floating-cart-count').textContent = cart.length;
}

// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Show the checkout details section
    showSection('checkout-details');
}

// Function to handle form submission for checkout
function handleCheckout(event) {
    event.preventDefault(); // Prevent form submission

    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    // Process the order
    const orderDetails = {
        name,
        email,
        phone,
        address,
        paymentMethod,
        products: cart.slice() // Copy the cart items
    };

    // Log the order details
    console.log("Order Details:", orderDetails);

    // Reset the form fields
    document.getElementById('checkout-form').reset();

    // Clear the cart
    cart = [];
    totalAmount = 0;
    updateCart();
    updateCartCount();

    // Update purchase history
    updatePurchaseHistory(orderDetails);

    // Redirect to the home page
    showSection('home');
}

// Function to update purchase history
function updatePurchaseHistory(orderDetails) {
    const purchaseHistory = document.getElementById('purchase-history');
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>Name:</strong> ${orderDetails.name}<br>
        <strong>Email:</strong> ${orderDetails.email}<br>
        <strong>Phone:</strong> ${orderDetails.phone}<br>
        <strong>Address:</strong> ${orderDetails.address}<br>
        <strong>Payment Method:</strong> ${orderDetails.paymentMethod}<br>
        <strong>Products:</strong><br>
        <ul>
            ${orderDetails.products.map(product => `<li>${product.product} - NPR ${product.price.toFixed(2)} x ${product.quantity}</li>`).join('')}
        </ul><br>
    `;
    purchaseHistory.appendChild(li);
}

// Function to toggle the edit details form visibility
function toggleEditDetailsForm() {
    const editDetailsForm = document.getElementById('edit-details-form');
    editDetailsForm.classList.toggle('hidden');
}

// Function to handle form submission for edit details
function handleEditDetails(event) {
    event.preventDefault(); // Prevent form submission

    // Get form input values
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;

    // Update name and email in "My Details" section
    document.getElementById('user-name').textContent = `Name: ${name}`;
    document.getElementById('user-email').textContent = `Email: ${email}`;

    // Hide the edit details form after submission
    toggleEditDetailsForm();
}

// Callback function to handle Google Sign-In
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();

    // Update the user details on the page
    document.getElementById('user-name-text').textContent = profile.getName();
    document.getElementById('user-email-text').textContent = profile.getEmail();

    // Set the user's profile image
    const profileImage = document.getElementById('user-profile-image');
    profileImage.src = profile.getImageUrl(); // Get the profile image URL from the user's Google account
    profileImage.style.display = 'block'; // Ensure the image is visible if hidden initially

    // Hide the Google Sign-In button after successful sign-in
    document.getElementById('g-signin').classList.add('hidden');

    // Show the Sign-Out button after successful sign-in
    document.getElementById('sign-out').style.display = 'block';
}

// Function to handle Google Sign-Out
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        console.log('User signed out.');

        // Clear the user details from the page
        document.getElementById('user-name-text').textContent = '';
        document.getElementById('user-email-text').textContent = '';
        document.getElementById('user-profile-image').style.display = 'none';

        // Show the Google Sign-In button after sign-out
        document.getElementById('g-signin').classList.remove('hidden');

        // Hide the Sign-Out button after sign-out
        document.getElementById('sign-out').style.display = 'none';
    });
}

// Load the Google Sign-In button on page load
function loadGoogleSignInButton() {
    gapi.signin2.render('g-signin', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn
    });
}

// Sample products
const products = [
    { name: "Product 1", price: 10.00, image: "https://via.placeholder.com/150" },
    { name: "Product 2", price: 20.00, image: "https://via.placeholder.com/150" },
    { name: "Product 3", price: 30.00, image: "https://via.placeholder.com/150" },
    { name: "Product 4", price: 40.00, image: "https://via.placeholder.com/150" },
    { name: "Product 5", price: 50.00, image: "https://via.placeholder.com/150" },
    { name: "Product 6", price: 60.00, image: "https://via.placeholder.com/150" },
    { name: "Product 7", price: 70.00, image: "https://via.placeholder.com/150" },
    { name: "Product 8", price: 80.00, image: "https://via.placeholder.com/150" },
    { name: "Product 9", price: 90.00, image: "https://via.placeholder.com/150" },
    { name: "Product 10", price: 100.00, image: "https://via.placeholder.com/150" }
];

// Function to display products
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="showProductDetails('${product.name}', ${product.price}, '${product.image}')">
            <h3>${product.name}</h3>
            <p class="price">NPR ${product.price.toFixed(2)}</p>
            <button onclick="showProductDetails('${product.name}', ${product.price}, '${product.image}')">View Details</button>
        `;
        productsGrid.appendChild(productElement);
    });
}

// Function to show product details
function showProductDetails(name, price, image) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p class="price">NPR ${price.toFixed(2)}</p>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" min="1" value="1">
        <button onclick="addToCart(this, '${name}', ${price}, '${image}', parseInt(document.getElementById('quantity').value))">Add to Cart</button>
    `;
    showSection('product-details');
}

// Search products based on input
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayFilteredProducts(filteredProducts);
}

// Display filtered products
function displayFilteredProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="showProductDetails('${product.name}', ${product.price}, '${product.image}')">
            <h3>${product.name}</h3>
            <p class="price">NPR ${product.price.toFixed(2)}</p>
            <button onclick="showProductDetails('${product.name}', ${product.price}, '${product.image}')">View Details</button>
        `;
        productsGrid.appendChild(productElement);
    });
}

// Function to save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from local storage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        updateCart();
        updateCartCount();
    }
}

let cart = [];
let totalAmount = 0;

// Function to add a product to the cart
function addToCart(button, product, price, image) {
    cart.push({ product, price, image });
    totalAmount += price;
    updateCart();
    updateCartCount();
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
                <p>NPR ${item.price.toFixed(2)}</p>
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
    const sections = document.querySelectorAll('main .section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Function to handle the checkout process
function handleCheckout() {
    if (!checkSignInStatus()) {
        document.getElementById('signin-checkout-message').style.display = 'block';
    } else {
        document.getElementById('signin-checkout-message').style.display = 'none';
        toggleEditDetailsForm();
    }
}

// Function to process the checkout form submission
function processCheckout(event) {
    event.preventDefault();
    const orderDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        paymentMethod: document.getElementById('payment').value,
        products: cart
    };
    console.log('Order details:', orderDetails);
    // Add the order to the purchase history
    addPurchaseHistory(orderDetails);
    // Clear the cart
    cart = [];
    totalAmount = 0;
    updateCart();
    updateCartCount();
    showSection('home');
}

// Function to add an order to the purchase history
function addPurchaseHistory(orderDetails) {
    const purchaseHistory = document.getElementById('purchase-history');
    const li = document.createElement('li');
    li.innerHTML = `
        <h4>Order</h4>
        <p>Name: ${orderDetails.name}</p>
        <p>Email: ${orderDetails.email}</p>
        <p>Phone: ${orderDetails.phone}</p>
        <p>Address: ${orderDetails.address}</p>
        <p>Payment Method: ${orderDetails.paymentMethod}</p>
        <h5>Products:</h5>
        <ul>
            ${orderDetails.products.map(product => `
                <li>
                    ${product.product} - NPR ${product.price.toFixed(2)}
                </li>
            `).join('')}
        </ul>
    `;
    purchaseHistory.appendChild(li);
}

// Function to toggle the edit details form
function toggleEditDetailsForm() {
    const form = document.getElementById('checkout-details');
    form.classList.toggle('hidden');
}

// Function to check sign-in status
function checkSignInStatus() {
    return localStorage.getItem('isSignedIn') === 'true';
}

// Function to load user details
function loadUserDetails() {
    if (checkSignInStatus()) {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        console.log('Loading user details from localStorage:', userName, userEmail);
        document.getElementById('user-name').textContent = 'Name: ' + userName;
        document.getElementById('user-email').textContent = 'Email: ' + userEmail;
        document.getElementById('name').value = userName;
        document.getElementById('email').value = userEmail;
        document.querySelector('.g-signin2').style.display = 'none';
        document.getElementById('user-info-top-right').style.display = 'block';
        loadUserPicture();
    } else {
        console.log('User is not signed in.');
        document.querySelector('.g-signin2').style.display = 'block';
        document.getElementById('user-info-top-right').style.display = 'none';
    }
}

// Function to load user picture
function loadUserPicture() {
    const userPic = localStorage.getItem('userPic');
    if (userPic) {
        document.getElementById('user-pic').src = userPic;
    }
}

// Google Sign-In callback function
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('User signed in:', profile.getName(), profile.getEmail(), profile.getImageUrl());
    localStorage.setItem('isSignedIn', 'true');
    localStorage.setItem('userName', profile.getName());
    localStorage.setItem('userEmail', profile.getEmail());
    localStorage.setItem('userPic', profile.getImageUrl());
    loadUserDetails();
}

// Google Sign-Out function
function signOut() {
    localStorage.setItem('isSignedIn', 'false');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPic');
    document.querySelector('.g-signin2').style.display = 'block';
    document.getElementById('user-info-top-right').style.display = 'none';
}

// Load products on page load
window.onload = () => {
    console.log('Page loaded');
    loadProducts();
    loadUserDetails();
};

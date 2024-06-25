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
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// Function to handle checkout
function handleCheckout() {
    const auth2 = gapi.auth2.getAuthInstance();
    const isSignedIn = auth2.isSignedIn.get();

    if (!isSignedIn) {
        auth2.signIn().then(() => {
            showSection('checkout-details');
        });
    } else {
        showSection('checkout-details');
    }
}

// Function to handle form submission for checkout
function processCheckout(event) {
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

    // Redirect to the home page
    showSection('home');

    // Update purchase history
    updatePurchaseHistory(orderDetails);
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
            ${orderDetails.products.map(product => `<li>${product.product} - NPR ${product.price.toFixed(2)}</li>`).join('')}
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

    // Update user details
    document.getElementById('user-name').textContent = `Name: ${name}`;
    document.getElementById('user-email').textContent = `Email: ${email}`;

    // Hide the edit details form
    toggleEditDetailsForm();
}

// Sample products to be added to the home section
const products = [
    { name: 'Product 1', price: 1000, image: 'product1.jpg' },
    { name: 'Product 2', price: 2000, image: 'product2.jpg' },
    { name: 'Product 3', price: 3000, image: 'product3.jpg' },
    { name: 'Product 4', price: 4000, image: 'product4.jpg' },
    { name: 'Product 5', price: 5000, image: 'product5.jpg' },
    { name: 'Product 6', price: 6000, image: 'product6.jpg' },
    { name: 'Product 7', price: 7000, image: 'product7.jpg' },
    { name: 'Product 8', price: 8000, image: 'product8.jpg' },
    { name: 'Product 9', price: 9000, image: 'product9.jpg' },
    { name: 'Product 10', price: 10000, image: 'product10.jpg' },
    { name: 'Product 11', price: 10100, image: 'product10.jpg' },
];

// Add sample products to the home section
const productsGrid = document.querySelector('.products-grid');
products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">NPR ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(this, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
    `;
    productsGrid.appendChild(productElement);
});

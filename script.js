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

    // Update name and email in "My Details" section
    document.getElementById('user-name').textContent = `Name: ${name}`;
    document.getElementById('user-email').textContent = `Email: ${email}`;

    // Hide the edit details form after submission
    const editDetailsForm = document.getElementById('edit-details-form');
    editDetailsForm.classList.add('hidden');
}

// Event listener for edit details form submission
document.getElementById('edit-details-form').addEventListener('submit', handleEditDetails);

// Event listener for checkout form submission
document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

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

// Display products
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

// Show the home section by default
showSection('home');

   

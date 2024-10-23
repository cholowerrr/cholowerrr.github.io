// cart.js
// Dayrit, Gabriel Andrei G.
// Delos Santos, Hailey D.
// Pascual, Macline Jane T.
// Tayag, Michael D.  
// CYB-201/6INTROWEB
class Cart {
    constructor(cartItemsElementId, totalPriceElementId, checkoutButtonId) {
        this.cart = [];
        this.cartItemsElement = document.getElementById(cartItemsElementId);
        this.totalPriceElement = document.getElementById(totalPriceElementId);
        this.checkoutButton = document.getElementById(checkoutButtonId);
        this.cartSidebar = document.getElementById('cart-sidebar');

        this.checkoutButton.style.display = 'none';
        
        // Close cart button functionality
        document.getElementById('close-cart').addEventListener('click', () => {
            this.closeCart();
        });

        this.checkoutButton.addEventListener('click', () => {
            if (this.cart.length > 0) {
                this.proceedToCheckout();
            }
        });
    }

    openCart() {
        this.cartSidebar.classList.add('open');
    }

    closeCart() {
        this.cartSidebar.classList.remove('open');
    }

    addToCart(name, price) {
        const existingItem = this.cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ name, price, quantity: 1 });
        }

        this.updateCartDisplay();

        if (this.cart.length > 0) {
            this.openCart();
            this.checkoutButton.style.display = 'block';
        }
    }

    updateCartDisplay() {
        this.cartItemsElement.innerHTML = '';

        let total = 0;
        this.cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (₱ ${item.price} x ${item.quantity})`;

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', () => this.updateItemQuantity(item.name, -1));

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', () => this.updateItemQuantity(item.name, 1));

            li.appendChild(minusButton);
            li.appendChild(plusButton);
            this.cartItemsElement.appendChild(li);
            total += item.price * item.quantity;
        });

        this.totalPriceElement.textContent = total.toFixed(2);
    }

    updateItemQuantity(name, change) {
        const item = this.cart.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.cart = this.cart.filter(item => item.name !== name);
            }
            this.updateCartDisplay();
        }
    }

    proceedToCheckout() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        window.location.href = 'misushi_cOut.html'; // Adjust to your checkout page
    }

    static attachAddToCartListeners(cart) {
        const addToCartButtons = document.querySelectorAll('.popular__button');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                cart.addToCart(name, price);
            });
        });
    }
}

// Initialize the cart
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart('cart-items', 'total-price', 'checkout-button');
    Cart.attachAddToCartListeners(cart);
});


// Initialize cart array
let cartItems = [];

// Function to update the cart display
function updateCartDisplay() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartList = document.getElementById('cart-items');

    // Clear the cart list
    cartList.innerHTML = '';

    // If there are items in the cart, display them
    if (cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name; // Display item name
            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.onclick = () => {
                cartItems[index].quantity++; // Increase item quantity
                updateCartDisplay();
            };

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.onclick = () => {
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--; // Decrease item quantity
                } else {
                    cartItems.splice(index, 1); // Remove item if quantity is 1
                }
                updateCartDisplay();
            };

            li.appendChild(addButton);
            li.appendChild(removeButton);
            cartList.appendChild(li);
        });
        cartSidebar.classList.add('open'); // Show the cart
    } else {
        cartSidebar.classList.remove('open'); // Hide the cart
    }
}

// Example function to add item to cart
function addItemToCart(item) {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        item.quantity = 1; // Initialize quantity
        cartItems.push(item);
    }
    updateCartDisplay(); // Update the cart display
}

// Example usage
document.querySelector('.popular__button').addEventListener('click', function() {
    const item = { name: this.dataset.itemName }; // Replace with actual item data
    addItemToCart(item); // Add item to cart when button is clicked
});


// checkout.js
// Dayrit, Gabriel Andrei G.
// Delos Santos, Hailey D.
// Pascual, Macline Jane T.
// Tayag, Michael D.  
// CYB-201/6INTROWEB

document.addEventListener('DOMContentLoaded', () => {
    const orderType = document.getElementById('order-type');
    const paymentMethod = document.getElementById('payment-method');
    const deliveryDetails = document.getElementById('delivery-details');
    const cardDetails = document.getElementById('card-details');
    const form = document.getElementById('order-form');
    
    // Show/Hide Delivery Fields based on Order Type
    orderType.addEventListener('change', function() {
        if (this.value === 'delivery') {
            deliveryDetails.style.display = 'block';
        } else {
            deliveryDetails.style.display = 'none';
        }
    });

    // Show/Hide Card Fields based on Payment Method
    paymentMethod.addEventListener('change', function() {
        if (this.value === 'credit-card' || this.value === 'debit-card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    });

    // Form Validation and Submission
    form.addEventListener('submit', handleOrderSubmission);

    function handleOrderSubmission(event) {
        event.preventDefault(); // Prevent default form submission
        
        const name = document.getElementById('name').value;
        const contactNumber = document.getElementById('contact-number').value;
        const email = document.getElementById('email').value;
        const selectedOrderType = orderType.value;
        const selectedPaymentMethod = paymentMethod.value;

        // Validate delivery address if delivery is selected
        if (selectedOrderType === 'delivery') {
            const deliveryAddress = document.getElementById('delivery-address').value;
            const deliveryTime = document.getElementById('delivery-time').value;
            if (!deliveryAddress) {
                alert('Please enter the delivery address.');
                return;
            }
        }

        // Validate credit card details if credit/debit card is selected
        if (selectedPaymentMethod === 'credit-card' || selectedPaymentMethod === 'debit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCVV = document.getElementById('card-cvv').value;
            if (!cardNumber || !cardExpiry || !cardCVV) {
                alert('Please enter complete card details.');
                return;
            }
        }

        // Change button text and display confirmation prompt
        document.getElementById('order-button').textContent = 'Order Placed! Order will be delivered in 40 minutes!';
        document.getElementById('confirmation-prompt').style.display = 'flex';

        // Optionally: Clear form fields after submission
        form.reset();
    }

    function redirectToHomepage() {
        window.location.href = '../index.html'; // Redirect to your homepage URL
    }

    // Close button in confirmation prompt
    document.getElementById('close-prompt').addEventListener('click', redirectToHomepage);
});

document.getElementById('order-type').addEventListener('change', function () {
    const deliveryDetails = document.getElementById('delivery-details');
    deliveryDetails.style.display = this.value === 'delivery' ? 'block' : 'none';
});

document.getElementById('payment-method').addEventListener('change', function () {
    const cardDetails = document.getElementById('card-details');
    cardDetails.style.display = this.value === 'credit-card' || this.value === 'debit-card' ? 'block' : 'none';
});

document.getElementById('order-form').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('confirmation-prompt').style.display = 'flex';
});

function redirectToHomepage() {
    window.location.href = '../index.html'; // Example redirect to homepage
}
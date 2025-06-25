document.addEventListener("DOMContentLoaded", function () {
  // Get the form values
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const telInput = document.getElementById('tel');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const captchaInput = document.getElementById('captcha');
  const submitButton = document.getElementById('submit');

  // Validation patterns
  const mobilePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form submission event listener
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate the form fields
    if (validateForm()) {
      // Send the form data to the server-side script (submit_contact.php)
      const formData = new FormData(contactForm);
      fetch('submit_contact.php', {
        method: 'POST',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the server-side script
      })
      .catch((error) => {
        console.error(error);
      });
    }
  });

  // Validate the form fields
  function validateForm() {
    let isValid = true;

    // Check if all required fields are filled
    if (!nameInput.value || !mobileInput.value || !emailInput.value || !messageInput.value || !captchaInput.value) {
      isValid = false;
      alert('Please fill in all required fields');
    }

    // Check if the mobile number is valid
    if (!mobilePattern.test(mobileInput.value)) {
      isValid = false;
      alert('Invalid mobile number');
    }

    // Check if the email address is valid
    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      alert('Invalid email address');
    }

    return isValid;
  }

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.5726, lng: 88.3639 },
      zoom: 12
    });
  }

  // Bootstrap carousel initialization
  const carouselElement = document.querySelector('#demo');
  if (carouselElement) {
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 3000, // 3 seconds auto-slide
      ride: 'carousel',
    });
  }

  // Collection buttons functionality
  const collectionButtons = document.querySelectorAll('.collection-button');
  collectionButtons.forEach(button => {
    button.addEventListener('click', function () {
      alert("View More button clicked!");
      // You can add logic to redirect or show more details here
    });
  });

  // Stats section animation on scroll (optional)
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    window.addEventListener('scroll', function () {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;

      if (sectionPos < screenPos) {
        statsSection.classList.add('animate');
      }
    });
  }
});
function showOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.style.display = 'block';
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10); // Trigger CSS transition
}

function closeOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.classList.remove('active');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500); // Wait for fade out
}
function showOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('active');
}

function closeOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove('active');
}
// Toggle Chat Window
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}

// Send User Message and Bot Response
function sendMessage() {
  const userInput = document.getElementById('user-input');
  const chatContent = document.getElementById('chat-content');
  const message = userInput.value.trim();

  if (message) {
      displayUserMessage(message);
      userInput.value = ''; // Clear input

      // Simulate bot typing with a delay
      showTypingIndicator();
      setTimeout(() => {
          hideTypingIndicator();
          displayBotResponse(message);
          chatContent.scrollTop = chatContent.scrollHeight; // Auto-scroll
      }, 1000);
  }
}

// Display User Message
function displayUserMessage(message) {
  const chatContent = document.getElementById('chat-content');
  const userMessage = document.createElement('p');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `<strong>You:</strong> ${message} <span class="timestamp">${getTimestamp()}</span>`;
  chatContent.appendChild(userMessage);
}

// Display Bot Response Based on User Input
function displayBotResponse(message) {
  const chatContent = document.getElementById('chat-content');
  const botMessage = document.createElement('p');
  botMessage.className = 'bot-message';

  // Predefined responses based on user input keywords
  let response;
  if (/hello|hi|hey/i.test(message)) {
      response = "Hello! How can I help you with our textiles?";
  } else if (/price|cost/i.test(message)) {
      response = "Our products vary in price. Please visit the product page for detailed pricing.";
  } else if (/fabric|material/i.test(message)) {
      response = "We offer various fabrics, including cotton, polyester, silk, and more. What are you interested in?";
  } else {
      response = "I'm here to help! Could you please clarify your question?";
  }

  botMessage.innerHTML = `<strong>Bot:</strong> ${response} <span class="timestamp">${getTimestamp()}</span>`;
  chatContent.appendChild(botMessage);
}

// Show Typing Indicator
function showTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'block';
}

// Hide Typing Indicator
function hideTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'none';
}

// Get Current Timestamp
function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
// Sample fabric data for inventory checker and collection section
const fabrics = [
  {
      company: 'Sangam',
      fabricType: '2/30',
      shades: [
          { shadeNumber: '101', stock: 100, price: 200 },
          { shadeNumber: '202', stock: 80, price: 220 }
      ]
  },
  {
      company: 'Mafatlal',
      fabricType: 'Trovin',
      shades: [
          { shadeNumber: '303', stock: 150, price: 250 },
          { shadeNumber: '404', stock: 60, price: 280 }
      ]
  },
  // Add more fabric data as needed
];

let cart = [];

function filterCollection() {
    const company = document.getElementById("company").value.toLowerCase();
    const fabricType = document.getElementById("fabricType").value.toLowerCase();
    const shadeNumber = document.getElementById("shadeNumber").value;

    const fabricCards = document.querySelectorAll(".fabric-card");

    fabricCards.forEach(card => {
        const cardCompany = card.dataset.company.toLowerCase();
        const cardType = card.dataset.type.toLowerCase();
        const cardShade = card.dataset.shade;

        const matches = 
            (!company || cardCompany === company) &&
            (!fabricType || cardType === fabricType) &&
            (!shadeNumber || cardShade === shadeNumber);

        card.style.display = matches ? "inline-block" : "none";
    });
}

function addToCart(itemName, price) {
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        cart.push({ itemName, price, quantity });
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.textContent = `${item.itemName} - ${item.quantity}m @ ₹${item.price}/m`;
        cartItems.appendChild(cartItem);
    });

    document.getElementById("checkoutButton").disabled = cart.length === 0;
}

function openOrderForm() {
    document.getElementById("orderForm").style.display = "block";
}

function submitOrder(event) {
    event.preventDefault();
    alert("Order placed successfully!");
    cart = [];
    updateCart();
    document.getElementById("orderForm").style.display = "none";
}


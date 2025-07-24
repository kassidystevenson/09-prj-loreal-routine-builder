/* Get references to DOM elements */
const categoryFilter = document.getElementById("categoryFilter");
const productsContainer = document.getElementById("productsContainer");
const chatForm = document.getElementById("chatForm");
const chatWindow = document.getElementById("chatWindow");
const generateBtn = document.getElementById("generateRoutine");
const selectedProductsList = document.getElementById("selectedProductsList");

/* Show initial placeholder until user selects a category */
productsContainer.innerHTML = `
  <div class="placeholder-message">
    Select a category to view products
  </div>
`;

/* Load product data from JSON file */
async function loadProducts() {
  const response = await fetch("products.json");
  const data = await response.json();
  return data.products;
}

/* Create HTML for displaying product cards */
function displayProducts(products) {
  productsContainer.innerHTML = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
      </div>
    </div>
  `
    )
    .join("");
}

/* Filter and display products when category changes */
categoryFilter.addEventListener("change", async (e) => {
  const products = await loadProducts();
  const selectedCategory = e.target.value;

  /* filter() creates a new array containing only products 
     where the category matches what the user selected */
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  displayProducts(filteredProducts);
});

/* Chat form submission handler - placeholder for OpenAI integration */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  chatWindow.innerHTML = "Connect to the OpenAI API for a response!";
});

// This function collects selected products from the interface
function getSelectedProducts() {
  // Find all product items in the selected products list
  const productElements =
    selectedProductsList.querySelectorAll(".selected-product");
  const products = [];

  // Loop through each product element and collect its data
  productElements.forEach((el) => {
    // Get product data from data attributes
    const name = el.getAttribute("data-name");
    const brand = el.getAttribute("data-brand");
    const category = el.getAttribute("data-category");
    const description = el.getAttribute("data-description");

    // Add product info to the array
    products.push({
      name,
      brand,
      category,
      description,
    });
  });

  return products;
}

// This function sends selected products to OpenAI and gets a routine
async function generateRoutineWithAI(products) {
  // Format the products as JSON for the AI
  const productsJSON = JSON.stringify(products, null, 2);

  // Create the messages array for the OpenAI API
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful skincare expert. Create a personalized skincare routine using only the provided products. Be clear and concise.",
    },
    {
      role: "user",
      content: `Here are the selected products:\n${productsJSON}\nPlease generate a routine using these products.`,
    },
  ];

  // Prepare the API request
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = typeof OPENAI_API_KEY !== "undefined" ? OPENAI_API_KEY : ""; // Use key from secrets.js

  try {
    // Send the request to OpenAI
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // Use gpt-4o model
        messages: messages,
      }),
    });

    // Parse the response
    const data = await response.json();

    // Get the routine from the AI's reply
    if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      return data.choices[0].message.content;
    } else {
      return "Sorry, I couldn't generate a routine. Please try again.";
    }
  } catch (error) {
    // Handle errors
    return "Error connecting to AI. Please check your API key and internet connection.";
  }
}

// This function displays the routine in the chat window
function displayRoutine(routineText) {
  // Create a new chat message element
  const routineDiv = document.createElement("div");
  routineDiv.className = "chat-message ai-message";
  routineDiv.innerHTML = `<strong>Personalized Routine:</strong><br>${routineText.replace(
    /\n/g,
    "<br>"
  )}`;

  // Add the routine to the chat window
  chatWindow.appendChild(routineDiv);

  // Scroll to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// When the "Generate Routine" button is clicked
generateBtn.addEventListener("click", async () => {
  // Collect selected products
  const products = getSelectedProducts();

  // If no products are selected, show a message
  if (products.length === 0) {
    displayRoutine("Please select at least one product to generate a routine.");
    return;
  }

  // Show a loading message
  displayRoutine("Generating your personalized routine...");

  // Get the routine from OpenAI
  const routine = await generateRoutineWithAI(products);

  // Display the AI-generated routine
  displayRoutine(routine);
});

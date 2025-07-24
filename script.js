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
  // Create product cards with a Select button
  productsContainer.innerHTML = products
    .map(
      (product, idx) => `
    <div class="product-card" data-idx="${idx}">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <button class="select-btn" data-idx="${idx}">Select</button>
      </div>
    </div>
  `
    )
    .join("");

  // Add event listeners to product cards for instant routine generation
  const productCards = productsContainer.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("click", async () => {
      const idx = card.getAttribute("data-idx");
      const product = products[idx];

      // Show product selection in chat window
      const userDiv = document.createElement("div");
      userDiv.className = "chat-message user-message";
      userDiv.innerHTML = `<strong>You selected:</strong> ${product.name} <span>(${product.brand})</span>`;
      chatWindow.appendChild(userDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Show loading message
      displayRoutine("Generating description and routine...");

      // Generate description and routine using the chatbot
      const messages = [
        {
          role: "system",
          content:
            "You are a helpful L'Oréal product expert. When given a product, provide a short description and a recommended routine for using it. Be clear and concise.",
        },
        {
          role: "user",
          content: `Product: ${product.name}\nBrand: ${
            product.brand
          }\nCategory: ${product.category}\nDescription: ${
            product.description || ""
          }\nPlease provide a description and recommended routine for this product.`,
        },
      ];

      // Prepare the API request
      const apiUrl = "https://loreal-chatbot-446.kasstevenson06.workers.dev/";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: messages,
          }),
        });
        const data = await response.json();
        if (
          data.choices &&
          data.choices[0] &&
          data.choices[0].message &&
          data.choices[0].message.content
        ) {
          // Log for debugging
          console.log(
            "AI product description and routine:",
            data.choices[0].message.content
          );
          displayRoutine(data.choices[0].message.content);
        } else {
          displayRoutine(
            "Sorry, I couldn't generate a description or routine. Please try again."
          );
        }
      } catch (error) {
        displayRoutine(
          "Error connecting to AI. Please check your API key and internet connection."
        );
      }
    });
  });
}

// Add selected product to the selected products list
function addProductToSelected(product) {
  // Check if product is already selected
  const alreadySelected = Array.from(
    selectedProductsList.querySelectorAll(".selected-product")
  ).some((el) => el.getAttribute("data-name") === product.name);
  if (alreadySelected) return;

  // Create a new element for the selected product
  const productDiv = document.createElement("div");
  productDiv.className = "selected-product";
  productDiv.setAttribute("data-name", product.name);
  productDiv.setAttribute("data-brand", product.brand);
  productDiv.setAttribute("data-category", product.category);
  productDiv.setAttribute("data-description", product.description || "");
  productDiv.innerHTML = `<strong>${product.name}</strong> <span>(${product.brand})</span>`;

  selectedProductsList.appendChild(productDiv);
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
  const apiUrl = "https://loreal-chatbot-446.kasstevenson06.workers.dev/";

  try {
    // Send the request to OpenAI
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey || ""}`,
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
      // Log the AI's message content for debugging
      console.log(
        "AI routine message.content:",
        data.choices[0].message.content
      );
      return data.choices[0].message.content;
    } else {
      console.log("No valid AI routine returned:", data);
      return "Sorry, I couldn't generate a routine. Please try again.";
    }
  } catch (error) {
    // Handle errors
    return "Error connecting to AI. Please check your API key and internet connection.";
  }
}

// This function displays the routine in the chat window
function displayRoutine(routineText) {
  // Remove the loading message if present
  const loadingMsg = chatWindow.querySelector(".ai-message");
  if (
    loadingMsg &&
    loadingMsg.textContent.includes("Generating your personalized routine")
  ) {
    chatWindow.removeChild(loadingMsg);
  }

  // Create a new chat message element for the AI's response
  const routineDiv = document.createElement("div");
  routineDiv.className = "chat-message ai-message";
  routineDiv.innerHTML = `<strong>Personalized Routine:</strong><br>${routineText.replace(
    /\n/g,
    "<br>"
  )}`;
  chatWindow.appendChild(routineDiv);
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

  // Show selected products in the chat window as a user message
  const userDiv = document.createElement("div");
  userDiv.className = "chat-message user-message";
  userDiv.innerHTML = `<strong>You selected:</strong><br>${products
    .map((p) => `${p.name} <span>(${p.brand})</span>`)
    .join("<br>")}`;
  chatWindow.appendChild(userDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Show a loading message
  displayRoutine("Generating your personalized routine...");

  // Get the routine from OpenAI
  const routine = await generateRoutineWithAI(products);

  // Display the AI-generated routine
  displayRoutine(routine);
});

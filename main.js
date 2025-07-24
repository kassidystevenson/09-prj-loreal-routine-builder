/* —— basic reset —— */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* —— body + fonts —— */
body {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  color: #222;
  background: linear-gradient(120deg, #fff 0%, #e3a535 100%);
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.page-wrapper {
  width: 90%;
  max-width: 900px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(227, 165, 53, 0.12),
    0 1.5px 8px rgba(255, 0, 59, 0.07);
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 32px 36px;
  border: 2px solid #e3a535;
}

/* header */
.site-header {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e3a535;
  margin-bottom: 24px;
}

.logo {
  width: 250px;
  margin-bottom: 15px;
  filter: drop-shadow(0 2px 8px #e3a53588);
}

.site-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #ff003b;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* category filter */
.search-section {
  margin: 30px 0;
  display: flex;
  gap: 18px;
}

.search-section select {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  border: 2px solid #e3a535;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  font-weight: 500;
  color: #222;
  transition: border-color 0.3s;
  box-shadow: 0 2px 8px #e3a53522;
}

.search-section select:focus {
  outline: none;
  border-color: #ff003b;
}

/* chat section */
.chatbox {
  margin: 40px 0;
  border: 2px solid #e3a535;
  border-radius: 12px;
  padding: 32px;
  background: linear-gradient(120deg, #fff 0%, #fffbe6 100%);
  box-shadow: 0 2px 12px #e3a53522;
}

.chatbox h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #ff003b;
  font-weight: 600;
  letter-spacing: 1px;
}

.chat-window {
  padding: 20px;
  font-size: 18px;
  line-height: 1.6;
  height: 250px;
  overflow-y: auto;
  background: #fafafa;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1.5px solid #e3a535;
  box-shadow: 0 1px 6px #e3a53511;
}

/* placeholder message */
.placeholder-message {
  width: 100%;
  text-align: center;
  padding: 40px;
  color: #e3a535;
  font-size: 18px;
  font-style: italic;
  background: #fffbe6;
  border-radius: 8px;
}

/* input row */
.chat-form {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.chat-form input {
  flex: 1;
  padding: 12px;
  font-size: 18px;
  border: none;
  border-bottom: 2px solid #e3a535;
  background: transparent;
  color: #222;
  transition: border-bottom-color 0.3s;
}

.chat-form input:focus {
  outline: none;
  border-bottom-color: #ff003b;
}

.chat-form button {
  font-size: 18px;
  background: linear-gradient(90deg, #ff003b 60%, #e3a535 100%);
  color: #fff;
  border: none;
  padding: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 8px #ff003b33;
}

.chat-form button:hover {
  background: linear-gradient(90deg, #e3a535 60%, #ff003b 100%);
  box-shadow: 0 4px 16px #ff003b44;
}

.chat-form button:focus {
  outline: 2px solid #e3a535;
  outline-offset: 2px;
}

/* visually hidden */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* footer */
.site-footer {
  margin: 60px 0 40px;
  text-align: center;
  font-size: 15px;
  color: #e3a535;
  border-top: 2px solid #e3a535;
  padding-top: 18px;
  background: linear-gradient(90deg, #fff 80%, #fffbe6 100%);
  border-radius: 0 0 18px 18px;
}

.site-footer nav {
  margin-top: 12px;
}

.site-footer a {
  margin: 0 8px;
  color: #ff003b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.site-footer a:hover {
  color: #e3a535;
}

/* products grid */
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 30px 0;
  justify-content: center;
}

.product-card {
  flex: 0 1 calc(33.333% - 16px);
  border: 2px solid #e3a535;
  padding: 18px;
  border-radius: 10px;
  display: flex;
  gap: 15px;
  min-height: 170px;
  background: #fffbe6;
  box-shadow: 0 2px 12px #e3a53522;
  cursor: pointer;
  transition: box-shadow 0.3s, border-color 0.3s, background 0.3s;
  position: relative;
  overflow: visible;
}

/* Overlay for product description */
.product-description-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 10px;
  box-shadow: 0 4px 24px #e3a53544;
  color: #222;
  font-size: 15px;
  padding: 18px 16px;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  line-height: 1.6;
}

/* Show overlay on hover or focus-within */
.product-card:hover .product-description-overlay,
.product-card:focus-within .product-description-overlay {
  opacity: 1;
  pointer-events: auto;
}

/* Accessible close button for overlay (if used in JS) */
.product-description-overlay .close-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  background: #ff003b;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.product-description-overlay .close-btn:hover,
.product-description-overlay .close-btn:focus {
  background: #e3a535;
  color: #ff003b;
  outline: 2px solid #e3a535;
}

/* Highlight selected product cards */
.product-card.selected {
  border-color: #ff003b;
  box-shadow: 0 4px 24px #ff003b44, 0 0 0 4px #ff003b33;
  background: linear-gradient(120deg, #fffbe6 80%, #ffe3ec 100%);
}

/* Add a subtle checkmark for selected cards */
.product-card.selected::after {
  content: "✓";
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 22px;
  color: #ff003b;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  padding: 2px 7px;
  box-shadow: 0 1px 4px #ff003b22;
}

.product-card img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1.5px solid #e3a535;
  background: #fff;
  box-shadow: 0 1px 6px #e3a53511;
}

.product-card .product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 110px;
}

.product-card h3 {
  font-size: 17px;
  margin-bottom: 8px;
  color: #ff003b;
  font-weight: 600;
}

.product-card p {
  font-size: 14px;
  color: #e3a535;
  font-style: italic;
}

/* Remove button for selected products list */
.selected-products-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fffbe6;
  border: 1.5px solid #e3a535;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 15px;
  color: #222;
  position: relative;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.selected-products-list-item:hover {
  border-color: #ff003b;
  box-shadow: 0 2px 8px #ff003b22;
}

.selected-products-list-item .remove-btn {
  background: #ff003b;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 6px;
  transition: background 0.2s;
}

.selected-products-list-item .remove-btn:hover {
  background: #e3a535;
  color: #ff003b;
}

/* selected products */
.selected-products {
  margin: 40px 0;
  padding: 24px;
  border: 2px solid #ff003b;
  border-radius: 12px;
  background: linear-gradient(120deg, #fff 0%, #fffbe6 100%);
  box-shadow: 0 2px 12px #ff003b22;
}

.selected-products h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #e3a535;
  font-weight: 700;
  letter-spacing: 1px;
}

#selectedProductsList {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  /* Add smooth transition for adding/removing items */
  transition: all 0.3s;
}

.generate-btn {
  width: 100%;
  margin-top: 20px;
  padding: 18px;
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #ff003b 60%, #e3a535 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px #ff003b33;
  letter-spacing: 1px;
}

.generate-btn:hover {
  background: linear-gradient(90deg, #e3a535 60%, #ff003b 100%);
  box-shadow: 0 4px 16px #ff003b44;
}

.generate-btn i {
  margin-right: 8px;
  color: #e3a535;
}

/* JavaScript-generated styles */
.chat-window {
  padding: 20px;
  font-size: 18px;
  line-height: 1.6;
  height: 250px;
  overflow-y: auto;
  background: #fafafa;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1.5px solid #e3a535;
  box-shadow: 0 1px 6px #e3a53511;
}

.placeholder-message {
  width: 100%;
  text-align: center;
  padding: 40px;
  color: #e3a535;
  font-size: 18px;
  font-style: italic;
  background: #fffbe6;
  border-radius: 8px;
}

.product-card.selected {
  border-color: #ff003b;
  box-shadow: 0 4px 24px #ff003b44, 0 0 0 4px #ff003b33;
  background: linear-gradient(120deg, #fffbe6 80%, #ffe3ec 100%);
}

.product-card.selected::after {
  content: "✓";
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 22px;
  color: #ff003b;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  padding: 2px 7px;
  box-shadow: 0 1px 4px #ff003b22;
}
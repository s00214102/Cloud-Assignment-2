// Example product order information
const orderInfo = {
    orderID: "ORD123456",
    productID: "001",
    quantity: 2,
    customerName: "John Doe",
    customerAddress: "123 Main Street, City, Country",
    paymentMethod: "Credit Card",
};

function fetchAllProducts() {
  // Use a try-catch block for error handling
  try {
    // Replace with your API Gateway endpoint
    const apiEndpoint =
      "https://6d66vomwvf.execute-api.eu-west-1.amazonaws.com/prod/products";

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the GET request
    xhr.open("GET", apiEndpoint, true); // Asynchronous request
    //xhr.setRequestHeader("Content-Type", "application/json"); // Set content type

    // Set up the response handling
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        const products = JSON.parse(xhr.responseText); // Convert response to JSON
        console.log("Products fetched successfully:", products);
        populateProductList(products);
      } else {
        // Handle errors
        console.error("Error fetching products:", xhr.statusText);
      }
    };

    // Handle request errors
    xhr.onerror = function () {
      console.error("Network error while fetching products");
    };

    // Send the GET request
    xhr.send();
  } catch (err) {
    console.error("Unexpected error:", err.message);
  }
}
function populateProductList(products) {
  // Get the list box (a container or list where products will be inserted)
  const productList = document.getElementById("productList");

  // Clear existing items (optional)
  productList.innerHTML = "";

  // Loop through each product and create list items
  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "product-item";
    item.textContent = `${product.productName} - ${product.productType} - Stock: ${product.stockCount}`;

    // Create a button that passes the productID when clicked
    const button = document.createElement("button");
    button.className = "action-button";
    button.textContent = "Order"; // You can change the button text as needed

    // Add an event listener to the button
    button.addEventListener("click", () => {
      orderProduct(product.productID); // Call a function with productID
    });

    // Append the button to the item
    item.appendChild(button);

    productList.appendChild(item); // Add the item to the list box
  });
}

// Function to be called when the button is clicked
function orderProduct(productID) {
  alert(`Button clicked for productID: ${productID}`);
  // Implement other logic based on productID (e.g., adding to cart, deleting, etc.)
  
  orderInfo.productID = productID;
  orderInfo.orderID = generateUUID();
  
  // API endpoint for product orders
  const apiEndpoint = "https://6d66vomwvf.execute-api.eu-west-1.amazonaws.com/prod/orderProduct";

  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure the POST request
  xhr.open("POST", apiEndpoint, true); // Asynchronous request
  xhr.setRequestHeader("Content-Type", "application/json"); // Set the correct content type
  
  // Handle the response
  xhr.onload = function () {
	  if (xhr.status === 200) {
		  console.log("Order submitted successfully");
		  alert("Order submitted successfully");
	  } else {
		  console.error("Error submitting order:", xhr.status, xhr.statusText);
		  alert("Error submitting order");
	  }
  };

  // Handle errors during the request
  xhr.onerror = function () {
	  console.error("Network error during order submission");
	  alert("Failed to submit order due to network error");
  };

  // Convert the order information to JSON and send the request
  xhr.send(JSON.stringify(orderInfo));
}

function generateUUID() {
    // Generate a version 4 UUID
    const uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );

    return uuid; // Return the generated UUID
}

function addExampleProducts() {
  // Use a try-catch block to handle potential errors
  try {
    // Replace with your API Gateway endpoint
    const apiEndpoint =
      "https://6d66vomwvf.execute-api.eu-west-1.amazonaws.com/prod/exampleProducts";

    // Create a new XMLHttpRequest object with a try-catch block
    const xhr = new XMLHttpRequest();

    // Configure the request with a try-catch block
    try {
      xhr.open("POST", apiEndpoint, true); // True for asynchronous request
      xhr.setRequestHeader("Content-Type", "application/json"); // Set content type
    } catch (err) {
      alert("Error configuring the request: " + err.message);
      return; // Exit if configuration fails
    }

    // Handle the response with error handling
    xhr.onload = function () {
      try {
        if (xhr.status === 200) {
          // Request was successful
          alert("Products added successfully!");
        } else {
          // Handle error based on status code
          alert("Error adding products: " + xhr.statusText);
        }
      } catch (err) {
        alert("Error handling response: " + err.message);
      }
    };

    // Use a try-catch block to send the request
    try {
      xhr.send(); // No data needed since this is adding predefined products
    } catch (err) {
      alert("Error sending the request: " + err.message);
    }
  } catch (err) {
    // Handle unexpected errors
    alert("An unexpected error occurred: " + err.message);
  }
}

// create example products on the DDB products table
function addExampleProductsOld() {
  // Replace with your API Gateway endpoint
  const apiEndpoint =
    "https://5c7udmvoaf.execute-api.eu-west-1.amazonaws.com/prod/exampleProducts";

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", apiEndpoint, true); // True for asynchronous request
  xhr.setRequestHeader("Content-Type", "application/json"); // Set content type

  // Handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Request was successful
      alert("Products added successfully!");
    } else {
      // Handle error
      alert("Error adding products: " + xhr.responseText);
    }
  };

  // Send the request
  xhr.send(); // No data needed since this is adding predefined products
}

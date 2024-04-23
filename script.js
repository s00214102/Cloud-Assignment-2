function fetchProducts() {
	var api = "https://uzsqacvi89.execute-api.eu-west-1.amazonaws.com/dev/saves";

	fetch(api, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			var items = JSON.parse(data.body);
			// Recursively parse any JSON strings within the object
			items.forEach((item) => recursivelyParseJson(item));
			var formattedJson = JSON.stringify(items, null, 2);

			document.getElementById("gameSavesData").value = formattedJson;
		})
		.catch((error) => {
			console.error("Error:", error);
			document.getElementById("gameSavesData").textContent =
				"Failed to fetch game saves: " + error;
		});
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

const displayField = document.querySelector('input[type="text"]');
const buttons = document.querySelectorAll('input[type="button"]');

// API endpoint for math evaluation
const mathApiEndpoint = "https://api.mathjs.org/v4/";

// Attach event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
    const buttonValue = event.target.value;

    // If "clear" button is clicked
    if (buttonValue.toLowerCase() === 'clear') {
        displayField.value = '';
        return;
    }

    // If "equals" button is clicked
    if (buttonValue.toLowerCase() === 'equals' || buttonValue === '=') {
        calculateResult();
        return;
    }

    // For all other buttons, append value to the display
    displayField.value += buttonValue;
}

// Calculate the result using the Math.js API
async function calculateResult() {
    try {
        const expression = displayField.value.replace(/x/g, '*'); // Replace 'x' with '*' for multiplication
        const response = await fetch(mathApiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expr: expression }), // Send the expression to the API
        });

        if (!response.ok) {
            throw new Error("API error");
        }

        const result = await response.json();
        displayField.value = result.result; // Display the calculated result
    } catch (error) {
        console.error("Error during calculation:", error);
        displayField.value = 'Error'; // Show 'Error' for invalid expressions or API issues
    }
}

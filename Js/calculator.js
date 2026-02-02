
        let display = document.getElementById('display');
        let currentInput = '0';
        let shouldResetDisplay = false;

        // Display Functions
        function updateDisplay() {
            display.value = currentInput;
        }

        function appendToDisplay(value) {
            if (shouldResetDisplay) {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '0';
            shouldResetDisplay = false;
            updateDisplay();
        }

        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        // Operator Functions (using native operators)
        function add(x, y) { return x + y; }
        function subtract(x, y) { return x - y; }
        function multiply(x, y) { return x * y; }
        function divide(x, y) { 
            if (y === 0) {
                alert('Error: Division by zero!');
                return null;
            }
            return x / y; 
        }

        // Power Functions
        function square(num) { 
            const value = parseFloat(currentInput);
            currentInput = (value * value).toString();
            shouldResetDisplay = true;
            updateDisplay();
        }

        function cube(num) { 
            const value = parseFloat(currentInput);
            currentInput = (value * value * value).toString();
            shouldResetDisplay = true;
            updateDisplay();
        }

        // Main Calculate Function
        function calculate() {
            try {
                // Replace × with * for evaluation
                let expression = currentInput.replace(/×/g, '*');
                let result = Function('"use strict"; return (' + expression + ')')();
                
                if (isNaN(result) || !isFinite(result)) {
                    throw new Error('Invalid calculation');
                }
                
                currentInput = result.toString().slice(0, 12); // Limit digits
                shouldResetDisplay = true;
                updateDisplay();
            } catch (error) {
                alert('Invalid expression!');
                clearDisplay();
            }
        }
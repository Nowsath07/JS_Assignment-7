class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForNewOperand = false;

        this.display = document.getElementById('display');
        this.prevDisplay = document.querySelector('.previous-operand');

        this.buttons = document.querySelectorAll('button[data-value], button[data-action]');
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const { value, action } = btn.dataset;
                if (value !== undefined) this.inputDigit(value);
                if (action) this.handleAction(action);
            });
        });
    }

    /* ---------------- INPUT ---------------- */

    inputDigit(digit) {
        if (digit === '.' && this.currentOperand.includes('.')) return;

        if (this.waitingForNewOperand) {
            this.currentOperand = digit;
            this.waitingForNewOperand = false;
        } else {
            this.currentOperand =
                this.currentOperand === '0' ? digit : this.currentOperand + digit;
        }
        this.updateDisplay();
    }

    /* ---------------- ACTIONS ---------------- */

    handleAction(action) {
        switch (action) {
            case 'clear': return this.clear();
            case 'delete': return this.backspace();
            case 'equals': return this.calculate();
            case 'square': return this.square();
            case 'cube': return this.cube();
            case 'sqrt': return this.sqrt();
            case 'power': return this.setOperation('power');
            case 'addition': return this.setOperation('+');
            case 'subtract': return this.setOperation('-');
            case 'multiply': return this.setOperation('*');
            case 'divide': return this.setOperation('/');
        }
    }

    setOperation(op) {
        if (!this.waitingForNewOperand) this.calculate();

        this.operation = op;
        this.previousOperand = this.currentOperand;
        this.waitingForNewOperand = true;
        this.updateDisplay();
    }

    /* ---------------- CALCULATION ---------------- */

    calculate() {
        if (!this.operation || this.previousOperand === '') return;

        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        let result;

        switch (this.operation) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/': result = curr === 0 ? 'Error' : prev / curr; break;
            case 'power': result = Math.pow(prev, curr); break;
            default: return;
        }

        this.currentOperand = result.toString();
        this.previousOperand = '';
        this.operation = null;
        this.waitingForNewOperand = true;
        this.updateDisplay();
    }

    /* ---------------- ADVANCED ---------------- */

    square() {
        this.currentOperand = (Math.pow(+this.currentOperand, 2)).toString();
        this.updateDisplay();
    }

    cube() {
        this.currentOperand = (Math.pow(+this.currentOperand, 3)).toString();
        this.updateDisplay();
    }

    sqrt() {
        const n = +this.currentOperand;
        this.currentOperand = n < 0 ? 'Error' : Math.sqrt(n).toString();
        this.updateDisplay();
    }

    /* ---------------- UTILS ---------------- */

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForNewOperand = false;
        this.updateDisplay();
    }

    backspace() {
        this.currentOperand =
            this.currentOperand.length > 1
                ? this.currentOperand.slice(0, -1)
                : '0';
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.currentOperand;
        this.prevDisplay.textContent =
            this.previousOperand && this.operation
                ? `${this.previousOperand} ${this.getSymbol()}`
                : '';
    }

    getSymbol() {
        return { '+': '+', '-': '−', '*': '×', '/': '÷', 'power': '^' }[this.operation] || '';
    }
}

document.addEventListener('DOMContentLoaded', () => new Calculator());

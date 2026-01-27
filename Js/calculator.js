class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForNewOperand = false;
        
        this.display = document.getElementById('display');
        this.buttons = document.querySelectorAll('button[data-value], button[data-action]');
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const { value, action } = e.target.dataset;
                if (value) this.inputDigit(value);
                else if (action) this.handleAction(action);
            });
        });
    }

    inputDigit(digit) {
        if (this.waitingForNewOperand) {
            this.currentOperand = digit;
            this.waitingForNewOperand = false;
        } else {
            this.currentOperand = this.currentOperand === '0' ? digit : this.currentOperand + digit;
        }
        this.updateDisplay();
    }

    handleAction(action) {
        switch(action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'square':
                this.square();
                break;
            case 'cube':
                this.cube();
                break;
            case 'sqrt':
                this.sqrt();
                break;
            case 'power':
                this.power();
                break;
            default:
                this.setOperation(action);
                break;
        }
    }

    // Pure arithmetic operator functions
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return b !== 0 ? a / b : 'Error'; }

    // Advanced math functions
    square() {
        const num = parseFloat(this.currentOperand);
        if (!isNaN(num)) {
            this.currentOperand = (num * num).toString();
            this.updateDisplay();
        }
    }

    cube() {
        const num = parseFloat(this.currentOperand);
        if (!isNaN(num)) {
            this.currentOperand = (num * num * num).toString();
            this.updateDisplay();
        }
    }

    sqrt() {
        const num = parseFloat(this.currentOperand);
        if (!isNaN(num) && num >= 0) {
            this.currentOperand = Math.sqrt(num).toString();
            this.updateDisplay();
        } else {
            this.currentOperand = 'Error';
        }
    }

    power() {
        if (this.operation) this.calculate();
        this.operation = 'power';
        this.previousOperand = this.currentOperand;
        this.waitingForNewOperand = true;
    }

    setOperation(nextOperation) {
        if (this.operation && !this.waitingForNewOperand) {
            this.calculate();
        }
        this.operation = nextOperation;
        this.previousOperand = this.currentOperand;
        this.waitingForNewOperand = true;
    }

    calculate() {
        if (!this.operation || !this.previousOperand || !this.currentOperand) return;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch(this.operation) {
            case '+': result = this.add(prev, current); break;
            case '-': result = this.subtract(prev, current); break;
            case '*': result = this.multiply(prev, current); break;
            case '/': result = this.divide(prev, current); break;
            case 'power': result = Math.pow(prev, current); break;
            default: return;
        }

        this.currentOperand = result.toString();
        this.operation = null;
        this.previousOperand = '';
        this.waitingForNewOperand = true;
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForNewOperand = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1) || '0';
    }

    updateDisplay() {
        this.display.textContent = this.currentOperand;
        document.querySelector('.previous-operand').textContent = 
            this.previousOperand && this.operation ? 
            `${this.previousOperand} ${this.getOperationSymbol()} ` : '';
    }

    getOperationSymbol() {
        const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        return symbols[this.operation] || '';
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

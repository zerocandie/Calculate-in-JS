// Получаем элементы
const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');


let currentInput = '';
let previousInput = '';
let operation = null;
let equalsPressed = false;


const meowSound = new Audio('sounds/meow.mp3');


function UpdateDisplay() {
    display.textContent = currentInput || '0';
}

function IsNumber(value) {
    return /\d/.test(value);
}


function IsOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}


function currentnumb(value) {
    if (equalsPressed) {
        currentInput = value;
        equalsPressed = false;
    } else {
        currentInput += value;
    }
}


function handleOperator(op) {
    if (currentInput === '') return;

    if (previousInput !== '' && operation) {
        calculate();
    }

    previousInput = currentInput;
    operation = op;
    equalsPressed = true;
}

function calculate() {
    if (currentInput === '' || previousInput === '' || operation === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Ошибка' : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    equalsPressed = true;
}


function playFireworks() {
    const container = document.createElement('div');
    container.id = 'fireworks';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        spark.classList.add('firework');

        const hue = Math.random() * 360;
        spark.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        spark.style.animationDelay = Math.random() * 0.5 + 's';

        container.appendChild(spark);
    }

    setTimeout(() => {
        container.remove();
    }, 2000);
}


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();


        if (IsNumber(value)) {
            meowSound.currentTime = 0;
            meowSound.play().catch(e => console.log("Звук заблокирован (нажми на страницу)", e));
        }

        if (IsNumber(value)) {
            currentnumb(value);
        } else if (IsOperator(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculate();
            playFireworks();
        }

        UpdateDisplay();
    });
});

// Инициализация
UpdateDisplay();
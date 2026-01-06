// Navigation Logic
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.learning-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('animate-fade-in');
    });

    // Remove active state from nav buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-slate-800', 'text-brand-400', 'border-r-2', 'border-brand-500');
        btn.classList.add('text-slate-400');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('animate-fade-in'); // Add animation class if you have one or just showing it
    }

    // Highlight nav button
    const activeBtn = document.querySelector(`button[data-target="${sectionId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('bg-slate-800', 'text-brand-400');
        activeBtn.classList.remove('text-slate-400');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('intro');
});


// --- Variables Logic ---
let score = 0;
const maxScore = 100;

function updateScore() {
    score++;
    document.getElementById('scoreVal').innerText = score;
    logVar(`score reassigned to ${score} (Allowed: 'let' declaration)`);
}

function updateMax() {
    logVar(`ReferenceError: Assignment to constant variable. (Error: 'const' declaration)`, true);
}

function logVar(msg, isError = false) {
    const consoleDiv = document.getElementById('varConsole');
    const line = document.createElement('div');
    line.className = isError ? 'text-red-400' : 'text-green-400';
    line.innerText = `> ${msg}`;
    consoleDiv.appendChild(line);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function checkType() {
    const input = document.getElementById('typeInput').value;
    const resultBox = document.getElementById('typeResult');

    // Try to parse basic types
    let type = 'string';
    let displayVal = `'${input}'`;

    if (input === 'true' || input === 'false') {
        type = 'boolean';
        displayVal = input;
    } else if (!isNaN(input) && input.trim() !== '') {
        type = 'number';
        displayVal = input;
    } else if (input === 'null') {
        type = 'object (null bug)';
        displayVal = 'null';
    } else if (input === 'undefined') {
        type = 'undefined';
        displayVal = 'undefined';
    } else if (input.startsWith('{') || input.startsWith('[')) {
        type = 'object';
        displayVal = input; // Simplified
    }

    resultBox.innerHTML = `
        <span class="text-xs text-slate-500 uppercase tracking-widest mb-1">Detected Type</span>
        <span class="text-3xl font-bold text-brand-400 mb-2">${type}</span>
         <span class="text-sm text-slate-400 font-mono">${typeof input === 'string' ? 'Input is string by default, parsed logic applied.' : ''}</span>
    `;
}


// --- Functions Logic ---
function runFuncDemo(type) {
    const output = document.getElementById('funcOutput');
    output.innerText = '';

    if (type === 'decl') {
        output.innerHTML = `> Executing Function Declaration:<br>
        <span class="text-yellow-300">function greet(n) { return "Hello " + n; }</span><br>
        > Result: "Hello User"`;
    } else {
        output.innerHTML = `> Executing Arrow Function:<br>
        <span class="text-purple-300">const greet = (n) => "Hi " + n;</span><br>
        > Result: "Hi User"`;
    }
}

function checkScope() {
    const consoleDiv = document.getElementById('scopeConsole');
    consoleDiv.innerHTML = '';

    // Simulating scope access
    consoleDiv.innerHTML += `> Accessing globalVar: "I am everywhere" <span class="text-green-500">✔ OK</span><br>`;
    consoleDiv.innerHTML += `> Accessing localVar: "I am trapped!" <span class="text-green-500">✔ OK (Inside function)</span><br>`;

    setTimeout(() => {
        consoleDiv.innerHTML += `> Trying to access localVar from outside... <br>`;
        setTimeout(() => {
            consoleDiv.innerHTML += `<span class="text-red-500">Uncaught ReferenceError: localVar is not defined</span>`;
        }, 800);
    }, 800);
}


// --- DOM Logic ---
function domAction(action) {
    const box = document.getElementById('targetBox');
    const code = document.getElementById('domCode');

    switch (action) {
        case 'color':
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            box.style.backgroundColor = randomColor;
            code.innerText = `box.style.backgroundColor = "${randomColor}";`;
            break;
        case 'shape':
            box.classList.toggle('rounded-full');
            code.innerText = `box.classList.toggle('rounded-full');`;
            break;
        case 'text':
            const texts = ['HELLO', 'DOM', 'JS', 'BOX'];
            const t = texts[Math.floor(Math.random() * texts.length)];
            box.querySelector('span').innerText = t;
            code.innerText = `box.innerText = "${t}";`;
            break;
        case 'hide':
            if (box.style.opacity === '0') {
                box.style.opacity = '1';
                code.innerText = `box.style.opacity = "1";`;
            } else {
                box.style.opacity = '0';
                code.innerText = `box.style.opacity = "0";`;
            }
            break;
    }
}


// --- Events Logic ---
const eventLog = document.getElementById('eventLog');

function logEvent(text) {
    const div = document.createElement('div');
    div.innerHTML = `<span class="text-brand-500">[Event]</span> ${text}`;
    eventLog.prepend(div);
}

function clearEventLog() {
    eventLog.innerHTML = '<div><span class="text-slate-500">[System]</span> Ready for events...</div>';
}

// Event Listeners
const clickBtn = document.getElementById('clickBtn');
if (clickBtn) {
    clickBtn.addEventListener('click', () => logEvent('Button Clicked!'));
}

const inputEvent = document.getElementById('inputEvent');
if (inputEvent) {
    inputEvent.addEventListener('input', (e) => logEvent(`Input: "${e.target.value}"`));
    inputEvent.addEventListener('focus', () => logEvent('Input Focused'));
    inputEvent.addEventListener('blur', () => logEvent('Input Blurred'));
}

const hoverBox = document.getElementById('hoverBox');
if (hoverBox) {
    hoverBox.addEventListener('mouseenter', () => {
        hoverBox.classList.add('border-brand-500', 'text-brand-500');
        logEvent('Mouse Enter');
    });
    hoverBox.addEventListener('mouseleave', () => {
        hoverBox.classList.remove('border-brand-500', 'text-brand-500');
        logEvent('Mouse Leave');
    });
}


// --- Operators Logic ---
function checkOperator() {
    const v1Text = document.getElementById('opInput1').value;
    const v2Text = document.getElementById('opInput2').value;
    const op = document.getElementById('opSelect').value;
    const resultBox = document.getElementById('opResult');

    // Parse inputs (naive parsing for demo)
    const parse = (v) => {
        if (!isNaN(v) && v.trim() !== '') return Number(v);
        if (v === 'true') return true;
        if (v === 'false') return false;
        if (v === 'null') return null;
        if (v === 'undefined') return undefined;
        return v;
    }

    const v1 = parse(v1Text);
    const v2 = parse(v2Text);

    let res;
    let explanation = '';

    try {
        switch (op) {
            case '==': res = (v1 == v2); explanation = "Check value only"; break;
            case '===': res = (v1 === v2); explanation = "Check value AND type"; break;
            case '>': res = (v1 > v2); explanation = "Greater than"; break;
            case '<': res = (v1 < v2); explanation = "Less than"; break;
            case '+': res = (v1 + v2); explanation = "Addition"; break;
            case '-': res = (v1 - v2); explanation = "Subtraction"; break;
            case '*': res = (v1 * v2); explanation = "Multiplication"; break;
            case '/': res = (v1 / v2); explanation = "Division"; break;
            case '%': res = (v1 % v2); explanation = "Modulus (Remainder)"; break;
        }
    } catch (e) {
        res = "Error";
    }

    const color = res === true ? 'text-green-500' : (res === false ? 'text-red-500' : 'text-slate-500');

    resultBox.innerHTML = `
        <div class="text-xs text-slate-500 mb-2">Compared: <span class="text-white">${typeof v1}</span> vs <span class="text-white">${typeof v2}</span></div>
        <div class="text-4xl font-bold ${color}">${res}</div>
        <div class="text-xs text-brand-400 mt-2">${explanation}</div>
    `;
}

// --- Conditional Statements Logic ---
function runLoopDemo() {
    const visualizer = document.getElementById('loopVisualizer');
    visualizer.innerHTML = ''; // Clear container

    let i = 1;
    function step() {
        if (i <= 5) {
            const box = document.createElement('div');
            box.className = 'w-10 h-10 bg-brand-600 rounded flex items-center justify-center text-white font-bold animate-fade-in shadow-lg shadow-brand-500/50';
            box.innerText = i;
            visualizer.appendChild(box);
            i++;
            setTimeout(step, 500); // Delay for next step
        } else {
            // Optional: Show "Done" message or effect
            const done = document.createElement('div');
            done.className = 'text-green-400 text-xs font-mono ml-2 animate-fade-in';
            done.innerText = '// Done';
            visualizer.appendChild(done);
        }
    }
    step();
}


// --- Arrays & Objects Logic ---
const demoArray = [1, 2, 3, 4, 5];
let userObj = {
    name: "Eniyaa",
    role: "Developer",
    skills: ["JS", "HTML"]
};

function runArrayMethod(method) {
    const output = document.getElementById('arrayOutput');
    let res, code;

    switch (method) {
        case 'map':
            res = demoArray.map(x => x * 2);
            code = `[1,2,3,4,5].map(x => x * 2)`;
            break;
        case 'filter':
            res = demoArray.filter(x => x > 2);
            code = `[1,2,3,4,5].filter(x => x > 2)`;
            break;
        case 'reduce':
            res = demoArray.reduce((sum, x) => sum + x, 0);
            code = `[1,2,3,4,5].reduce((sum, x) => sum + x)`;
            break;
    }

    output.innerHTML = `
        <div class="text-xs text-slate-500 mb-1">${code}</div>
        <div>Result: <span class="text-yellow-400">${JSON.stringify(res)}</span></div>
    `;
}

function manipulateObject(action) {
    const output = document.getElementById('objectOutput');

    if (action === 'update') {
        userObj.role = "Senior Dev";
    } else if (action === 'add') {
        userObj.level = 99;
    }

    output.innerText = `// Current state:\n` + JSON.stringify(userObj, null, 2);
}


// --- Async Logic ---
async function fetchDataSim() {
    const btn = document.getElementById('fetchBtn');
    const loader = document.getElementById('loader');
    const output = document.getElementById('asyncOutput');

    // Reset UI
    output.innerHTML = '<span class="text-slate-500">// Status: Fetching...</span>';
    btn.disabled = true;
    loader.classList.remove('hidden');

    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockData = { id: 1, user: "Eniyaa", status: "Active" };

        output.innerHTML = `
            <div class="text-green-400 mb-1">// Success (200 OK)</div>
            <pre class="text-xs text-slate-300">Data: ${JSON.stringify(mockData, null, 2)}</pre>
        `;
    } catch (err) {
        output.innerHTML = `<span class="text-red-500">// Error: ${err.message}</span>`;
    } finally {
        btn.disabled = false;
        loader.classList.add('hidden');
    }
}

async function realFetch() {
    const output = document.getElementById('fetchResult');
    output.innerText = "// Fetching from JSONPlaceholder...";

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();

        output.classList.remove('text-red-400');
        output.classList.add('text-green-400');
        output.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        output.classList.remove('text-green-400');
        output.classList.add('text-red-400');
        output.innerText = `Error: ${error.message}`;
    }
}

// --- ES6 Features Logic ---
function runES6Demo(type) {
    if (type === 'spread') {
        const arr = [1, 2, 3];
        const [first, ...rest] = arr;
        const newArr = [...arr, 4, 5];

        const output = document.getElementById('es6SpreadOutput');
        output.innerText = `
> Original: [${arr}]
> Destructured 'first': ${first}
> Destructured 'rest': [${rest}]
> Spread 'newArr': [${newArr}]
        `.trim();
    } else if (type === 'template') {
        const name = document.getElementById('tlName').value || 'User';
        const role = document.getElementById('tlRole').value || 'Guest';

        // Template literal demo
        const greeting = `Hello, ${name}! You are logged in as ${role}.`;

        document.getElementById('es6TemplateOutput').innerText = `"${greeting}"`;
    }
}

// --- OOP Features Logic ---
class Robot {
    constructor(name) {
        this.name = name;
        this.battery = 100;
    }

    speak() {
        if (this.battery > 0) {
            this.battery -= 10;
            return `[${this.name}]: BEEP BOOP! (Battery: ${this.battery}%)`;
        } else {
            return `[${this.name}]: ... (Battery Empty)`;
        }
    }
}

let myRobot = null;

function createRobot() {
    const nameInput = document.getElementById('robotName').value;
    const output = document.getElementById('oopOutput');

    if (!nameInput) {
        output.innerText = "// Please name your robot first!";
        output.classList.add('text-red-400');
        return;
    }

    myRobot = new Robot(nameInput);
    output.classList.remove('text-red-400');
    output.innerHTML = `<span class="text-green-400">System:</span> Robot "<strong>${myRobot.name}</strong>" created successfully!<br>Battery: ${myRobot.battery}%`;
}

function robotSpeak() {
    const output = document.getElementById('oopOutput');
    if (!myRobot) {
        output.innerText = "// Create a robot first!";
        output.classList.add('text-red-400');
        return;
    }
    output.classList.remove('text-red-400');
    output.innerText = myRobot.speak();
}


// --- Local Storage Logic ---
const storageInput = document.getElementById('storageInput');
const storageStatus = document.getElementById('storageStatus');

function loadNote() {
    const savedNote = localStorage.getItem('userNote');
    if (savedNote && storageInput) {
        storageInput.value = savedNote;
        if (storageStatus) {
            storageStatus.innerText = "Loaded from storage!";
            setTimeout(() => storageStatus.innerText = "", 2000);
        }
    }
}

function saveNote() {
    if (!storageInput) return;
    const note = storageInput.value;
    localStorage.setItem('userNote', note);
    if (storageStatus) {
        storageStatus.innerText = "Saved to storage!";
        storageStatus.classList.add('text-green-500');
        setTimeout(() => {
            storageStatus.innerText = "";
            storageStatus.classList.remove('text-green-500');
        }, 2000);
    }
}

function clearNote() {
    localStorage.removeItem('userNote');
    if (storageInput) storageInput.value = "";
    if (storageStatus) {
        storageStatus.innerText = "Storage cleared!";
        storageStatus.classList.add('text-red-500');
        setTimeout(() => {
            storageStatus.innerText = "";
            storageStatus.classList.remove('text-red-500');
        }, 2000);
    }
}

// Load note on startup if element exists
if (storageInput) {
    document.addEventListener('DOMContentLoaded', loadNote);
}

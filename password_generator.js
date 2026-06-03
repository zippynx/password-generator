const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*-+=?";

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("password-length");
const lengthValEl = document.getElementById("length-val");
const generateBtn = document.getElementById("generate-button");
const copyBtn = document.getElementById("copy-button");
const toggleBtn = document.getElementById("toggle-visibility");

const strengthText = document.getElementById("strength-text");
const entropyDisplay = document.getElementById("entropy-display");
const statusLeft = document.querySelector(".status-left");

const segments = [
    document.getElementById("seg-1"),
    document.getElementById("seg-2"),
    document.getElementById("seg-3"),
    document.getElementById("seg-4")
];

const toast = document.getElementById("toast");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const eyeOpenSVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const eyeClosedSVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

const checkSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
const warnSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

lengthEl.addEventListener("input", (e) => {
    lengthValEl.innerText = e.target.value;
    updateSliderBackground();
});
lengthEl.addEventListener("change", generate);
checkboxes.forEach(box => box.addEventListener("change", generate));
generateBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", copyPassword);

toggleBtn.addEventListener("click", () => {
    const isPassword = resultEl.type === "password";
    resultEl.type = isPassword ? "text" : "password";
    toggleBtn.innerHTML = isPassword ? eyeOpenSVG : eyeClosedSVG;
});

function updateSliderBackground() {
    const val = (lengthEl.value - lengthEl.min) / (lengthEl.max - lengthEl.min) * 100;
    lengthEl.style.background = `linear-gradient(to right, var(--brand-teal) 0%, var(--brand-teal) ${val}%, var(--bg-input) ${val}%)`;
}

function secureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function secureShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = secureRandom(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generate() { 
    let selectedTypes = [];
    let combinedChars = "";
    
    if (document.getElementById("lowercase-option").checked) { selectedTypes.push(lowercase); combinedChars += lowercase; }
    if (document.getElementById("uppercase-option").checked) { selectedTypes.push(uppercase); combinedChars += uppercase; }
    if (document.getElementById("number-option").checked) { selectedTypes.push(numbers); combinedChars += numbers; }
    if (document.getElementById("special-option").checked) { selectedTypes.push(symbols); combinedChars += symbols; }

    if (selectedTypes.length === 0) {
        resultEl.value = "";
        resetMetrics();
        return;
    }

    let length = Number(lengthEl.value); 
    if (length < selectedTypes.length) {
        length = selectedTypes.length;
        lengthEl.value = length;
        lengthValEl.innerText = length;
        updateSliderBackground();
    }

    let generatedPassword = [];
    selectedTypes.forEach(type => generatedPassword.push(type[secureRandom(type.length)]));

    for (let i = generatedPassword.length; i < length; i++) { 
        generatedPassword.push(combinedChars[secureRandom(combinedChars.length)]); 
    } 

    generatedPassword = secureShuffleArray(generatedPassword);
    resultEl.value = generatedPassword.join('');
    
    calculateMetrics(length, combinedChars.length);
} 

function calculateMetrics(length, poolSize) {
    const entropy = Math.floor(length * Math.log2(poolSize));
    entropyDisplay.innerText = `${entropy} bits`; 

    segments.forEach(seg => {
        seg.style.background = "var(--bg-input)";
    });

    const colWeak = "var(--sec-weak)";
    const colFair = "var(--sec-fair)";
    const colGood = "var(--sec-good)";
    const colExcellent = "var(--sec-excellent)";

    if (entropy < 40) {
        updateStatusUI(warnSVG, colWeak, "Weak");
        fillSegments(1, [colWeak]);
    } else if (entropy < 60) {
        updateStatusUI(warnSVG, colFair, "Fair");
        fillSegments(2, [colFair, colFair]); 
    } else if (entropy < 80) {
        updateStatusUI(checkSVG, colGood, "Good");
        fillSegments(3, [colGood, colGood, colGood]);
    } else {
        updateStatusUI(checkSVG, colExcellent, "Excellent");
        fillSegments(4, [colExcellent, colExcellent, colExcellent, colExcellent]);
    }
}

function fillSegments(count, colors) {
    for (let i = 0; i < count; i++) {
        segments[i].style.background = colors[i];
    }
}

function updateStatusUI(svg, color, text) {
    statusLeft.innerHTML = `${svg} <span id="strength-text">${text}</span>`;
    statusLeft.style.color = color;
}

function resetMetrics() {
    statusLeft.innerHTML = `${warnSVG} <span id="strength-text">Select Options</span>`;
    statusLeft.style.color = "var(--text-muted)";
    entropyDisplay.innerText = `0 bits`;
    fillSegments(0, []);
}

function copyPassword() {
    if (!resultEl.value) return; 
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(resultEl.value).then(showToast).catch(fallbackCopy);
    } else {
        fallbackCopy();
    }
    function fallbackCopy() {
        resultEl.select();
        try { document.execCommand('copy'); showToast(); } 
        catch (err) { console.error("Copy failed", err); }
    }
}

let toastTimeout;
function showToast() {
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2000);
}

updateSliderBackground();
generate();
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const balanceDisplay = document.getElementById("balance");
const messageDisplay = document.getElementById("message");
const spinsLeftDisplay = document.getElementById("spinsLeft");
const saveNameButton = document.getElementById("saveName");
const playerNameInput = document.getElementById("playerName");

let balance = 0;
let spinsLeft = 3;
let playerName = "";

// Призові сектори
const sectors = [0.001, 0.01, 0.05, 0.1, 0.2, 0.5, 1, 1.5, "x2"];

// Завантаження даних гравця
function loadPlayerData() {
    playerName = localStorage.getItem("playerName") || "";
    balance = parseFloat(localStorage.getItem("balance")) || 0;
    spinsLeft = parseInt(localStorage.getItem("spinsLeft")) || 3;

    playerNameInput.value = playerName;
    balanceDisplay.innerText = `Balance: ${balance.toFixed(3)} SVX`;
    spinsLeftDisplay.innerText = `Spins left: ${spinsLeft}`;
}

// Збереження даних гравця
function savePlayerData() {
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("balance", balance);
    localStorage.setItem("spinsLeft", spinsLeft);
}

// Оновлення залишку прокрутів
function checkSpinLimit() {
    if (spinsLeft === 0) {
        spinButton.disabled = true;
        messageDisplay.innerText = "You have used all spins. Try again in 2 hours.";

        setTimeout(() => {
            spinsLeft = 3;
            spinButton.disabled = false;
            spinsLeftDisplay.innerText = `Spins left: ${spinsLeft}`;
            savePlayerData();
        }, 2 * 60 * 60 * 1000); // 2 години
    }
}

// Обертання колеса
function spinWheel() {
    if (spinsLeft <= 0) {
        messageDisplay.innerText = "No spins left!";
        return;
    }

    const sectorIndex = Math.floor(Math.random() * sectors.length);
    const prize = sectors[sectorIndex];

    const degrees = 3600 + (sectorIndex * 40); // Кут обертання
    wheel.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
        if (prize === "x2") {
            balance *= 2;
            messageDisplay.innerText = `You won x2! Your balance doubled!`;
        } else {
            balance += prize;
            messageDisplay.innerText = `You won ${prize} SVX!`;
        }

        spinsLeft--;
        balanceDisplay.innerText = `Balance: ${balance.toFixed(3)} SVX`;
        spinsLeftDisplay.innerText = `Spins left: ${spinsLeft}`;
        
        savePlayerData();
        checkSpinLimit();
    }, 3000);
}

// Збереження імені
saveNameButton.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();
    if (playerName) {
        localStorage.setItem("playerName", playerName);
        messageDisplay.innerText = `Welcome, ${playerName}!`;
    }
});

spinButton.addEventListener("click", spinWheel);

loadPlayerData();
checkSpinLimit();

const userInput = document.getElementById("quantity");
const reset = document.querySelector(".reset");
const grid = document.querySelector("#gridContainer");
const rainbow = document.querySelector(".rainbow");
const classic = document.querySelector(".classic");
const eraser = document.querySelector(".eraser");
const warningMessage = document.querySelector(".warning-message");

let mode = "classic";

const createGrid = () => {
    grid.innerHTML = "";
    const gridSize = 16;
    const squareSize = 575 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
        square.setAttribute("data-brightness", 1);
        grid.appendChild(square);
    }

    addSquareEventListeners();
};

const updateGrid = () => {
    mode = "classic";
    const gridSize = parseInt(userInput.value);

    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        warningMessage.textContent = "Please enter a size between 1 and 100.";
        return;
    } else {
        warningMessage.textContent = "";
    }

    grid.innerHTML = "";
    const squareSize = 575 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
        square.setAttribute("data-brightness", 1);
        grid.appendChild(square);
    }

    addSquareEventListeners();
};

userInput.addEventListener("change", updateGrid);

const addSquareEventListeners = () => {
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("mouseover", handleMouseOver);
    });
};

const handleMouseOver = (event) => {
    const square = event.target;
    let brightness = parseFloat(square.getAttribute("data-brightness"));

    if( mode === "eraser"){
        square.style.backgroundColor = "white";
        square.style.filter = "brightness(1)";
        square.setAttribute("data-brightness", 1);
    }else if (brightness === 1) {
        if (mode === "classic") {
            square.style.backgroundColor = "grey";
        } else {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            square.style.backgroundColor = "#" + randomColor;
        }
    }

    if (mode !== "eraser" && brightness > 0.1) {
        brightness -= 0.1;
        square.style.filter = `brightness(${brightness})`;
        square.setAttribute("data-brightness", brightness);
    }
};

eraser.addEventListener("click", () =>{
    mode = "eraser";
    addSquareEventListeners();
});

classic.addEventListener("click", () => {
    mode = "classic";
    addSquareEventListeners();
});

rainbow.addEventListener("click", () => {
    mode = "rainbow";
    addSquareEventListeners();
});

reset.addEventListener("click", () => {
    grid.innerHTML = "";
    userInput.value = "";
    warningMessage.textContent = "";
    mode = "classic";
    createGrid();
});

createGrid();

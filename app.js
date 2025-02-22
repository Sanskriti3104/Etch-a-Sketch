const grid = document.querySelector("#gridContainer");
const userInput = document.getElementById("quantity");
const warningMessage = document.querySelector(".warning-message");
const classic = document.querySelector(".classic");
const rainbow = document.querySelector(".rainbow");
const chooseColor = document.querySelector(".chooseColor");
const choosenColor = document.querySelector("#choosenColor");
const eraser = document.querySelector(".eraser");
const reset = document.querySelector(".reset");

let mode = "classic";
let color = null;

// Function to create the grid
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

// Function to update the grid based on user input
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

// Function to add event listeners to grid squares
const addSquareEventListeners = () => {
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("mouseover", handleMouseOver);
    });
};

// Function to handle mouseover event for grid squares
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
        } else if(mode === "rainbow"){
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            square.style.backgroundColor = "#" + randomColor;
        }else{
            square.style.backgroundColor = color;
        }
    }

    if (mode !== "eraser" && brightness > 0.1) {
        brightness -= 0.1;
        square.style.filter = `brightness(${brightness})`;
        square.setAttribute("data-brightness", brightness);
    }
};

// Mode selection event listeners
classic.addEventListener("click", () => {
    mode = "classic";
    addSquareEventListeners();
});

rainbow.addEventListener("click", () => {
    mode = "rainbow";
    addSquareEventListeners();
});

eraser.addEventListener("click", () =>{
    mode = "eraser";
    addSquareEventListeners();
});

choosenColor.addEventListener("input",function () {
    color = this.value;
    mode = "favColor";
    addSquareEventListeners(color);
});

// Reset button functionality
reset.addEventListener("click", () => {
    grid.innerHTML = "";
    userInput.value = "";
    warningMessage.textContent = "";
    mode = "classic";
    createGrid();
});

// Initialize the grid on page load
createGrid();
const userInput = document.getElementById("quantity");
const reset = document.querySelector(".reset");
const grid = document.querySelector("#gridContainer");
const rainbow = document.querySelector(".rainbow");
const classic = document.querySelector(".classic");
let mode = "classic";

createGrid = () => {
    grid.innerHTML = "";
    const gridSize = 16;
    const squareSize = 575 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const sq = document.createElement("div");
        sq.classList.add("square");
        sq.style.height = `${squareSize}px`;
        sq.style.width = `${squareSize}px`;
        grid.appendChild(sq);
    }

    addSquareEventListeners();
};

updateGrid = () => {
    grid.innerHTML = "";
    const gridSize = userInput.value;
    const squareSize = 575 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        div.style.height = `${squareSize}px`;
        div.style.width = `${squareSize}px`;
        grid.appendChild(div);
    }

    addSquareEventListeners();
};

userInput.addEventListener("change", updateGrid);

const addSquareEventListeners = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        if (mode === "classic") {
            square.addEventListener("mouseover", function (event) {
                event.target.style.backgroundColor = "grey";
                event.target.classList.replace("square", "color");
            });
        } else {
            square.addEventListener("mouseover", function (event) {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                event.target.style.backgroundColor = "#" + randomColor;
                event.target.classList.replace("square", "color");
            });
        }
    });
};

classic.addEventListener("click", function () {
    mode = "classic";
    addSquareEventListeners();
});

rainbow.addEventListener("click", function () {
    mode = "rainbow";
    addSquareEventListeners();
})

reset.addEventListener("click", function () {
    grid.innerHTML = "";
    userInput.value = "";
    createGrid();
});

createGrid();
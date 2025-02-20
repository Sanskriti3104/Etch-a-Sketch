const userInput = document.getElementById("quantity");
const reset = document.querySelector(".reset");
const grid = document.querySelector("#gridContainer");

createGrid = () => {
    grid.innerHTML = "";
    const gridSize = 16;
    const squareSize = 575 / gridSize;

    for(let i=0; i<gridSize * gridSize; i++){
        const sq = document.createElement("div");
        sq.classList.add("square");
        sq.style.height = `${squareSize}px`;
        sq.style.width = `${squareSize}px`;
        grid.appendChild(sq);
    }
};

updateGrid = () => {
    grid.innerHTML = "";
    const gridSize = userInput.value;
    const squareSize = 575 / gridSize;

    for(let i=0; i<gridSize * gridSize; i++){
        const div = document.createElement("div");
        div.classList.add("square");
        div.style.height = `${squareSize}px`;
        div.style.width = `${squareSize}px`;
        grid.appendChild(div);
    }
};

userInput.addEventListener("change",updateGrid);

const square = document.querySelector("div");
square.addEventListener("mouseover", function(event) {
    event.target.classList.replace("square","color");
});

reset.addEventListener("click",function() {
    grid.innerHTML = "";
    userInput.value = "";
    createGrid();
});

createGrid();
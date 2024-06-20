const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const gridColor = "#000";
const numCellsX = 100;
const numCellsY = 50;
const cellSize  = 10;
const cellColor = "#66fcf1";

let board  = [];

// Adjust canvas size
canvas.width  = numCellsX * cellSize;
canvas.height = numCellsY * cellSize;


// Initial random state
const initialState = () => {
    for (let i = 0; i < numCellsX; i++) {
        board[i] = []; // Initialize each row as an empty array
        for (let j = 0; j < numCellsY; j++) {
            board[i][j] = (Math.floor(Math.random() * 6) == 0) ? 1 : 0;
        }
    }
}

// Update the board and draw the next state
const update = () => {
    let newBoard = [];
    for (let i = 0; i < numCellsX; i++) {
        newBoard[i] = [];
        for (let j = 0; j < numCellsY; j++) {
            let numberOfNeighbors = 0;
            // Count live neighbors
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x === 0 && y === 0) continue;
                    let ni = i + x;
                    let nj = j + y;
                    if (ni >= 0 && ni < numCellsX && nj >= 0 && nj < numCellsY && board[ni][nj] === 1) {
                        numberOfNeighbors++;
                    }
                }
            }
            // Determine new state
            // If alive
            if (board[i][j] === 1) {
                if (numberOfNeighbors < 2 || numberOfNeighbors > 3) {
                    newBoard[i][j] = 0; // Die
                } else {
                    newBoard[i][j] = 1; // Stay alive
                }
            // If dead
            } else {
                if (numberOfNeighbors === 3) {
                    newBoard[i][j] = 1; // Become alive
                } else {
                    newBoard[i][j] = 0; // Stay dead
                }
            }
        }
    }
    // Copy updated board
    board = newBoard;
}

// Draw the cells
const drawCells = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (let i = 0; i < numCellsX; i++) {
        for (let j = 0; j < numCellsY; j++) {
            if (board[i][j] !== 0) {
                ctx.fillStyle = cellColor;
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
    drawGrid();
}

// Draw the grid
const drawGrid = () => {
    ctx.strokeStyle = gridColor;
    for (let i = 0; i <= numCellsX; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
    }
    for (let j = 0; j <= numCellsY; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * cellSize);
        ctx.lineTo(canvas.width, j * cellSize);
        ctx.stroke();
    }
}

// Start the simulation
const simulation = () => {
    update();
    drawCells();
}

// Initialize the board and start the simulation
initialState();
setInterval(simulation, 100);

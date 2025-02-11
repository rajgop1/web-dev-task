// Selecting all the cells
const cells = document.querySelectorAll(".cell");

// Status message element
const statusText = document.getElementById("status");

// Reset button
const resetButton = document.getElementById("reset");

// Player tracking
let currentPlayer = "X";

// Array to store the game state
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations (rows, columns, diagonals)
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell click
function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    // Check if cell is already occupied
    if (board[index] !== "" || checkWinner()) return;

    // Mark the cell and update the board state
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a win or draw
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        return;
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw!";
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to check if there is a winner
function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""]; // Reset board state
    currentPlayer = "X"; // Reset to player X
    statusText.textContent = "Player X's Turn"; // Reset status message
    cells.forEach(cell => (cell.textContent = "")); // Clear the board
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener("click", handleClick));

// Reset button event listener
resetButton.addEventListener("click", resetGame);

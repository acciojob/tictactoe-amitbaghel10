//your JS code here. If required.

const setup = document.getElementById("setup");
const game = document.getElementById("game");
const form = document.getElementById("player-form");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = [];
let currentPlayer = 0;
let board = Array(9).fill("");
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name1 = document.getElementById("player-1").value.trim();
    const name2 = document.getElementById("player-2").value.trim();

    if (!name1 || !name2) return;

    players = [
        { name: name1, symbol: "x" },
        { name: name2, symbol: "o" }
    ];

    setup.classList.add("hidden");
    game.classList.remove("hidden");

    message.textContent = `${players[0].name}, you're up`;
});

cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
        if (gameOver) return;

        const index = Number(cell.id) - 1;

        if (board[index] !== "") return;

        const player = players[currentPlayer];

        board[index] = player.symbol;
        cell.textContent = player.symbol;

        const won = winningCombinations.some(function(combo) {
            return combo.every(function(position) {
                return board[position] === player.symbol;
            });
        });

        if (won) {
            message.textContent =
                `${player.name} congratulations you won!`;

            gameOver = true;
            return;
        }

        if (board.every(value => value !== "")) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = 1 - currentPlayer;

        message.textContent =
            `${players[currentPlayer].name}, you're up`;
    });
});

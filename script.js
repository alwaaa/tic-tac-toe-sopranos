const state = {
    board: ["", "", "", "", "", "", "", "", ""],
    winConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    currentPlayer: "X",
    moves: 0,
    gameOver: false,
    resetButton: null,
}

const elements = {
    cells: document.querySelectorAll(".cell"),
    field: document.querySelector("#field"),
    result: document.querySelector("#result"),
    startGame: document.querySelector("#startGame"),
    mainContainer: document.querySelector("#mainContainer"),
    welcomeScreen: document.querySelector("#welcomeScreen"),
}

elements.result.textContent = `Ходит ${state.currentPlayer}`

const switchPlayer = () => {
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X"
}

const checkWinner = () => {
    for (let [a, b, c] of state.winConditions) {
        if (
            state.board[a] &&
            state.board[a] === state.board[b] &&
            state.board[a] === state.board[c]
        ) {
            highlightCells(a, b, c)
            return true
        }
    }
    return false
}

const highlightCells = (a, b, c) => {
    elements.cells[a].classList.add("winner")
    elements.cells[b].classList.add("winner")
    elements.cells[c].classList.add("winner")
}

const checkDraw = () => {
    if (!state.gameOver && state.moves === 9) {
        return true
    }
    return false
}

const move = (input) => {
    if (state.board[input] !== "" || state.gameOver === true) return
    state.board[input] = state.currentPlayer
    elements.cells[input].textContent = state.currentPlayer
    state.moves++
    console.log(state.board)
    if (checkWinner()) {
        state.gameOver = true
        elements.result.textContent = `Победил ${state.currentPlayer}`
        createResetButton()
    }
    if (checkDraw()) {
        state.gameOver = true
        elements.result.textContent = `Ничья`
        createResetButton()
    }
    if (!state.gameOver) {
        switchPlayer()
        elements.result.textContent = `Ходит ${state.currentPlayer}`
    }
}

const createResetButton = () => {
    const resetButton = document.createElement("button")
    resetButton.textContent = "Новая игра"
    elements.result.appendChild(resetButton)
    resetButton.addEventListener("click", () => {
        elements.cells.forEach((cell) => {
            cell.textContent = ""
            cell.classList.remove("winner")
        })
        state.board = ["", "", "", "", "", "", "", "", ""]
        state.gameOver = false
        state.moves = 0
        state.currentPlayer = "X"
        elements.result.textContent = `Ходит ${state.currentPlayer}`
    })
}

elements.cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        move(index)
    })
})

elements.startGame.addEventListener("click", () => {
    elements.mainContainer.classList.remove("hidden")
    elements.welcomeScreen.classList.add("hidden")
})

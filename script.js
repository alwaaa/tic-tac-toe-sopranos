// Объект, в котором хранится состояние игры
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
}
// Объект, в котором хранятся DOM-элементы
const elements = {
    cells: document.querySelectorAll(".cell"),
    field: document.querySelector("#field"),
    result: document.querySelector("#result"),
    startGame: document.querySelector("#startGame"),
    mainContainer: document.querySelector("#mainContainer"),
    welcomeScreen: document.querySelector("#welcomeScreen"),
    finalScreen: document.querySelector("#finalScreen"),
}
const playGunShot = () => {
    const audio = new Audio(`/sfx/gunshot.mp3`)
    audio.loop = false
    audio.play()
}
// Стартовое значение поля результата
elements.result.textContent = `Ходит ${state.currentPlayer}`
// Переключение игрока
const switchPlayer = () => {
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X"
}
// Проверка победителя
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
// Подсвечивание выигрышных клеток
const highlightCells = (a, b, c) => {
    elements.cells[a].classList.add("winner")
    elements.cells[b].classList.add("winner")
    elements.cells[c].classList.add("winner")
}
// Проверка на ничью
const checkDraw = () => {
    if (!state.gameOver && state.moves === 9) {
        return true
    }
    return false
}
// Основная функция хода
const move = (input) => {
    if (state.board[input] !== "" || state.gameOver === true) return
    state.board[input] = state.currentPlayer
    state.moves++
    state.currentPlayer === "X"
        ? elements.cells[input].classList.add("tony")
        : elements.cells[input].classList.add("chris")
}
// Основная функция игры
const game = (input) => {
    move(input)
    if (checkWinner()) {
        state.gameOver = true
        elements.result.textContent = `Победил ${state.currentPlayer}`
        setTimeout(() => {
            finalScreen()
        }, 1000)
    }
    if (checkDraw()) {
        state.gameOver = true
        elements.result.textContent = `Ничья`
        createResetButton()
        setTimeout(() => {
            finalScreen()
        }, 1000)
    }
    if (!state.gameOver) {
        switchPlayer()
        elements.result.textContent = `Ходит ${state.currentPlayer}`
    }
}
// Функция создания кнопки сброса
const createResetButton = () => {
    const resetButton = document.createElement("button")
    resetButton.classList.add("resetButton")
    resetButton.textContent = "Новая игра"
    elements.finalScreen.appendChild(resetButton)
    return resetButton
}
// Функция сброса игры
const resetGame = () => {
    playGunShot()
    elements.cells.forEach((cell) => {
        cell.textContent = ""
        cell.classList.remove("winner")
        cell.classList.remove("tony")
        cell.classList.remove("chris")
    })
    state.board = ["", "", "", "", "", "", "", "", ""]
    state.gameOver = false
    state.moves = 0
    state.currentPlayer = "X"
    elements.finalScreen.classList.add("hidden")
    elements.mainContainer.classList.remove("transparent")
    elements.result.textContent = `Ходит ${state.currentPlayer}`
}
// Обработчик нажатия кнопки сброса
const handleResetButton = (btn) => {
    btn.addEventListener("click", resetGame)
}
// Функция финального окна
const finalScreen = () => {
    elements.finalScreen.classList.remove("hidden")
    elements.mainContainer.classList.add("transparent")
    elements.finalScreen.textContent = elements.result.textContent
    handleResetButton(createResetButton())
}
// Обработчик событий для клеток
elements.cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        game(index)
    })
})
// Обработчик событий для кнопки запуска новой игры
elements.startGame.addEventListener("click", () => {
    setTimeout(() => {
        elements.mainContainer.classList.remove("hidden")
        elements.welcomeScreen.classList.add("hidden")
    }, 1000)
    playGunShot()
})

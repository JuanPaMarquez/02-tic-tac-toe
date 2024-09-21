import { WINNER_COMBOS } from "../constants"

const checkWinnerFrom = (boardToCheck) => {
  // Revisar si hay ganador probando todas las combinaciones
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // No hay ganador
  return null
}

const checkEndGame = (newBoard) => {
  // Verificar si todos los campos están ocupados
  // Si es así, entonces hay un empate
  return newBoard.every((square) => square !== null)
}

export {
  checkWinnerFrom,
  checkEndGame,
}
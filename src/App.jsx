import { useState, useEffect } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnnerModal } from "./components/WinnerModal"
import { resetGameStorage, saveGame } from "./storage"

function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate y el true es que hay ganador
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // No Actualizamos esta posición si ya esta ocupada
    if (board[index] || winner) return

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardar aqui la partida
    saveGame({
      board: newBoard,
      turn: newTurn,
    })

    // Comprobar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(() => {
    console.log('useEffect')
  }, [winner])


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Nueva partida</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <WinnnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App


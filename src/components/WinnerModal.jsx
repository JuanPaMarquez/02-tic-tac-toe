import PropTypes from "prop-types"
import { Square } from "./Square"

export function WinnnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Gano:'
  return (
    <section className="winner">
      <div className="text">
        <h2>
          {winnerText}
        </h2>
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Nueva partida</button>
        </footer>
      </div>
    </section>
  )
}

WinnnerModal.propTypes = {
  winner: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  resetGame: PropTypes.func.isRequired,
} 
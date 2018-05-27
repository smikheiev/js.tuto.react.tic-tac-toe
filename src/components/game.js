import React from 'react'
import Board from './board'
import { calculateWinner, areAllSquaresFilled, getTurn } from '../logic'

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      turn: getTurn(0),
      stepNumber: 0
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.turn
    const stepNumber = history.length
    const turn = getTurn(stepNumber)

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: stepNumber,
      turn: turn
    })
  }

  jumpToMove (stepNumber) {
    this.setState({
      stepNumber: stepNumber,
      turn: getTurn(stepNumber)
    })
  }

  render () {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      const isDraw = areAllSquaresFilled(current.squares)
      if (isDraw) {
        status = 'Draw'
      } else {
        status = `Next player: ${this.state.turn}`
      }
    }

    const moves = history.map((step, moveNumber) => {
      const desc = moveNumber > 0 ?
        `Go to move #${moveNumber}` :
        'Go to game start'
      return (
        <li key={moveNumber}>
          <button onClick={() => this.jumpToMove(moveNumber)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default Game

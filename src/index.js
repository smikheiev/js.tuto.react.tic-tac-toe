import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare (i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render () {
    const COLUMNS = 3
    const ROWS = 3

    const board = []
    for (let row = 0; row < ROWS; row++) {
      const squares = []
      for (let col = 0; col < COLUMNS; col++) {
        const index = col + row * COLUMNS
        squares.push(this.renderSquare(index))
      }
      board.push(<div key={row} className="board-row">{squares}</div>)
    }
    return (
      <div>
        {board}
      </div>
    )
  }
}

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

  jumpTo (stepNumber) {
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
          <button onClick={() => this.jumpTo(moveNumber)}>{desc}</button>
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

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function areAllSquaresFilled (squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false
    }
  }
  return true
}

function getTurn (stepNumber) {
  return (stepNumber % 2) ? 'O' : 'X'
}

import React from 'react'
import Square from './square'

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

export default Board

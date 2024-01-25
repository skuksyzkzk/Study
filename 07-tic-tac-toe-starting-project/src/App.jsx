import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Logs from "./components/Log";
function App() {
  const [activePlayer,setActivePlayer] = useState('X');

  function handleSelectActivePlayer() {
    setActivePlayer((curPlayer) => curPlayer === 'X' ? 'O' : 'X');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectPlayer={handleSelectActivePlayer} activePlayerSymbol={activePlayer}/>
      </div>
      <Logs/>
    </main>
    
  )
}

export default App

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Logs from "./components/Log";
import { WINNING_COMBINATION } from './winningrRule'
import GameOver from "./components/GameOver";
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function helpActivePlayer(gameturns) {
  let currentPlayer = 'X';//default

  if (gameturns.length > 0 && gameturns[0].player === 'X') {//그리고 맨처음상태에선 0번째의 player가 없으니 조건문 추가 
    currentPlayer = 'O';//이전플레이어가 X였으니까 현재는 O의 차례인것 
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns){

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { squre, player } = turn;
    const { row, col } = squre;

    gameBoard[row][col] = player;

  }
  console.log(gameBoard);
  return gameBoard;
}
function deriveWinner(gameBoard,players){
  let winner;
  console.log(WINNING_COMBINATION);
  for (const combination of WINNING_COMBINATION) {
    const first = gameBoard[combination[0].row][combination[0].col];
    const second = gameBoard[combination[1].row][combination[1].col];
    const third = gameBoard[combination[2].row][combination[2].col];
    if (first && first === second && first === third) {
      winner = players[first];
    }
    
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);//객체로 체운 배열이 되도록 한다. 객체는 어떤버튼을 눌렀는지 행과열,누가 눌렀는지 
  //const [activePlayer, setActivePlayer] = useState('X');

  console.log("APP STAT");
  const activePlayer = helpActivePlayer(gameTurns);

  //let gameBoard = initialGameBoard; 이게 문제되는 것은 메모리를 그대로 참조해서 쓰므로 restart할때 내용은 그대로 있는 다는것 
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard,players);
  let isDraw = gameTurns.length === 9;

 
  
  function handleSelectActivePlayer(rowIndex, colIndex) {
    //setActivePlayer((curPlayer) => curPlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns => {
      const currentPlayer = helpActivePlayer(prevTurns);

      const updatedTurns = [{ squre: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,];//항상 첫번째가 가장 최신것이 되게 한다 .
      return updatedTurns;
    }))
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayers(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }

    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangePlayer={handlePlayers} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangePlayer={handlePlayers} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectPlayer={handleSelectActivePlayer} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>

  )
}

export default App

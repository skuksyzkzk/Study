
//초기 게임보드 O,X가 체크 되기전이다 
/**
 * button 사이에 오는 값은 X값 유저가 클릭하면 X가 된다.
 * @returns componets of Gameboard
 */
export default function GameBoard({ onSelectPlayer, board }) {
    //이렇게 되면 상태를 또 만드는 것이 아닌 turns라는 상태에서 파생된 값을 사용할수있다.   
    

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updateBoard = [...prevGameBoard];
    //         //const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updateBoard;
    //     });

    //     onSelectPlayer();//여기서 실행하는 이유는 버튼을 클릭하면 handleSelectSqure이 실행되니까 클릭시마다 실행되게 하려고

    // }
    return (
        <ol id="game-board">
            {board && board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectPlayer(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>),
                        )}
                    </ol>
                </li>)

            )}
        </ol>

    )
}
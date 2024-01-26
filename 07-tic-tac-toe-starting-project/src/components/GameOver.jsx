/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * game Over할 경우마다 플레이어 이름을 출력하게 하고 싶다 
 * 그러면 어떻게 할까? player 상태를 끌어올려야되나
 * 그러면플레이어 이름을 재입력할떄마다 매 모든 것이 재실행 될거기에 그러면 안된다.
 */

export default function GameOver({ winner,onRestart }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It is Draw</p>}
            <p>
                <button onClick={onRestart}>REMATCH</button>
            </p>
        </div>
    )
}
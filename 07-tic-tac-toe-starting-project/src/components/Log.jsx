export default function Logs({turns}) {
    
    return (
        <ol id="log">
            {turns.map(turn => <li key={`${turn.squre.row}${turn.squre.col}`} >{turn.player}: row-{turn.squre.row}/col-{turn.squre.col}</li>)}
        </ol>
    )
}


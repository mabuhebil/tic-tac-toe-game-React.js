export default function GameOver({winnier ,handelReset}){
    return(
        <div id="game-over">
            <h2>The End !</h2>
            {winnier&& <p>{winnier} Won!</p>}
            {!winnier&& <p>It&apos;s adraw!</p>}
            <p>
                <button onClick={handelReset}>Rematch!</button>
            </p>
        </div>
    )
}
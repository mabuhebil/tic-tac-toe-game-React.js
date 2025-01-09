import { useState } from "react"

import Player from "./Componets/Player"
import GameBoard from "./Componets/GameBoard"
import Log from "./Componets/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Componets/GameOver";

const initialGameBoard =[
  [ null ,null ,null],
  [ null ,null ,null],
  [ null ,null ,null], 
];



function deriveActivePlayer(gameturns){
  let currentplayer ='X';
  if(gameturns.length>0 && gameturns[0].Player =='X'){
    currentplayer='O';
  }

  return currentplayer;
}

function App() {

  const [players , setplayers] =useState({  X:'player 1' ,O:'player 2'})
  const [gameturns , setGameturnes] =useState([]);
  
  const activeplayer =deriveActivePlayer(gameturns)

  let gameboard =[...initialGameBoard.map( array => [...array])];

  // gameboard تخزين قيم فى 

  for( const turn of gameturns){
   const {squre ,Player} =turn;
   const {row ,col} =squre;
   gameboard[row][col]=Player;
  }

  
  let winier;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameboard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameboard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameboard[combination[2].row][combination[2].column]
 
    if(firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&firstSquareSymbol===thirdSquareSymbol){
      winier= players[firstSquareSymbol];
      }
  }

  const hasDraw=gameturns.length===9 && !winier;

                  //onclick//
  function handelSelectSquare(rowIndex , colIndex){

    setGameturnes( (prevturns) => { 

     const currentplayer =deriveActivePlayer(prevturns)

      const updetedturens =[
        { squre:{row:rowIndex,col:colIndex} ,Player:currentplayer}, ...prevturns
      ]

      
      return updetedturens

    })
   
  }

  function handelReset(){
    setGameturnes([])
  }
  function handelPlayersNameChange(symbol ,newName){
    setplayers((prevplayers => {
      return{
        ...prevplayers,[symbol]:newName
      }
    }))
  }

  return (
    <main>

      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onchangeName={handelPlayersNameChange} intialName="Player 1" symbol="X" isActive={activeplayer =='X'}/>
          <Player onchangeName={handelPlayersNameChange} intialName="Player 2" symbol="O" isActive={activeplayer =='O'}/>
        </ol>
        {(winier || hasDraw) && <GameOver winnier={winier} handelReset={handelReset}/>}
        <GameBoard  onSelectSquare ={handelSelectSquare} board ={gameboard}/>
      </div>

      <Log turns={gameturns}/>

    </main>
  )
}

export default App

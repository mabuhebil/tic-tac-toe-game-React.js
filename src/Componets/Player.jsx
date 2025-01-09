import { useState } from "react"

export default function Player({intialName , symbol ,isActive ,onchangeName}){

    const[playerName ,setplayerName] = useState(intialName)
    const [isEditing , setIsEditing] = useState(false);
    
    function handelchange(event){
        setplayerName(event.target.value)
    }
    
    function handelEditClick(){
        setIsEditing((editing) => !editing )

        if(isEditing){
            onchangeName(symbol ,playerName)
        }
    }

    let editableplayerNAME =<span className="player-name">{playerName}</span>;

    if(isEditing){
        editableplayerNAME = <input type="text" required value={playerName} onChange={handelchange}/>
    }

    return(
        <li className={isActive ? "active ": undefined}>

        <span className="player">
         {editableplayerNAME}
         <span className="player-symbol">{symbol}</span>
        </span>

        <button onClick={handelEditClick}>{isEditing? 'Save' : 'Edit'}</button>
      </li>

    )
}
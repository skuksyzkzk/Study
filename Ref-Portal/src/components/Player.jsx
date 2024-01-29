import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const playerName = useRef();

  const [userName,setUserName] = useState(null);
  // const [isSet,setIsSet] = useState(false);
  // function handleUserName(event){
  //   setIsSet(false);
  //   setUserName(event.target.value);
  // }
  function handleSubmit(){
    setUserName(playerName.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {userName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName}type="text" //onChange={handleUserName} value={userName}
        />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}

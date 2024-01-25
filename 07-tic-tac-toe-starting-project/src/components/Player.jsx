import { useState } from "react"
export default function Player({ name, symbol , isActive}) {
    const [userName,setUserName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    // false라는 것은 Edit 할 마음이없다는 것으로 span을 보여준다 true일 경우에는 input을 띄운다
    let nameLabel = <span className="player-name">{userName}</span>;
    if (isEditing) {
        nameLabel = <input type="text" required value={userName} onChange={handleChange}></input>
    }

    function handleEditing() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        setUserName(event.target.value);
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {nameLabel}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{!isEditing ? "EDIT" : "SAVE"}</button>
        </li>
    )
}
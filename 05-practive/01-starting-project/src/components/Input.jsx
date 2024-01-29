export default function Input({name,setting}){    
    return (
        <div>
            <p id="label">{name}</p>
            <input id="input" type="text" required onChange={(event)=>setting(name,event.target.value)}></input>
        </div>
    )
}
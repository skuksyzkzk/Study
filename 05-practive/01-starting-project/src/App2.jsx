import UserInput from "./components/UserInput"
import { useState } from "react";
import UserResult from "./components/UserResult";
function App2() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });
    const inputIsValid = userInput.duration > 1;
    function handleCC(name, newValue) {
        setUserInput(prev => {
            return {
                ...prev,
                [name]: +newValue// + 를 써주면 문자열을 숫자로 강제한다.
            }
        })
    }
    return (
        <>
            <UserInput userInput={userInput} onChange={handleCC} />
            {!inputIsValid && <p className="center">Please Enter a duration greater than 1</p>}
            {inputIsValid &&<UserResult input={userInput}/>}
        </>
    )
}
export default App2
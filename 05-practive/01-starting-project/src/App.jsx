import { useState } from "react"
import Input from "./components/Input"
import { calculateInvestmentResults } from "./util/investment";
import Result from "./components/Result";
const USER_INPUT = { 
  initialInvestment : 0,
  annualInvestment : 0,
  expectedReturn: 0,
  duration: 0
}
function App() {
  const [userInputData,setUserInputData] = useState(USER_INPUT);
  const [result,setResult] = useState([]);

  function setting(name,value){
    setUserInputData(prevData => {
      return {
        ...prevData,
        [name] : value
      }
    });

    setResult(()=>calculateInvestmentResults(userInputData));
  }

  return (
    <>
      <div id="user-input" >
        <Input name="initialInvestment" userInputData={userInputData} setting={setting}/>
        <Input name="annualInvestment" userInputData={userInputData} setting={setting}/>
        <Input name="expectedReturn" userInputData={userInputData} setting={setting}/>
        <Input name="duration" userInputData={userInputData} setting={setting}/>
      </div>
      <Result result={result}/>
    </>
  )
}

export default App

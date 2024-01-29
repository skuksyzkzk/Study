import { useRef } from "react";
import { useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();
    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timeExpired, setTimeExpired] = useState(false);
    const [timeRemaing,setTimeRemaing] = useState(targetTime*1000);

    const timerIsActive = timeRemaing > 0 && timeRemaing < targetTime * 1000;

    if( timeRemaing <=0){
        clearInterval(timer.current);
        //setTimeRemaing(targetTime*1000);//여기서 상태를 계속 재설정하는건 함수를 다시 실행시키니까 무한루프에 빠질수있따.
        //하지만 if문 있으니까 ㄱㅊ 
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaing(targetTime * 1000);
    }
    function handleStart() {
        // timer.current = setTimeout(() => {
        //     setTimeExpired(true);
        //     dialog.current.open();
        // }, targetTime * 1000);
        // setTimerStarted(true);
        timer.current = setInterval(() => {
            setTimeRemaing(prevTimeRemaining => prevTimeRemaining -10);
        },10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>

            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaing} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                {/* {timeExpired && <p>You lost</p>} */}
                <p className="challenge-time">
                    {targetTime} second {targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is Running ..' : ' Timer inactive '}
                </p>
            </section>
        </>

    )
}
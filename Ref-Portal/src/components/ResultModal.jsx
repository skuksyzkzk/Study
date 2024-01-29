import { forwardRef,useImperativeHandle,useRef } from "react"


const ResultModal = forwardRef(function ResultModal({remainingTime,targetTime,onReset},ref){
    const dialog = useRef();

    const userLost = remainingTime <=0;
    const formattedTime = (remainingTime / 1000).toFixed(3);
    const score = Math.round((1 - remainingTime/ (targetTime*1000)) * 100);
    useImperativeHandle(ref,() =>{
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });
    return (
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost &&<h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score} </h2>}
            <p>
                The Target Time Was <strong>{targetTime} seconds.</strong> 
            </p>
            <p>
                You Stopped the Timer with <strong>{formattedTime} seconds left</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;
import { useRef, useState } from "react";
import Label from "./Label.";

export default function CreateNewProject({handleNotCreate}) {
    const [title,setTitle] = useState();
    const [description,setDescription] = useState();
    const [date,setDate] = useState();

    const titleRf= useRef(); 
    const descpritionRf = useRef();
    const dateRf = useRef();
    
    function handleSave(){
        setTitle(titleRf.current.value);
        setDescription(descpritionRf.current.value);
        setDate(dateRf.current.value);
    }
    return (
        <>
            <p className="flex justify-end w-full items-center">
                <button className="rounded-md bg-white p-3 m-3 w-20 h-10" onClick={handleNotCreate} >Cancle</button>
                <button className="rounded-md bg-black p-2 mr-10 text-gray-500 w-20 h-10" onClick={handleSave}>Save</button>
            </p>
            <p className="flex flex-col">
                <Label>TITLE</Label>
                <input  ref={titleRf} type="text"></input>
            </p>
            <p className="flex flex-col">
                <Label>DESCRIPTION</Label>
                <input ref={descpritionRf} type="text"></input>
            </p>
            <p className="flex flex-col">
                <Label>DUE DATE</Label>
                <input ref={dateRf} type="date"></input>
            </p>


        </>

    )
}
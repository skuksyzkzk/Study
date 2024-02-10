import { useState } from "react"
import CreateNewProject from "./CreateNewProject";

export default function Main() {
    const [isCreate, setIsCreate] = useState(false);
    const [projects,setProjects] = useState([]);
    
    function addProjects(title,description,date) {
        setProjects(prev => [
            ...prev,
            { 
                [title] : title,
                [description] : description,
                [date] : date
            }
        ]);

    }
    function handleCreate() {
        setIsCreate(true);
    }
    function handleNotCreate(){
        setIsCreate(false);
    }
    return (
        <div className="bg-red-600 w-3/4 h-screen  flex flex-col items-center justify-center">
            {!isCreate && <>
                <img src="logo.png" className="object-cover w-40 h-40 m-5" ></img>
                <h2 className="font-bold text-2xl m-3">No Project Selected</h2>
                <p className="text-gray-500 m-3">Select a project or get started with a new one</p>
                <button className="rounded-md bg-black text-gray-600 p-3 m-2" onClick={handleCreate}>Create new Project</button>
            </>
            }
            {isCreate && <CreateNewProject handleNotCreate={handleNotCreate} projects={projects}/>}
        </div>
    )
}
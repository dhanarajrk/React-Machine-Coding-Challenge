import { use, useEffect, useState } from "react"


export const Kanban = () => {
    const storageTasks = JSON.parse(localStorage.getItem("kanban-tasks")); // When the component first mounts, we try to retrieve any existing tasks from localStorage. If there are tasks stored, we parse the JSON string back into a JavaScript array and use it as the initial state for our tasks. If there are no tasks in localStorage, we initialize with an empty array.
    const [tasks, setTasks] = useState(storageTasks || []);

    const [input, setInput] = useState("");
    const [draggedTaskId, setDraggedTaskId] = useState(null);

    const listTasks = tasks.filter(task => task.status === "list").sort((a,b) => a.order - b.order)                       
    const doingTasks = tasks.filter(task => task.status === "doing").sort((a,b) => a.order - b.order)
    const doneTasks = tasks.filter(task => task.status === "done").sort((a,b) => a.order - b.order)

    useEffect(() => {
        localStorage.setItem("kanban-tasks", JSON.stringify(tasks)); // Whenever tasks change, we update localStorage with the new tasks array. This way, our data persists even if the user refreshes the page or closes and reopens the browser.
    }, [tasks])

    function handleAddTask() {
        if (input.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: input,
            status: "list",
            order: listTasks.length
        }

        setTasks([...tasks, newTask]);
        setInput("");
    }

    function moveTask(taskId, newStatus) {
        const updatedTask = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: newStatus }
            }
            return task
        })
        setTasks(updatedTask)
    }


    function handleDragStart(taskId){
        setDraggedTaskId(taskId);
    }


    function handleDragOver(e){
        e.preventDefault(); //By default, HTML does not allow drop in many places.
    }

    function handleDrop(newStatus){
        if(draggedTaskId == null) return;
        moveTask(draggedTaskId, newStatus);
        setDraggedTaskId(null);
    }


    return (
        <div>
            <h2>Kanban Todo Drag-Drop (Junior Level - Drop at End of Coloumn only)</h2>

            <input type="text"
                placeholder="Enter task..."
                value={input}
                onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleAddTask}>Add Task</button>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div onDragOver={(e)=>handleDragOver(e)} onDrop={()=>handleDrop("list")}>
                    <h3>Lists</h3>
                    {listTasks.map(task => (
                        <div key={task.id} draggable="true" onDragStart={()=>handleDragStart(task.id)} > 
                            <span>{task.text}</span>
                        </div>
                    ))}
                </div>

                <div onDragOver={(e)=>handleDragOver(e)} onDrop={()=>handleDrop("doing")}>
                    <h3>Doing</h3>
                    {doingTasks.map(task => (
                        <div key={task.id} draggable="true" onDragStart={()=>handleDragStart(task.id)}>
                            <span>{task.text}</span>
                        </div>
                    ))}
                </div>

                <div onDragOver={(e)=>handleDragOver(e)} onDrop={()=>handleDrop("done")}>
                    <h3>Done</h3>
                    {doneTasks.map(task => (
                        <div key={task.id} draggable="true" onDragStart={()=>handleDragStart(task.id)}>
                            <span>{task.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

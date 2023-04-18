import { useEffect, useMemo } from "react";
import { useTask } from "../../context/task.contex";


const TaskStatus = () => {

    const { tasks } = useTask();



    const Status = useMemo(() => {

        const data = tasks.reduce((previous, item) => {
            if (item.isComplete === true) {
                return { complete: previous.complete + 1, progress: previous.progress }
            } else {
                return { complete: previous.complete, progress: previous.progress + 1 }
            }
        }, { complete: 0, progress: 0 })




        return <p>Total: {tasks.length} - Concluidas: {data.complete} - Em progresso: {data.progress} </p>
    }, [tasks])


    return (
        <p>{Status} </p>
    )
}

export { TaskStatus }; 

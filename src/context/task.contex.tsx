

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITask } from "../screens/Listview/Listview.types";
import { nanoid } from "nanoid";

interface ITaskContext {
    tasks: ITask[];
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    tasksFilter: ITask[];
    addTask: (label: string) => void;
    updateTaskCompletion: (taskId: string, isComplete: boolean) => void;
    Status: JSX.Element
}

const TaskContext = createContext<ITaskContext>({} as ITaskContext);

interface IProps {
    children: React.ReactNode
}

const TaskProvider = ({ children }: IProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [tasksFilter, setTaskFilter] = useState<ITask[]>([])

    useEffect(() => {
        const listTask = tasks.filter((eachTask) => eachTask.label.toLowerCase().includes(searchTerm.toLowerCase()))
        setTaskFilter(listTask);
    }, [searchTerm, tasks]);

    useEffect(() => {
        const fetchTasks = () => {
            const tasksString = localStorage.getItem("tasks")
            if (tasksString) {
                const tasksArray = JSON.parse(tasksString)
                setTasks(tasksArray)
            }
        }

        fetchTasks();
    }, []);


    const addTask = (label: string) => {
        const id = nanoid();
        const currentTask: ITask = { id, label: label, isComplete: false }
        const updateTasks = [...tasks, currentTask]
        setTasks(updateTasks);
        saveTasks(updateTasks);
    };

    const saveTasks = (updateTasks: ITask[]) => {
        const tasksString = JSON.stringify(updateTasks)
        localStorage.setItem("tasks", tasksString)
    }

    const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
        setTasks((tasks) => tasks.map((task) => {
            if (task.id === taskId) return { ...task, isComplete }
            return task;
        })
        )
    }

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
        <TaskContext.Provider
            value={{
                tasks,
                searchTerm,
                setSearchTerm,
                tasksFilter,
                addTask,
                updateTaskCompletion,
                Status
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

const useTask = () => useContext(TaskContext);

export { TaskProvider, useTask }


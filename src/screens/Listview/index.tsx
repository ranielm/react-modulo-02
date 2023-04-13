import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import Spacer from "../../components/Spacer";
import {
  Input,
  ListContainer,
  TodoListContainer,
  TodoListItem,
} from "./Listview.styles";
import { ITask } from "./Listview.types";
import { nanoid } from "nanoid";

const Listview = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(event.target.value);
  };

  const saveTasks = (updateTasks: ITask[]) => {
    const tasksString = JSON.stringify(updateTasks)
    localStorage.setItem("tasks", tasksString)
  }

  const addTask = (label: string) => {
    const id = nanoid();
    const currentTask: ITask = { id, label: label, isComplete: false }
    const updateTasks = [...tasks, currentTask]
    setTasks(updateTasks);
    saveTasks(updateTasks);
  };

  const handleNewTaskKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTaskLabel !== "") {
      addTask(newTaskLabel);
      setNewTaskLabel("");
    }
  };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) => tasks.map((task) => {
      if (task.id === taskId) return { ...task, isComplete }
      return task;
    })
    )
  }

  const handleTaskCompleteChange = (event: ChangeEvent<HTMLInputElement>, eachTask: ITask) => {
    updateTaskCompletion(eachTask.id, event.target.checked)
  }

  useEffect(() => {
    const fetchTasks = () => {
      const tasksString = localStorage.getItem("tasks")
      if (tasksString) {
        const tasksArray = JSON.parse(tasksString)
        setTasks(tasksArray)
      }
    }

    fetchTasks();
  }, [])

  return (
    <ListContainer>

      <Input
        placeholder="Search tasks"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <Spacer height={4} />

      <TodoListContainer>

        {tasks.filter((eachTask) => eachTask.label.includes(searchTerm))
          .map((eachTask) => (
            <TodoListItem key={eachTask.id} isComplete={eachTask.isComplete}>
              <Checkbox key={eachTask.id} checked={eachTask.isComplete}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleTaskCompleteChange(event, eachTask)
                }
              />
              <Spacer width={2} />
              {eachTask.label}
              <Spacer flex={1} />
            </TodoListItem>
          ))}

      </TodoListContainer>

      <Spacer height={4} />

      <Input
        placeholder="Add a task"
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />

    </ListContainer>
  );
};

export default Listview;

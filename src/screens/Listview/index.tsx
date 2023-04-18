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
import { useTask } from "../../context/task.contex";
import { SearchTerm } from "../../components/SearchTerm";
import { TaskStatus } from "../../components/TaksStatus";

const Listview = () => {
  const { tasksFilter, addTask, updateTaskCompletion, Status } = useTask();
  const [newTaskLabel, setNewTaskLabel] = useState("");


  const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(event.target.value);
  };

  const handleNewTaskKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTaskLabel !== "") {
      addTask(newTaskLabel);
      setNewTaskLabel("");
    }
  };


  const handleTaskCompleteChange = (event: ChangeEvent<HTMLInputElement>, eachTask: ITask) => {
    updateTaskCompletion(eachTask.id, event.target.checked)
  }

  return (
    <ListContainer>

      <SearchTerm />

      {Status}
     

      <TodoListContainer>

        {tasksFilter.map((eachTask) => (
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

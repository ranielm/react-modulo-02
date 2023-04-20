import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useCallback,
} from "react";
import Spacer from "../../components/Spacer";
import { ListContainer, TodoListContainer } from "./Listview.styles";
import { ITask } from "./Listview.types";
import { useTask } from "../../context/task.contex";
import { SearchTerm } from "../../components/SearchTerm";
import TodoListItem from "../../components/TodoListItem";
import AddTaskInput from "../../components/Input";

const Listview = () => {
  const { tasksFilter, addTask, updateTaskCompletion, Status } = useTask();
  const [newTaskLabel1, setNewTaskLabel1] = useState("");
  const [newTaskLabel2, setNewTaskLabel2] = useState("");

  // const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setNewTaskLabel1(event.target.value);
  // };

  const handleNewTaskKeyPress1 = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && newTaskLabel1 !== "") {
        addTask(newTaskLabel1);
        setNewTaskLabel1("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newTaskLabel1]
  );

  const handleNewTaskKeyPress2 = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && newTaskLabel2 !== "") {
        addTask(newTaskLabel1);
        setNewTaskLabel2("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newTaskLabel2]
  );

  const handleTaskCompleteChange = (
    event: ChangeEvent<HTMLInputElement>,
    eachTask: ITask
  ) => {
    updateTaskCompletion(eachTask.id, event.target.checked);
  };

  const handleNewTaskLabelChange1 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskLabel1(event.target.value);
    },
    []
  );

  const handleNewTaskLabelChange2 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskLabel2(event.target.value);
    },
    []
  );

  useEffect(() => {
    console.log("\n");
    console.log("🚀 ~ file: index.tsx:33 ~ Listview");
  }, []);

  return (
    <ListContainer>
      <SearchTerm />
      {Status}
      <TodoListContainer>
        {tasksFilter.map((eachTask) => (
          <TodoListItem
            eachTask={eachTask}
            handleTaskCompleteChange={handleTaskCompleteChange}
          />
        ))}
      </TodoListContainer>
      <Spacer height={4} />
      <AddTaskInput
        placeholder="Add first task"
        newTaskLabel={newTaskLabel1}
        handleNewTaskLabelChange={handleNewTaskLabelChange1}
        handleNewTaskKeyPress={handleNewTaskKeyPress1}
      />
      <Spacer height={2} />
      <AddTaskInput
        placeholder="Add second task"
        newTaskLabel={newTaskLabel2}
        handleNewTaskLabelChange={handleNewTaskLabelChange2}
        handleNewTaskKeyPress={handleNewTaskKeyPress2}
      />
    </ListContainer>
  );
};

export default Listview;

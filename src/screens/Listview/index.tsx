import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Checkbox from "../../components/Checkbox";
import Spacer from "../../components/Spacer";
import {
  Button,
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

  const divRef = useRef<HTMLDivElement | null>(null);
  const colors = useRef(["#666", "#555"]);
  const currentIndex = useRef(0);

  const filteredTasks = useMemo(() => {
    const startTime = performance.now();
    const filteredTasksTemp = tasks.filter((task) =>
      task.label.toLowerCase().includes(searchTerm.toLocaleUpperCase())
    );
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(
      "🚀 ~ file: index.tsx:37 ~ filteredTasks ~ elapsedTime:",
      elapsedTime
    );
    return filteredTasksTemp;
  }, [searchTerm, tasks]);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNewTaskLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(event.target.value);
  };

  const saveTasks = (updateTasks: ITask[]) => {
    const tasksString = JSON.stringify(updateTasks);
    localStorage.setItem("tasks", tasksString);
  };

  const addTask = (label: string) => {
    const id = nanoid();
    const currentTask: ITask = { id, label: label, isComplete: false };
    const updateTasks = [...tasks, currentTask];
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
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const handleTaskCompleteChange = (
    event: ChangeEvent<HTMLInputElement>,
    eachTask: ITask
  ) => {
    updateTaskCompletion(eachTask.id, event.target.checked);
  };

  const handleButtonClick = () => {
    const divElement = divRef.current;
    const colorsList = colors.current;

    if (divElement && colorsList && colorsList.length > 0) {
      divElement.style.backgroundColor = colorsList[currentIndex.current];
      currentIndex.current = currentIndex.current === 0 ? 1 : 0;
    }
  };

  useEffect(() => {
    const fetchTasks = () => {
      const tasksString = localStorage.getItem("tasks");
      if (tasksString) {
        const tasksArray = JSON.parse(tasksString);
        setTasks(tasksArray);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ListContainer>
      <Input
        placeholder="Search tasks"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <Spacer height={4} />

      <TodoListContainer ref={divRef}>
        {tasks
          .filter((eachTask) => eachTask.label.includes(searchTerm))
          .map((eachTask) => (
            <TodoListItem key={eachTask.id} isComplete={eachTask.isComplete}>
              <Checkbox
                key={eachTask.id}
                checked={eachTask.isComplete}
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

      <Spacer height={2} />

      <Button onClick={handleButtonClick}>Alterar a cor de fundo</Button>

      <Spacer height={2} />

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

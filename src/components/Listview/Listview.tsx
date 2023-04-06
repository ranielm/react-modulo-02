import {
  ListContainer,
  TodoListContainer,
  TodoListItem,
} from "./Listview.styles";
import { ITaskState } from "./Listview.types";

const Listview = () => {
  const tasks: ITaskState[] = [
    { id: "1", label: "Primeira task", isComplete: false },
  ];

  return (
    <ListContainer>
      <TodoListContainer>
        <TodoListItem>
          {tasks.map((eachTask) => {
            return eachTask.label;
          })}
        </TodoListItem>
      </TodoListContainer>
    </ListContainer>
  );
};

export default Listview;

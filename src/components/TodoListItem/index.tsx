import { ChangeEvent } from "react";
import { ITask } from "../../screens/Listview/Listview.types";
import Checkbox from "../Checkbox";
import Spacer from "../Spacer";
import { StyledTodoListItem } from "../../screens/Listview/Listview.styles";

interface ITodoListItem {
  eachTask: ITask;
  handleTaskCompleteChange: (
    event: ChangeEvent<HTMLInputElement>,
    eachTask: ITask
  ) => void;
}

const TodoListItem = ({
  eachTask,
  handleTaskCompleteChange,
}: ITodoListItem) => {
  return (
    <StyledTodoListItem key={eachTask.id} isComplete={eachTask.isComplete}>
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
    </StyledTodoListItem>
  );
};

export default TodoListItem;

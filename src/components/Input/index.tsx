import { memo } from "react";
import { StyledInput } from "../../screens/Listview/Listview.styles";

interface IInputProps {
  placeholder: string;
  newTaskLabel: string;
  handleNewTaskLabelChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleNewTaskKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AddTaskInput = ({
  placeholder,
  newTaskLabel,
  handleNewTaskKeyPress,
  handleNewTaskLabelChange,
}: IInputProps) => {
  console.log("\n");
  console.log("🚀 ~ file: index.tsx:15 ~ AddTaskInput: ", placeholder);

  return (
    <StyledInput
      placeholder={placeholder}
      value={newTaskLabel}
      onChange={handleNewTaskLabelChange}
      onKeyPress={handleNewTaskKeyPress}
    ></StyledInput>
  );
};

export default memo(AddTaskInput);

import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 30rem;
`;

export const TodoListContainer = styled.div`
  background: grey;
  border-radius: 1rem;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
`;

type TodoListItemProps = {
  isComplete: boolean;
};

export const TodoListItem = styled.label<TodoListItemProps>`
  display: flex;
  padding: 0.5rem 0;
  align-items: center;
  font-size: 1.2rem;
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
`;

export const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 15px;
  color: #fff;
  padding: 20px 24px;
`;

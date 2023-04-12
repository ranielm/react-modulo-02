import styled, { StyledComponent } from "styled-components";
import { colors } from "../../styles";
import { ComponentProps } from "react";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

type CheckboxProps = {
  checked: boolean;
};

const StyledCheckbox = styled.div<CheckboxProps>`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.checked ? colors.primary : "none")};
  border: 3px solid ${colors.primary};
  border-radius: 25px;
  transition: all 100ms;
`;

type Props = ComponentProps<StyledComponent<"input", {}>>;

const Checkbox = ({ checked, ...props }: Props) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox {...props} type="checkbox" />
      <StyledCheckbox checked={checked} />
    </CheckboxContainer>
  );
};

export default Checkbox;

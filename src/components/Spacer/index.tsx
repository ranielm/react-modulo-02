import React from "react";
import styled from "styled-components";

type SpacerProps = {
  flex?: number;
  height?: number;
  width?: number;
};

const StyledSpacer = styled.div<SpacerProps>`
  height: ${(props) => props.height && `${props.height}rem`};
  width: ${(props) => props.width && `${props.width}rem`};
  flex: ${(props) => props.flex};
`;

const Spacer = ({ height, width, flex }: SpacerProps) => {
  return <StyledSpacer height={height} width={width} flex={flex} />;
};

export default Spacer;

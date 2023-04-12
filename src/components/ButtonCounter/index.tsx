import React, { useState } from "react";

export interface IButtonCounterProps {
  title: string;
  active?: boolean;
}

const ButtonCounter = ({ title, active = true }: IButtonCounterProps) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick} disabled={!active}>
      {title}: {count}
    </button>
  );
};

export default ButtonCounter;

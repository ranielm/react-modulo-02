import React, { useState } from "react";

export interface IButtonCounterProps {
  title: string;
  active?: boolean;
}

const ButtonCounter = ({ title, active = true }: IButtonCounterProps) => {
  const [count, setCount] = useState(0);
  console.log("🚀 ~ file: index.tsx:8 ~ ButtonCounter ~ title:", title);
  console.log("🚀 ~ file: index.tsx:9 ~ ButtonCounter ~ active:", active);

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

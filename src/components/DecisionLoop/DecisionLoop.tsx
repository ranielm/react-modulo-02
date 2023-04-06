import ShowNumbers from "../ShowNumbers/ShowNumbers";

const DecisionLoop = () => {
  const numbers: number[] = [1, 2, 6, 78, 90, 35];

  return (
    <div>
      {numbers.length > 0 ? (
        <ShowNumbers numbers={numbers} />
      ) : (
        <h2>Lista vazia</h2>
      )}
    </div>
  );
};

export default DecisionLoop;

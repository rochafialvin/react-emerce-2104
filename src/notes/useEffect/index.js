import { useEffect, useState } from "react";

function UseEffectComponent() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log("useEffect running");
  }, [count, count2]);

  const onCount1Click = () => {
    setCount(count + 1);
  };
  const onCount2Click = () => {
    setCount2(count2 + 2);
  };

  return (
    <div>
      <h1>useEffect Component</h1>
      <h3>{count}</h3>
      <h3>{count2}</h3>
      <button onClick={onCount1Click}>Count 1</button>
      <button onClick={onCount2Click}>Count 2</button>
    </div>
  );
}

export default UseEffectComponent;

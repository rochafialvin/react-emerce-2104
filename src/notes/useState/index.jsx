import { useState, useEffect } from "react";

function UseState() {
  const [attempt, setAttempt] = useState(0);
  // let mie = 10;

  // Akan running setiap kali render
  // useEffect(() => {
  //   console.log("running");
  // });

  // Akan running satu kali, setelah render yg pertama
  // useEffect(() => {
  //   console.log("running");
  // }, []);

  const ubahMie = () => {
    if (attempt == 5) {
      return alert("Sudah 5 kali percobaan");
    }
    setAttempt(attempt + 1);
  };

  return (
    <div>
      <p>Attempt : {attempt}</p>
      <button onClick={ubahMie}>Ubah Mie</button>
    </div>
  );
}

export default UseState;

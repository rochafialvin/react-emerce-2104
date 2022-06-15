import { useState } from "react";

function UseState() {
  const [mie, setMie] = useState(10);
  // let mie = 10;

  const ubahMie = () => {
    setMie(20);
    // mie = 20;
    console.log("Angka telah berubah");
  };

  return (
    <div>
      <p>Jualan {mie} mie</p>
      <button onClick={ubahMie}>Ubah Mie</button>
    </div>
  );
}

export default UseState;

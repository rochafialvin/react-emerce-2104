import { useState } from "react";
import E from "./E";

function C({ user, bucket }) {
  const [source, setSource] = useState("Water Gold");

  const kirimAir = () => {
    bucket(source);
  };

  return (
    <div>
      <h1>Component C</h1>
      <button onClick={kirimAir}>Kirim air</button>
      <E user={user} />
    </div>
  );
}

export default C;

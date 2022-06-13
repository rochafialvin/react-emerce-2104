import { useState } from "react";
import A from "./A";
import X from "./X";

function InputBox() {
  const [user, setUser] = useState({ id: 1, username: "rochafi" });
  const [water, setWater] = useState("");

  const bucket = (air) => {
    // air : "Water gold"
    setWater(air);
  };

  return (
    <div>
      <h1>Input Box</h1>

      <A user={user} bucket={bucket} />
      <X water={water} />
    </div>
  );
}

export default InputBox;

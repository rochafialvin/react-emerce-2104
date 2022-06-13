import React from "react";
import C from "./C";

function A({ user, bucket }) {
  return (
    <div>
      <h1>Component A</h1>
      <C user={user} bucket={bucket} />
    </div>
  );
}

export default A;

import React from "react";

function E(props) {
  return (
    <div>
      <h1>Component E</h1>
      <h3>{JSON.stringify(props.user)}</h3>
    </div>
  );
}

export default E;

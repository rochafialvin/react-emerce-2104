function Btn({ text, color }) {
  const btnClass = `btn btn-${color}`;
  return <button className={btnClass}>{text}</button>;
}

export default Btn;

/*
  <Btn text="Submit" color="primary" />
  <Btn text="Delete" color="danger" />
*/

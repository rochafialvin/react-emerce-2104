function BtnOutline({ text, color }) {
  const btnClass = `btn btn-outline-${color}`;
  return <button className={btnClass}>{text}</button>;
}

export default BtnOutline;

/*
  <BtnOutline text="Submit Outline" color="primary" />
  <BtnOutline text="Delete Outline" color="danger" />
*/

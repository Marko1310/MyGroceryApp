import "./Submit.css";

const Submit = ({ changeInput, addGrocerie, input, editing }) => {
  return (
    <form
      className="submit-container"
      onSubmit={(e) => {
        e.preventDefault();
        addGrocerie();
      }}
    >
      <input
        type="text"
        id="grocery"
        name="grocery"
        placeholder="e.g. banana"
        value={editing ? "" : input}
        className="submit-input"
        onChange={(e) => changeInput(e)}
        disabled={editing}
      ></input>
      <input type="submit" value="Submit" className="submit-btn"></input>
    </form>
  );
};

export default Submit;

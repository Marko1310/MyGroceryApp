import "./Submit.css";

const Submit = ({ changeInput, addGrocerie, input }) => {
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
        value={input}
        className="submit-input"
        onChange={(e) => changeInput(e)}
      ></input>
      <input type="submit" value="Submit" className="submit-btn"></input>
    </form>
  );
};

export default Submit;

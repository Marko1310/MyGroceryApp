const Submit = () => {
  return (
    <form
      className="submit-container"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target[0].value, e.target[1].value);
      }}
    >
      <input
        type="text"
        id="grocery"
        name="grocery"
        placeholder="e.g. banana"
        className="submit-input"
      ></input>
      <input type="submit" value="Submit" className="submit-btn"></input>
    </form>
  );
};

export default Submit;

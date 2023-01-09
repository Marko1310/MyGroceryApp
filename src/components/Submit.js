const Submit = () => {
  return (
    <div className="submit-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target[0].value, e.target[1].value);
        }}
      >
        <input type="text" id="grocery" name="grocery"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Submit;

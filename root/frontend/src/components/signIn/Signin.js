import React from "react";
import "./Signin.css";

const Signin = () => {
  return (
    <div className="signin-container">
      <form>
        <label for="email">Email: </label>
        <br />
        <input type="text" id="fname" name="fname"></input>
        <br />
        <label for="password">Password:</label>
        <br />
        <input type="text"></input>
        <br />
        <button className="signin-button">Signin</button>
      </form>
    </div>
  );
};

export default Signin;

{
  /* <form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
</form> */
}

{
  /* <label for="email">Email:</label><br>
        <input type="text"><br>
        <label for="password">Password:</label><br>
        <input type="text"></input> */
}

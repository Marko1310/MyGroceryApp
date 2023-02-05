import React from "react";
import { useEffect } from "react";
import "./Alert.css";

const Alert = ({ removeALert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeALert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return <p className="alert">Please enter a valid grocery</p>;
};

export default Alert;

import React from "react";

function ErrorMessage({ err }) {
  return err ? (
    <h4>{err}</h4>
  ) : (
    <h4>Apologies, it's seems some sort of error has accured.</h4>
  );
}

export default ErrorMessage;

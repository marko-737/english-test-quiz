import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({
  component: Component,
  requestUserData,
  setLastQuestionFlag,
  ...rest
}) => {
  const hasUserData =
    localStorage.getItem("name") && localStorage.getItem("email");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (requestUserData && !hasUserData) {
          return <Redirect to={{ pathname: "/" }} />;
        } else if (!requestUserData && hasUserData) {
          return <Redirect to={{ pathname: "/questions" }} />;
        } else {
          return (
            <Component {...props} setLastQuestionFlag={setLastQuestionFlag} />
          );
        }
      }}
    />
  );
};

export default RouteGuard;

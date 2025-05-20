import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ element, redirectTo}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <div>{isLoggedIn ? <Navigate to={redirectTo} /> : element}</div>;
}

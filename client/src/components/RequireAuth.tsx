import React, { useState, useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export function RequireAuth(props: Props) {
  const location = useLocation();

  const token = localStorage.getItem("access_token");

  if (!token) {
    <Navigate to="/login" state={{ from: location }}></Navigate>;
  }

  return props.children;
}

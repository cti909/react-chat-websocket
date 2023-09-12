import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/actions/authAction";

function LogoutPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(logoutAction());

  useEffect(() => {
    navigate("/login");
  }, []);

  return <></>;
}

export default LogoutPage;

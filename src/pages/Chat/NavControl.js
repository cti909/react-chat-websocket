import React, { useEffect, useState } from "react";
import "../../assets/css/navcontrol.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCloud,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../store/actions/authAction";

const NavControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonActive, setButtonActive] = useState(1);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (
      isLogin ||
      (localStorage.getItem("accessToken") && Object.keys(user).length === 0)
    ) {
      dispatch(setUserAction());
    } else {
      navigate("/login");
    }
  }, []);

  const handleClickChat = () => {
    console.log("handleClickChat");
    setButtonActive(1);
  };
  const handleClickContact = () => {
    console.log("handleClickContact");
    setButtonActive(2);
  };

  const iconNavbar = [
    {
      id: 1,
      icon: faComment,
      event: handleClickChat,
    },
    {
      id: 2,
      icon: faAddressBook,
      event: handleClickContact,
    },
  ];

  return (
    <div className="d-flex justify-content-between flex-column vh-100 navbar-width navbar-color">
      <div>
        <div className="navbar-list-button">
          <Button className="navbar-button mt-3">
            <img
              src={Object.keys(user).length !== 0 ? user.avatar : ""}
              style={{ width: "48px", border: "50%" }}
              alt="loading"
            />
          </Button>
          {iconNavbar.map((item) => (
            <Button
              key={item.id}
              className={`navbar-button ${
                buttonActive === item.id ? "active" : ""
              }`}
              onClick={item.event}
            >
              <FontAwesomeIcon icon={item.icon} />
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Button className="navbar-button">
          <FontAwesomeIcon icon={faCloud} />
        </Button>
        <div className="btn-group dropup navbar-button">
          <Button className="navbar-button" data-bs-toggle="dropdown">
            <FontAwesomeIcon icon={faGear} />
          </Button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="">
                My account
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="">
                Settting
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavControl;

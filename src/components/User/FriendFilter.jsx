import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userFilterOtherAction } from "../../store/actions/userAction";

const FriendFilter = () => {
  const dispatch = useDispatch();

  const handleSearchUserSubmit = (e) => {
    e.preventDefault();
    const searchToken = e.target.searchUserToken.value;
    dispatch(userFilterOtherAction({ searchToken }));
  };

  return (
    <>
      <Form onSubmit={handleSearchUserSubmit}>
        <Form.Group className="position-relative me-2">
          <Button size="sm" className="position-absolute top-0 end-0">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
          <Form.Control
            type="text"
            name="searchUserToken"
            size="sm"
            placeholder="Search friend"
          />
        </Form.Group>
      </Form>
      <Button type="submit" size="sm" variant="outline-secondary">
        <FontAwesomeIcon icon={faUserPlus} />
      </Button>
    </>
  );
};

export default FriendFilter;

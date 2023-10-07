import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  friendFilterAction,
  userFilterAction,
} from "../../store/actions/userAction";

const UserFilter = () => {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.user.userFilter);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {}, [loading]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(userFilterAction({ searchToken: e.target.search.value }));
  };
  return (
    <div className="">
      <Form onSubmit={handleSubmitSearch}>
        <Form.Control type="text" name="search" placeholder="Search user" />
      </Form>
      <div className="mt-3 row">
        {friendList ? (
          friendList.map((item) => (
            <div className="col-3 mb-3">
              <Card>
                <CardContent>
                  <Avatar
                    style={{ margin: "0 auto" }}
                    alt={item.name}
                    src={item.avatar}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-center"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    className="text-center"
                  >
                    Email: {item.email}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    className="text-center"
                  >
                    Phone: {item.phone_number}
                  </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-end">
                  <Button variant="contained" size="small">
                    Profile
                  </Button>
                  <Button variant="contained" size="small">
                    Add Friend
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <span>No friend</span>
        )}
      </div>
    </div>
  );
};

export default UserFilter;

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
import { friendFilterAction } from "../../store/actions/userAction";

const FriendList = () => {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.user.friendFilter);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(friendFilterAction({ searchToken: "" }));
  }, []);

  useEffect(() => {}, [loading]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(friendFilterAction({ searchToken: e.target.search.value }));
  };

  return (
    <div>
      <span>Friend({friendList.length})</span>
      <Form onSubmit={handleSubmitSearch} className="mt-2">
        <Form.Control type="text" name="search" placeholder="Search friend" />
      </Form>
      <div className="mt-3 row" style={{ listStyleType: "none" }}>
        {friendList ? (
          friendList.map((item) => (
            <div className="col-3 mb-3" key={item.id}>
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
                    Unfriend
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

export default FriendList;

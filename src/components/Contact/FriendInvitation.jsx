import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendInvitationAction } from "../../store/actions/userAction";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

const FriendInvitation = () => {
  const dispatch = useDispatch();
  const senderList = useSelector((state) => state.user.friendInvitationSender); // gui loi moi ket ban
  const receiverList = useSelector(
    (state) => state.user.friendInvitationReceiver
  ); // nhan loi moi ket ban
  const loading = useSelector((state) => state.user.loading);
  const [senderCheck, setSenderCheck] = useState(false);
  const [receiverCheck, setReceiverCheck] = useState(false);

  const handleChangeSenderCheck = () => {
    setSenderCheck((prev) => !prev);
  };
  const handleChangeReceiverCheck = () => {
    setReceiverCheck((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getFriendInvitationAction());
  }, []);

  return (
    <div>
      {!loading && senderList && receiverList && (
        <>
          <div>
            <span>Friend invitation sent ({senderList.length})</span>
            <FormControlLabel
              control={
                <Switch
                  checked={senderCheck}
                  onChange={handleChangeSenderCheck}
                  className="ms-2"
                />
              }
            />
            <div className={senderCheck ? "d-block" : "d-none"}>
              {senderList ? (
                senderList.map((item) => (
                  <div className="col-3 mb-3" key={item.receiver.id}>
                    <Card>
                      <CardContent>
                        <Avatar
                          style={{ margin: "0 auto" }}
                          alt={item.receiver.name}
                          src={item.receiver.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="text-center"
                        >
                          {item.receiver.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="p"
                          component="div"
                          className="text-center"
                        >
                          Email: {item.receiver.email}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="p"
                          component="div"
                          className="text-center"
                        >
                          Phone: {item.receiver.phone_number}
                        </Typography>
                      </CardContent>
                      <CardActions className="d-flex justify-content-end">
                        <Button variant="contained" size="small">
                          Profile
                        </Button>
                        <Button variant="contained" size="small">
                          Recall
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ))
              ) : (
                <span>No user send friend invitation</span>
              )}
            </div>
          </div>
          <div>
            <span>Friend invitation received ({receiverList.length})</span>
            <FormControlLabel
              control={
                <Switch
                  checked={receiverCheck}
                  onChange={handleChangeReceiverCheck}
                  className="ms-2"
                />
              }
            />
            <div className={receiverCheck ? "d-block" : "d-none"}>
              {receiverList ? (
                receiverList.map((item) => (
                  <div className="col-3 mb-3" key={item.sender.id}>
                    <Card>
                      <CardContent>
                        <Avatar
                          style={{ margin: "0 auto" }}
                          alt={item.sender.name}
                          src={item.sender.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="text-center"
                        >
                          {item.sender.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="p"
                          component="div"
                          className="text-center"
                        >
                          Email: {item.sender.email}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="p"
                          component="div"
                          className="text-center"
                        >
                          Phone: {item.sender.phone_number}
                        </Typography>
                      </CardContent>
                      <CardActions className="d-flex justify-content-end">
                        <Button variant="contained" size="small">
                          Profile
                        </Button>
                        <Button variant="contained" size="small">
                          Accept
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ))
              ) : (
                <span>No user sent friend invitation</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FriendInvitation;

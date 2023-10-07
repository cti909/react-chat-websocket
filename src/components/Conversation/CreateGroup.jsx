import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { friendFilterAction } from "../../store/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "jquery";
import { createConversationPublicAction } from "../../store/actions/conversationAction";

const CreateGroup = ({ showCreateGroup, setShowCreateGroup }) => {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.user.friendFilter);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.user.loading);
  const [memberIdListAdd, setMemberIdListAdd] = useState([]);

  useEffect(() => {
    dispatch(friendFilterAction({ searchToken: "" }));
  }, []);

  const handleClickClose = () => {
    setShowCreateGroup(false);
  };

  const handleClickAddMember = (memberId) => {
    setMemberIdListAdd((pre) => [...pre, memberId]);
    console.log(memberId);
  };

  const handleClickRemoveMember = (memberId) => {
    setMemberIdListAdd((prev) => prev.filter((id) => id !== memberId));
    console.log(memberId);
  };

  const isMemberSelected = (memberId) => {
    return memberIdListAdd.includes(memberId);
  };

  const handleChangeFriendFilter = (e) => {
    console.log(e.target.value);

    dispatch(friendFilterAction({ searchToken: e.target.value }));
  };

  const handleSubmitCreateGroup = (e) => {
    e.preventDefault();
    const nameGroup = e.target.nameGroup.value;
    if (memberIdListAdd.length >= 2 && nameGroup !== "") {
      console.log(nameGroup);
      let userList = [
        {
          member_id: user.id,
          is_owner: 1,
        },
      ];
      for (let i = 0; i < memberIdListAdd.length; i++) {
        userList.push({
          member_id: memberIdListAdd[i],
          is_owner: 0,
        });
      }
      dispatch(
        createConversationPublicAction({
          name: nameGroup,
          memberCount: memberIdListAdd.length + 1,
          userList: userList,
        })
      );
    } else {
      console.log("Less 3");
    }
  };

  return (
    <div
      className={`position-fixed vw-100 vh-100 ${
        showCreateGroup ? "d-block" : "d-none"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100 }}
    >
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Form onSubmit={handleSubmitCreateGroup}>
          <Card style={{ width: 800 }}>
            <CardContent>
              <div className="d-flex justify-content-end mb-2">
                <Button variant="text" size="small" onClick={handleClickClose}>
                  x
                </Button>
              </div>

              <TextField
                className="w-100"
                label="Name group"
                variant="outlined"
                size="small"
                name="nameGroup"
              />
              <TextField
                className="w-100 mt-2"
                label="Search friend"
                variant="outlined"
                size="small"
                onChange={handleChangeFriendFilter}
              />

              <div
                className="mt-2 row border"
                style={{
                  listStyleType: "none",
                  overflowY: "scroll",
                  height: 200,
                }}
              >
                {friendList ? (
                  friendList.map((item) => (
                    <div className=" mb-3" key={item.id}>
                      <Card key={item.id}>
                        <CardHeader
                          avatar={
                            <Avatar alt={item.name} src={item.avatar}></Avatar>
                          }
                          action={
                            !isMemberSelected(item.id) ? (
                              <IconButton
                                onClick={() => handleClickAddMember(item.id)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => handleClickRemoveMember(item.id)}
                              >
                                <FontAwesomeIcon icon={faXmark} />
                              </IconButton>
                            )
                          }
                          title={item.name}
                          subheader={`Email: ${item.email}`}
                        />
                      </Card>
                    </div>
                  ))
                ) : (
                  <span>No friend</span>
                )}
              </div>
              <Typography paragraph className="mt-2">
                Member count: {memberIdListAdd.length}
              </Typography>
            </CardContent>
            <CardActions className="d-flex justify-content-end">
              <Button variant="contained" size="small" type="submit">
                Create
              </Button>
            </CardActions>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default CreateGroup;

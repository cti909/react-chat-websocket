import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversationPublic } from "../../store/actions/conversationAction";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const GroupList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversationList = useSelector(
    (state) => state.conversation.conversationList
  );

  useEffect(() => {
    dispatch(getAllConversationPublic({ memberId: user.id }));
  }, []);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <span>Group({conversationList.length})</span>
      <Form onSubmit={handleSubmitSearch} className="mt-2">
        <Form.Control type="text" name="search" placeholder="Search group" />
      </Form>
      <div></div>
      <div className="mt-3">
        {conversationList.length > 0 &&
          conversationList.map((item) => (
            <Card key={item.id} className="mb-1">
              <CardHeader
                avatar={<Avatar alt={item.name} src=""></Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </IconButton>
                }
                title={item.name}
                subheader={`Member count: ${item.member_count}`}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default GroupList;

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon } from "antd";

const GroupLikeButton = ({ user, group: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeGroup] = useMutation(LIKE_GROUP_MUTATION, {
    variables: { groupId: id }
  });

  return user ? (
    <span onClick={likeGroup}>
      <Icon
        theme={liked ? "twoTone" : ""}
        twoToneColor="#eb2f96"
        type="heart"
        style={{ marginRight: 8 }}
      />
      {likeCount}
    </span>
  ) : (
    <span>
      <Icon type="heart" style={{ marginRight: 8 }} />
      {likeCount}
    </span>
  );
};

const LIKE_GROUP_MUTATION = gql`
  mutation likeGroup($groupId: ID!) {
    likeGroup(groupId: $groupId) {
      id
      likeCount
      likes {
        id
        createdAt
        username
      }
    }
  }
`;
export default GroupLikeButton;

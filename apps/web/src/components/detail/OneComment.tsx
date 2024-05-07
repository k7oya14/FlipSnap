import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Comment } from "@/lib/definitions";
import { formatDistance } from "date-fns";
import ModalLink from "./ModalLink";

type Props = {
  comment: Comment;
};

const OneComment = React.memo(function OneComment(props: Props) {
  const { comment } = props;
  return (
    <div className="flex items-start space-x-3 sm:p-3 p-[10px]">
      <ModalLink
        href={`/profile/${comment.author.username}`}
        className="hover:cursor-pointer"
      >
        <Avatar className="size-8">
          <AvatarImage src={comment.author.image!} />
          <AvatarFallback>{comment.author.username}</AvatarFallback>
        </Avatar>
      </ModalLink>
      <div>
        <div className="font-semibold text-sm">
          <div className="flex sm:flex-none items-center space-x-2">
            <ModalLink
              href={`/profile/${comment.author.username}`}
              className="hover:cursor-pointer text-sm"
            >
              {comment.author.name}
            </ModalLink>
            <p className="block font-light text-xs text-gray-400">
              {formatDistance(
                new Date(),
                Date.parse(String(comment.createdAt))
              )}{" "}
              ago
            </p>
          </div>
          <span className="font-normal">{comment.content}</span>
        </div>
      </div>
    </div>
  );
});

export default OneComment;
